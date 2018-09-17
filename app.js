// BOOK Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI(params) {}

UI.prototype.addBookToLIst = function(book) {
  const list = document.getElementById("book-list");

  const row = document.createElement("tr");

  //Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

UI.prototype.showAlert = function(message, className) {
  // create div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector("#container");

  const form = document.querySelector("#book-form");

  container.insertBefore(div, form);
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

document.getElementById("book-form").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all the fields", "error");
  } else {
    ui.showAlert("Book Added!", "success");
    ui.addBookToLIst(book);
    ui.clearFields();
  }
});

document.getElementById("book-list").addEventListener("click", e => {
  e.preventDefault();

  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert("Book Removed!", "error");
});
