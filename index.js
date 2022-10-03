import Book from './modules/book';
import Store from './modules/localStorage';
import userInterface from './modules/UI';

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