//Get the UI element

let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');

//Book Class
// console.log('Hello')

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI class(adds the books in the table)
class UI {
  static addToBookList(book) {
    let list = document.querySelector('#book-list');
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href='#' class="delete">X</a></td>`;

    list.appendChild(row);
  }
  static deleteFromBook(target) {
    // console.log(target);
    if (target.hasAttribute('href')) {
      // console.log(target);
      target.parentElement.parentElement.remove();
      Store.removeBook(
        target.parentElement.previousElementSibling.textContent.trim()
      );
      // ui.showAlert('Book Removed', 'remove');
      UI.showAlert('Book Removed', 'remove');
    }
  }
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
  static showAlert(message, classname) {
    let div = document.createElement('div');
    div.className = `alert ${classname}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector('.container');
    let form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
}

//Local Storage Class

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static displayBook() {
    let books = Store.getBooks();
    books.forEach((book) => {
      UI.addToBookList(book);
    });
  }
  static removeBook(isbn) {
    let books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Add event listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBook());

//Define Functions
function newBook(e) {
  let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

  //create object of UI
  // let ui = new UI(); isn't important to declare object as it's a static function now

  //check if field is empty
  if (title === '' || author === '' || isbn === '') {
    // alert('Fill out all the fields!');
    // ui.showAlert('Please fill all the fields', 'error');
    UI.showAlert('Please fill all the fields', 'error');
  } else {
    //create new book
    let book = new Book(title, author, isbn);

    // ui.addToBookList(book);
    UI.addToBookList(book);
    // ui.showAlert('Book Added Successfully', 'success');
    UI.showAlert('Book Added Successfully', 'success');
    // console.log(book);
    // ui.clearFields();
    UI.clearFields();

    Store.addBook(book);
  }

  e.preventDefault();
}

function removeBook(e) {
  // let ui = new UI(); isn't important to declare object as it's a static function now
  // ui.deleteFromBook(e.target);
  UI.deleteFromBook(e.target);
  e.preventDefault();
}
