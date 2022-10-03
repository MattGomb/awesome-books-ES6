/* eslint max-classes-per-file: ["error", 3] */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

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
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class userInterface {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => userInterface.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td><button class="remove">remove</button></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(element) {
    if (element.classList.contains('remove')) {
      element.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#titleInput').value = '';
    document.querySelector('#authorInput').value = '';
  }
}

// store class: storage

// display event

document.addEventListener('DOMContentLoaded', userInterface.displayBooks);

// add a book

document.querySelector('#inputForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // get form values
  const title = document.querySelector('#titleInput').value;
  const author = document.querySelector('#authorInput').value;

  // instantiate book
  const book = new Book(title, author);

  // add book to ui
  userInterface.addBookToList(book);

  // add book to localstorage
  Store.addBook(book);

  // clear inputfields
  userInterface.clearFields();
});

// delete books
document.querySelector('#book-list').addEventListener('click', (e) => {
  // remove from interface
  userInterface.deleteBook(e.target);

  // remove from localstorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

// navbar display things

document.getElementById('navBooklist').addEventListener('click', () => {
  document.getElementById('booksInput').style.display = 'flex';
  document.getElementById('inputForm').style.display = 'none';
  document.getElementById('contactForm').style.display = 'none';
});

document.getElementById('navNewbook').addEventListener('click', () => {
  document.getElementById('booksInput').style.display = 'none';
  document.getElementById('inputForm').style.display = 'flex';
  document.getElementById('contactForm').style.display = 'none';
});

document.getElementById('navContact').addEventListener('click', () => {
  document.getElementById('booksInput').style.display = 'none';
  document.getElementById('inputForm').style.display = 'none';
  document.getElementById('contactForm').style.display = 'flex';
});

// dynamic date

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minutes = date.getMinutes();
document.getElementById('currentDate').innerHTML = `${month}/${day}/${year} ${hour}:${minutes}`;