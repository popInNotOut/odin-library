/******************** DOM manipulation *********************/
const addNewBookButton = document.querySelector("#addNewBookBtn");
const addNewBookForm = document.querySelector("#addNewBookForm");
const bookGridContainer = document.querySelector("#book-display-grid");

addNewBookButton.addEventListener('click', onAddNewBookButtonClick);
addNewBookForm.addEventListener('submit', onAddNewBookFormSubmit);


function onAddNewBookButtonClick(event) {
    addNewBookForm.classList.toggle("visible-form");
}

function onAddNewBookFormSubmit(event){
    // Stop the browser from reloading the page
    event.preventDefault();

    // Add new book to library
    // Extract the data from the form inputs
    const formData = new FormData(addNewBookForm);
    const data = Object.fromEntries(formData);
    
    // Create a new Book
    const newBook = new Book(data.title, data.author, data.pages, (/yes/i).test(data.haveRead.trim()));

    // Add new book to library
    myLibrary.push(newBook);

    // Add new book to page
    addNewBookToEndOfPage();

    // Clear the form
    addNewBookForm.reset();
}

function addNewBookToEndOfPage(){
    title = myLibrary[myLibrary.length - 1].title;
    author = myLibrary[myLibrary.length - 1].author;
    pages = myLibrary[myLibrary.length - 1].pages;
    haveRead = myLibrary[myLibrary.length - 1].haveRead;

    const newDiv = document.createElement('div');
    newDiv.classList.add('book-grid-item');
    newDiv.dataset.bookId = myLibrary[myLibrary.length - 1].id;

    const textContainer = document.createElement('div');
    textContainer.classList.add('book-grid-text-container');
    textContainer.textContent = `Title: ${title}\n\nAuthor: ${author}\n\nPages: ${pages}\n\nHave read: ${haveRead ? "yes" : "no"}`;
    newDiv.appendChild(textContainer);

    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove Book";
    removeButton.addEventListener('click', onRemoveBookButtonClick);
    newDiv.appendChild(removeButton);

    const toggleReadStatusButton = document.createElement('button');
    toggleReadStatusButton.textContent = "Toggle Read Status";
    toggleReadStatusButton.addEventListener('click', onToggleReadStatusButtonClick);
    newDiv.appendChild(toggleReadStatusButton);

    bookGridContainer.appendChild(newDiv);
}

function onRemoveBookButtonClick(event){
    const removeDiv = event.currentTarget.parentElement;
    // Could also do this to get the closest element up the DOM tree that has .book-grid-item as a class
    // const removeDiv = event.target.closest('.book-grid-item');
    myLibrary = myLibrary.filter(b => b.id !== removeDiv.dataset.bookId);
    removeDiv.remove();
}

function onToggleReadStatusButtonClick(event){
    const currentGridItemDiv = event.target.closest('.book-grid-item');
    textContainer = currentGridItemDiv.querySelector('.book-grid-text-container');
    targetBook = myLibrary.find(b => b.id == currentGridItemDiv.dataset.bookId);
    targetBook.toggleReadStatus();
    title = targetBook.title; author = targetBook.author; pages = targetBook.pages; haveRead = targetBook.haveRead;
    textContainer.textContent = `Title: ${title}\n\nAuthor: ${author}\n\nPages: ${pages}\n\nHave read: ${haveRead ? "yes" : "no"}`;
}
/***********************************************************/





/******************** Book functions ***********************/
let myLibrary = [];

function Book(title, author, pages, haveRead){
    if (!new.target){
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.id = crypto.randomUUID();
}
Book.prototype.info = function(){ return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead ? "read already" : "not read yet"}`; }
Book.prototype.toggleReadStatus = function() { this.haveRead = !this.haveRead; }

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
// console.log(theHobbit.info());

function addBookToLibrary(title, author, pages, haveRead){
    const newBook = new Book(title, author, pages, haveRead);
    newBook.id = crypto.randomUUID();
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addNewBookToEndOfPage();
console.log(myLibrary[0].info());
console.log(myLibrary[0].id);
/***********************************************************/




