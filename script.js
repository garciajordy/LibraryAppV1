let myLibrary = [];
let para = document.createElement("p")
let body = document.getElementById("body")

addBookToLibrary("title", "author", 500, true)
addBookToLibrary("othertitle", "otherauthor", 50)
addBookToLibrary("newtitle", "newauthor", 200, true)
addBookToLibrary("thetitle", "theauthor", 400, false)
//displayBooks()

function Book(title, author, pages, read = false, image = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg") {
    this.image = image
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    book = new Book(title, author, pages, read)
    myLibrary.push(book)
}


function displayBooks() {

    for (let i = 0; i < myLibrary.length; i++){
        para = document.createElement("p")
        para.innerHTML = myLibrary[i].title
        para.classList.add("text")
        body.appendChild(para)
        console.log(myLibrary[i].author)
        console.log(myLibrary[i].pages)
        console.log(myLibrary[i].read)
    }
}