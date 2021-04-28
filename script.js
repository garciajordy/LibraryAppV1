const myLibrary = [];
let para = document.createElement("p");
const body = document.getElementById("body");
let title;
let author;
let pages;
let image;
// let count = -2;

let closeButton = document.getElementById("close-button");
let screen = document.getElementById("screen");
let form = document.getElementById("form");
let button = document.getElementById("add-book");
let submit = document.getElementById("submit-book");
button.addEventListener("click", openForm);
closeButton.addEventListener("click", openForm);
submit.addEventListener("click", addBookToLibrary(title, author, pages, image));

addBookToLibrary("title", "author", 500, true);
addBookToLibrary("othertitle", "otherauthor", 50);
addBookToLibrary("newtitle", "newauthor", 200, true);
addBookToLibrary("thetitle", "theauthor", 400, false);

// displayBooks();

function Book(
  title,
  author,
  pages,
  read = false,
  image = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
) {
  this.image = image;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function formInputs() {
  title = document.getElementById("title").textContent;
  author = document.getElementById("author").textContent;
  pages = document.getElementById("pages").textContent;
  image = document.getElementById("image").textContent;
}

function addBookToLibrary(title, author, pages, image) {
  let book = new Book(title, author, pages, image);
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  // for (let i = 0; i < myLibrary.length; i++) {
  i = myLibrary.length - 1;
  card = document.createElement("div");
  card.id = `card-${i}`;
  cardImage = document.createElement("img");
  cardBody = document.createElement("div");
  cardTitle = document.createElement("h5");
  listGroup = document.createElement("ul");
  listGroupItem1 = document.createElement("li");
  listGroupItem2 = document.createElement("li");
  cardBodyBottom = document.createElement("div");
  btnRead = document.createElement("button");
  btnRead.id = `read-${i}`;
  btnDestroy = document.createElement("button");
  btnDestroy.id = `destroy-${i}`;
  cardImage.src = myLibrary[i].image;
  cardTitle.innerHTML = myLibrary[i].title;
  listGroupItem1.innerHTML = myLibrary[i].author;
  listGroupItem2.innerHTML = myLibrary[i].pages;
  card.classList.add("card", "col-3");
  cardImage.classList.add("card-img-top");
  cardBody.classList.add("card-body");
  cardTitle.classList.add("card-title");
  listGroup.classList.add("list-group", "list-group-flush");
  listGroupItem1.classList.add("list-group-item");
  listGroupItem2.classList.add("list-group-item");
  cardBodyBottom.classList.add("card-body");
  btnRead.classList.add("btn", "btn-primary", "mr-2");
  btnDestroy.classList.add("btn", "btn-danger");
  btnRead.innerHTML = readBook(myLibrary[i].read);
  btnDestroy.innerHTML = "Destroy";

  body.appendChild(card);
  card.appendChild(cardImage);
  card.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  card.appendChild(listGroup);
  listGroup.appendChild(listGroupItem1);
  listGroup.appendChild(listGroupItem2);
  card.appendChild(cardBodyBottom);
  cardBodyBottom.appendChild(btnRead);
  cardBodyBottom.appendChild(btnDestroy);
  btnDestroy.addEventListener("click", function (e) {
    i = e.target.id.split("").pop();
    delete myLibrary[i];
    document.querySelector(`#card-${i}`).remove();
  });
  btnRead.addEventListener("click", function (e) {
    i = e.target.id.split("").pop();
    if (e.target.innerHTML == "Read") {
      myLibrary[i].read = false;
      e.target.innerHTML = "Not Read";
    } else {
      myLibrary[i].read = true;
      e.target.innerHTML = "Read";
    }
  });
  // document
  //   .querySelector(`#destroy-${i}`)
  //   .addEventListener("click", deleteBook(btnDestroy));
  // btnRead.addEventListener("click", clickBtnRead(btnRead));
  // }
}

function readBook(book) {
  if (book) {
    return "Read";
  } else {
    return "Not Read";
  }
}

function deleteBook(btn) {
  // count++;
  i = btn.id.split("").pop();

  delete myLibrary[i];
  document.querySelector(`#card-${i}`).remove();
}

// function clickBtnRead(book) {
//   let i = myLibrary.indexOf(book);
//   if (book.read != false) {
//     myLibrary[i].read = false;
//   } else {
//     myLibrary[i].read = true;
//   }
// }

function openForm() {
  form.classList.toggle("form2");
  screen.classList.toggle("form2");
  closeButton.classList.toggle("form2");
}
