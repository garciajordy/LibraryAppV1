const myLibrary = [];
const body = document.getElementById('body');
let title;
let author;
let pages;
let image;

const closeButton = document.getElementById('close-button');
const screen = document.getElementById('screen');
const form = document.getElementById('form');
const button = document.getElementById('add-book');
const submit = document.getElementById('submit-book');
button.addEventListener('click', openForm);
submit.addEventListener('click', openForm);
closeButton.addEventListener('click', openForm);
submit.addEventListener('click', () => {
  title = document.getElementById('title').value;
  author = document.getElementById('author').value;
  pages = document.getElementById('pages').value;
  image = document.getElementById('image').value;
  if (image.length === 0) {
    image = 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';
  }
  addBookToLibrary(title, author, pages, image);
});
localStorageGetter();

function readBook(book) {
  if (book) {
    return 'Read';
  }
  return 'Not Read';
}

function Book(
  title,
  author,
  pages,
  image = 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg',
  read = false,
) {
  this.image = image;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function localStorageGetter() {
  for (let i = 0; i <= localStorage.length; i++) {
    const book = localStorage.getItem(`book${i}`);
    const newbook = JSON.parse(book);
    if (newbook != null) {
      myLibrary.push(newbook);
    } else {
      localStorage.removeItem(`book${i}`);
    }
  }
  if (myLibrary.length > 0) {
    displayBooks();
  }
}

function addBookToLibrary(title, author, pages, image) {
  const book = new Book(title, author, pages, image);
  myLibrary.push(book);
  const i = myLibrary.length;
  localStorage.setItem(`book${i}`, JSON.stringify(book));
  displayBook();
}
function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    displayBook(i);
  }
}

function openForm() {
  form.classList.toggle('form2');
  screen.classList.toggle('form2');
  closeButton.classList.toggle('form2');
}
function displayBook(i = myLibrary.length - 1) {
  const card = document.createElement('div');
  card.id = `card-${i}`;
  const cardImage = document.createElement('img');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h5');
  const listGroup = document.createElement('ul');
  const listGroupItem1 = document.createElement('li');
  const listGroupItem2 = document.createElement('li');
  const cardBodyBottom = document.createElement('div');
  const btnRead = document.createElement('button');
  btnRead.id = `read-${i}`;
  const btnDestroy = document.createElement('button');
  btnDestroy.id = `destroy-${i}`;
  cardImage.setAttribute('src', myLibrary[i].image);
  cardImage.height = 300;

  cardTitle.innerHTML = myLibrary[i].title;
  listGroupItem1.innerHTML = myLibrary[i].author;
  listGroupItem2.innerHTML = myLibrary[i].pages;
  card.classList.add('card', 'col-3', 'm-3');
  cardImage.classList.add('card-img-top');
  cardBody.classList.add('card-body');
  cardTitle.classList.add('card-title');
  listGroup.classList.add('list-group', 'list-group-flush');
  listGroupItem1.classList.add('list-group-item');
  listGroupItem2.classList.add('list-group-item');
  cardBodyBottom.classList.add('card-body', 'd-flex', 'flex-column');
  btnRead.classList.add('btn', 'btn-primary', 'my-2');
  btnDestroy.classList.add('btn', 'btn-danger');
  btnRead.innerHTML = readBook(myLibrary[i].read);
  btnDestroy.innerHTML = 'Destroy';

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

  btnDestroy.addEventListener('click', (e) => {
    let i = e.target.id.split().pop();
    i = parseInt(i, 10);
    myLibrary.splice(i - 1, 1);
    const num = i + 1;
    string = `book${num}`;
    document.getElementById(`#card-${num - 1}`).remove();
    localStorage.clear();
    for (let i = 0; i < myLibrary.length; i++) {
      const book = myLibrary[i];
      if (book !== undefined) {
        localStorage.setItem(`book${i + 1}`, JSON.stringify(book));
      }
    }
  });

  btnRead.addEventListener('click', (e) => {
    const i = e.target.id.split('').pop();
    if (e.target.innerHTML === 'Read') {
      myLibrary[i].read = false;
      e.target.innerHTML = 'Not Read';
    } else {
      myLibrary[i].read = true;
      e.target.innerHTML = 'Read';
    }
  });
}
