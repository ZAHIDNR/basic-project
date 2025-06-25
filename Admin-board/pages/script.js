document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('input[type="search"]');
  const projectCards = document.querySelectorAll(".project-card");
  const navBoxes = document.querySelectorAll(".nav-box");

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();

    projectCards.forEach((card) => {
      const title = card.querySelector("span").textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = searchTerm === "" ? "block" : "none";
      }
    });
  });

  navBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      navBoxes.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  document.querySelectorAll(".project-actions i").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();

      if (this.classList.contains("fa-star")) {
        this.classList.toggle("fa-regular");
        this.classList.toggle("fa-solid");
      }
    });
  });

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255,255,255,0.6)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.left = "50%";
      ripple.style.top = "50%";
      ripple.style.width = "20px";
      ripple.style.height = "20px";
      ripple.style.marginLeft = "-10px";
      ripple.style.marginTop = "-10px";

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

const style = document.createElement("style");
style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .nav-box.active {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateX(5px);
        }
      `;
document.head.appendChild(style);
