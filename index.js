import Store from './modules/localStorage.js';
import Book from './modules/book.js';
import userInterface from './modules/UI.js';
import { DateTime } from './modules/luxon.js';

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
document.querySelector('#currentDate').innerHTML = DateTime.now().toFormat('MM/dd/yyyy, hh:mm');