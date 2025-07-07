let currentSelectedBookUID;
let isfavouriteBtnSelected = false;

const addBookOverlay = document.querySelector(".modal-overlay");
const bookDetailsOverlay = document.querySelector(".book-details-overlay");
const mainBookLibrary = document.querySelector(".main-library");

function openModal() {
  addBookOverlay.classList.toggle("active");
}
function closeEditModal() {
  const editbook = document.querySelector(".edit-modal-overlay");
  editbook.classList.remove("active");
}

function closeModal() {
  addBookOverlay.classList.toggle("active");
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("active")) {
    addBookOverlay.classList.remove("active");
    bookDetailsOverlay.classList.remove("active");
  }
});

mainBookLibrary.addEventListener("click", (e) => {
  if (e.target.closest(".placehoder-book-img")) {
    bookDetailsOverlay.classList.toggle("active");
  }
});

mainBookLibrary.addEventListener("click", (e) => {
  const clickedCard = e.target.closest(".book-card");
  if (clickedCard) {
    const bookId = clickedCard.dataset.id;
    currentSelectedBookUID = bookId;
    updateTheBookDetails(currentSelectedBookUID);
  }
});

function updateTheBookDetails(bookId) {
  const currentId = allBooks.findIndex((book) => book.uniqId === bookId);

  const bookimg = document.querySelector(".book-img-icon");
  const bookTitle = document.querySelector(".book-titel");
  const bookAuthor = document.getElementById("bookAuthorDetails");
  const totalPage = document.getElementById("totalPagesValue");
  const lastReadDate = document.getElementById("lastReadValue");
  const lastRead = allBooks[currentId].lastReadPage;
  const progressTrack = document.querySelector(".progress-text");
  bookTitle.textContent = allBooks[currentId].title;
  bookAuthor.textContent = allBooks[currentId].author;
  bookimg.style.backgroundImage = `url(${allBooks[currentId].imgPath})`;
  totalPage.textContent = allBooks[currentId].totalPage;
  lastReadDate.textContent = allBooks[currentId].lastReadDate;
  progressTrack.textContent = `${lastRead} of ${allBooks[currentId].totalPage} pages read`;
  renderLibrary();
}

mainBookLibrary.addEventListener("click", (e) => {
  // Only respond to clicks on the star icon itself
  if (e.target.matches(".fa-star")) {
    const starIcon = e.target; // The <i> tag that was clicked
    const bookCard = starIcon.closest(".book-card");
    const uid = bookCard.dataset.id;

    const book = allBooks.find((book) => book.uniqId === uid);
    book.isfavourite = !book.isfavourite;

    localStorage.setItem("myLibrary", JSON.stringify(allBooks));
    alert("Book favourite status updated!");
    if (isfavouriteBtnSelected) {
      const filterdBooks = allBooks.filter((book) => book.isfavourite === true);
      mainBookLibrary.innerHTML = "";
      filterdBooks.forEach((book) => renderBook(book));
    } else {
      renderLibrary();
    }
  }
});

function deleteBook() {
  alert("are you sure you want to delete it this can't be undone");
  const bookId = allBooks.findIndex(
    (book) => book.uniqId === currentSelectedBookUID
  );
  if (bookId !== -1) {
    allBooks.splice(bookId, 1);
    saveToStorage();
  }
  closeBookDetails();
  renderLibrary();
}

function closeBookDetails() {
  bookDetailsOverlay.classList.remove("active");
}

const allBooks = [];
const checkStorage = localStorage.getItem("myLibrary");
if (checkStorage) {
  const getBooks = JSON.parse(localStorage.getItem("myLibrary"));
  allBooks.push(...getBooks);
}

class book {
  constructor(
    title,
    author,
    totalPage,
    lastReadPage,
    lastReadDate,
    uniqId,
    isfavourite = false,
    imgPath
  ) {
    this.title = title;
    this.author = author;
    this.totalPage = totalPage;
    this.lastReadPage = lastReadPage;
    this.lastReadDate = lastReadDate;
    this.uniqId = uniqId;
    this.isfavourite = isfavourite;
    this.imgPath = imgPath;
  }
}
// grabing add book form data
const addBookForm = document.getElementById("bookForm");

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // getvalue
  const title = addBookForm.elements["titel"].value;
  const author = addBookForm.elements["author"].value;
  const totalPage = addBookForm.elements["pageNumber"].value;
  const lastReadPage = addBookForm.elements["lastReadPage"].value;
  const lastReadDate = addBookForm.elements["lastReadDate"].value;
  const uniqId = crypto.randomUUID();
  const newBook = new book(
    title,
    author,
    totalPage,
    lastReadPage,
    lastReadDate,
    uniqId,
    false,
    getNextImgPath()
  );
  allBooks.push(newBook);
  saveToStorage();
  alert("book is sucsessfully added ");
  renderBook(newBook);
  addBookForm.reset();
  addBookOverlay.classList.remove("active");
});
const imgPath = [
  "assets/book1.png",
  "assets/book2.png",
  "assets/book3.png",
  "assets/book4.png",
  "assets/book5.png",
  "assets/book6.png",
  "assets/book7.png",
  "assets/book8.png",
];
let currentImgIndex = parseInt(localStorage.getItem("imageIndex")) || 0;
function getNextImgPath() {
  const path = imgPath[currentImgIndex];
  currentImgIndex = (currentImgIndex + 1) % imgPath.length;
  localStorage.setItem("imageIndex", currentImgIndex);
  return path;
}

function renderBook(newBook) {
  const bookLybrary = document.querySelector(".main-library");
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("data-id", newBook.uniqId);
  const iconDiv = document.createElement("div");
  iconDiv.classList.add("icon-fix");
  const iconButton = document.createElement("button");
  iconButton.classList.add("star-button");
  const fevIcon = document.createElement("i");
  fevIcon.className = "fas fa-star";
  const placehoderImgCover = document.createElement("button");
  placehoderImgCover.classList.add("placehoder-book-img");
  const placehoderImg = document.createElement("div");
  placehoderImg.classList.add("book-image");
  const titelsdiv = document.createElement("div");
  titelsdiv.classList.add("books-titels");
  const titelh3 = document.createElement("h3");
  titelh3.classList.add("book-title");
  const authorName = document.createElement("p");
  authorName.classList.add("book-author");
  titelsdiv.appendChild(titelh3);
  titelsdiv.appendChild(authorName);
  bookCard.appendChild(titelsdiv);
  placehoderImg.style.backgroundImage = `url(${newBook.imgPath})`;
  bookLybrary.appendChild(bookCard);
  bookCard.appendChild(iconDiv);
  iconDiv.appendChild(iconButton);
  iconButton.appendChild(fevIcon);
  iconDiv.appendChild(placehoderImgCover);
  placehoderImgCover.appendChild(placehoderImg);
  titelh3.textContent = newBook.title;
  authorName.textContent = newBook.author;
  fevIcon.style.color = newBook.isfavourite ? "#FFD700" : "#efeff1";
  const selectOption = document.querySelector("#author-filter");
  addOptionsIfNotExists(selectOption, newBook.author, newBook.author);
}

function addOptionsIfNotExists(selectId, value, text) {
  const checkOptions = selectId.options;

  for (let i = 0; i < checkOptions.length; i++) {
    if (checkOptions[i].value === value) return;
  }

  const option = document.createElement("option");
  option.textContent = text;
  option.value = value;
  selectId.appendChild(option);
}

document.querySelector(".editbtn").addEventListener("click", () => {
  const editBook = document.querySelector(".book-edit-overlay");
  const bookDeteils = document.querySelector(".book-details-overlay");
  bookDeteils.classList.remove("active");
  editBook.classList.add("active");
});
function renderLibrary() {
  const bookLibrary = document.querySelector(".main-library");
  bookLibrary.innerHTML = "";
  allBooks.forEach((book) => renderBook(book));
}
const fevBtn = document.querySelector(".favorites");
const mainLibraryBtn = document.querySelector(".library");
fevBtn.addEventListener("click", (e) => {
  isfavouriteBtnSelected = !isfavouriteBtnSelected;
  if (isfavouriteBtnSelected) {
    fevBtn.disabled = true;
    fevBtn.style.backgroundColor = "#efeff1";
    mainLibraryBtn.style.backgroundColor = "transparent";
    const filterdBooks = allBooks.filter((book) => book.isfavourite === true);
    mainBookLibrary.innerHTML = "";
    filterdBooks.forEach((book) => renderBook(book));
  }
});
mainLibraryBtn.addEventListener("click", () => {
  fevBtn.disabled = false;
  mainBookLibrary.innerHTML = "";
  isfavouriteBtnSelected = false;
  fevBtn.style.backgroundColor = "transparent";
  mainLibraryBtn.style.backgroundColor = "#efeff1";
  renderLibrary();
});
const selectOption = document.querySelector("#author-filter");
selectOption.addEventListener("change", () => {
  if (selectOption.value === "all-authors") {
    renderLibrary();
  } else {
    const currentSelectedValue = selectOption.value;
    fillterFunction("author", currentSelectedValue);
  }
});
function fillterFunction(arrgument, value) {
  const fillterArry = allBooks.filter((book) => book[arrgument] === value);
  mainBookLibrary.innerHTML = "";
  fillterArry.forEach((book) => renderBook(book));
}
function saveToStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(allBooks));
}
renderLibrary();

const recommendedBooks = [
  {
    title: "Maditation",
    author: "marcus",
    totalPage: "373",
    lastReadPage: "73",
    lastReadDate: "1950-03-31",
    uniqId: crypto.randomUUID(),
    isfavourite: true,
    imgPath: "assets/book4.png",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    totalPage: "444",
    lastReadPage: "50",
    lastReadDate: "2001-11-05",
    uniqId: crypto.randomUUID(),
    isfavourite: false,
    imgPath: "assets/book5.png",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    totalPage: "376",
    lastReadPage: "250",
    lastReadDate: "2024-02-06",
    uniqId: crypto.randomUUID(),
    isfavourite: true,
    imgPath: "assets/book6.png",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    totalPage: "277",
    lastReadPage: "83",
    lastReadDate: "1998-08-05",
    uniqId: crypto.randomUUID(),
    isfavourite: false,
    imgPath: "assets/book8.png",
  },
];

if (!localStorage.getItem("recommendationShown") && allBooks.length === 0) {
  const wantRecommendation = confirm(
    "Would you like to start with 4 book recommendations?"
  );
  if (wantRecommendation) {
    allBooks.push(...recommendedBooks);
    saveToStorage();
    renderLibrary();
  }
  localStorage.setItem("recommendationShown", true);
}
