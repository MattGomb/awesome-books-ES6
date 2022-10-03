import Store from './localStorage.js';

export default class userInterface {
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