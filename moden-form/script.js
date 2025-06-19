const inputs = document.querySelectorAll(
  'input[type="radio"], input[type="checkbox"]'
);

inputs.forEach((input) => {
  input.addEventListener("change", () => {
    if (input.checked) {
      inputs.forEach((i) => {
        if (i !== input) i.checked = false;
      });
    }
  });
});

const body = document.querySelector("body");
const logoBtn = document.querySelector(".logo-btn")
const dangerBtn = document.querySelector(".danger-btn");
const formDiv = document.querySelector(".form-container");
let lightMode = false;

logoBtn.addEventListener("click",()=>{
document.body.classList.toggle("light-theme");
formDiv.classList.toggle("light-card");
})

dangerBtn.addEventListener("click",()=>{
    document.body.style.display = "none";
})
