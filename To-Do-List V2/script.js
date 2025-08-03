const StorageManagement = (() => {
  let currentStorageKey = "toDoList";
  let toDoStorage = [];

  function changeTheKey(key) {
    currentStorageKey = key;
    storageLoad.loadStorage();
  }
  function getKey() {
    const key = currentStorageKey;
    return key;
  }
  function load(array) {
    toDoStorage = array;
  }

  function addItem(item) {
    toDoStorage.push(item);
  }

  function deleteItem(index) {
    toDoStorage.splice(index, 1);
  }

  function getTheStorage() {
    return [...toDoStorage];
  }
  function setTheStorage() {
    localStorage.setItem(currentStorageKey, JSON.stringify(toDoStorage));
  }
  return Object.freeze({
    changeTheKey,
    addItem,
    deleteItem,
    getTheStorage,
    setTheStorage,
    getKey,
    load,
  });
})();

const storageLoad = (() => {
  function loadStorage() {
    let key = StorageManagement.getKey();
    try {
      const saved = localStorage.getItem(key);
      const array = saved ? JSON.parse(saved) : [];
      StorageManagement.load(array);
    } catch (e) {
      console.error("Invalid JSON in localStorage:", e);
      StorageManagement.load([]);
    }
    displayControl.render();
  }
  return Object.freeze({ loadStorage });
})();

const CreateListModule = (() => {
  const listContainer = document.querySelector(".task-list");

  const createLi = (value) => {
    const liWrapper = document.createElement("div");
    liWrapper.classList.add("item-wrapper");
    const li = document.createElement("li");
    li.textContent = value;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Delete";
    const divLine = document.createElement("div");
    const hrLine = document.createElement("hr");
    divLine.classList.add("line");
    liWrapper.appendChild(li);
    li.appendChild(deleteBtn);
    liWrapper.appendChild(divLine);
    divLine.appendChild(hrLine);
    listContainer.appendChild(liWrapper);
    if (StorageManagement.getTheStorage().includes(value)) return;
    StorageManagement.addItem(value);
    StorageManagement.setTheStorage();
  };

  return { createLi };
})();

const AddListToDom = (() => {
  const input = document.querySelector(".add-input");
  const addBtn = document.querySelector(".add");
  input.addEventListener("keydown", (e) => {
    if (input.value === "") return;
    if (e.key === "Enter") {
      CreateListModule.createLi(input.value);
      displayControl.render();
      input.value = "";
    }
  });
  addBtn.addEventListener("click", () => {
    if (input.value === "") return;
    CreateListModule.createLi(input.value);
    input.value = "";
    displayControl.render();
  });
})();

const displayControl = (() => {
  const render = () => {
    const liParent = document.querySelector(".task-list");
    liParent.innerHTML = "";
    StorageManagement.getTheStorage().forEach((value) =>
      CreateListModule.createLi(value)
    );
  };

  return { render };
})();

const themeControl = (() => {
  const DarkModeToggle = document.querySelector(".darkMode-toggle");

  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  DarkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
})();

const deleteItem = (() => {
  const liParent = document.querySelector(".task-list");
  liParent.addEventListener("click", (e) => {
    if (e.target.matches(".delete")) {
      const btn = e.target;
      const li = btn.parentElement;
      const taskText = li.childNodes[0].textContent;
      const index = StorageManagement.getTheStorage().indexOf(taskText);
      StorageManagement.deleteItem(index);
      StorageManagement.setTheStorage();
      displayControl.render();
    }
  });
})();

const appController = (() => {
  const init = () => {
    StorageManagement.changeTheKey("toDoList");

    const tasks = storageLoad.loadStorage();
    displayControl.render();
  };
  document.addEventListener("DOMContentLoaded", init);
  return { init };
})();

const SearchLogic = (() => {
  function searchTasks(query) {
    const normalizedQuery = query.trim().toLowerCase();
    const queryWords = normalizedQuery.split(/\s+/);
    const filteredStorage = StorageManagement.getTheStorage().filter((task) => {
      const taskText = task.toLowerCase();
      return queryWords.every((word) => taskText.includes(word));
    });

    return filteredStorage;
  }

  const searchInput = document.querySelector(".search-input");

  searchInput.addEventListener("input", (e) => {
    const query = searchTasks(e.target.value);
    const liParent = document.querySelector(".task-list");
    liParent.innerHTML = "";
    query.forEach((task) => CreateListModule.createLi(task));
  });
})();

const menuBar = (() => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const menuOverlay = document.querySelector(".menu-overlay");
  const sidebarMenu = document.querySelector(".sidebar-menu");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const menuIcon = document.getElementById("menuIcon");

  hamburgerMenu.addEventListener("click", function () {
    menuOverlay.classList.toggle("active");
    sidebarMenu.classList.toggle("active");

    if (menuOverlay.classList.contains("active")) {
      menuIcon.className = "fas fa-times";
    } else {
      menuIcon.className = "fas fa-bars";
    }
  });

  menuOverlay.addEventListener("click", function (e) {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("active");
      sidebarMenu.classList.remove("active");
      menuIcon.className = "fas fa-bars";
    }
  });

  darkModeToggle.addEventListener("click", function () {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");
    const themeText = document.getElementById("theme-text");

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      themeIcon.textContent = "☀️";
      themeText.textContent = "Light Mode";
    } else {
      themeIcon.textContent = "🌙";
      themeText.textContent = "Dark Mode";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      menuOverlay.classList.remove("active");
      sidebarMenu.classList.remove("active");
      menuIcon.className = "fas fa-bars";
    }
  });

  document.querySelectorAll(".menu-item").forEach((button) => {
    button.addEventListener("click", function () {
      menuOverlay.classList.remove("active");
      sidebarMenu.classList.remove("active");
      menuIcon.className = "fas fa-bars";
    });
  });
})();
