/******************** DOM manipulation *********************/
const addNewBookButton = document.querySelector("#addNewBookBtn");
const addNewBookForm = document.querySelector("#addNewBookForm");

addNewBookButton.addEventListener('click', onAddNewBookButtonClick);
addNewBookForm.addEventListener('submit', onAddNewBookFormSubmit);

function onAddNewBookButtonClick(event) {
    addNewBookForm.classList.toggle("visible-form");
}
function onAddNewBookFormSubmit(event){
    // Stop the browser from reloading the page
    event.preventDefault();

    // Make form invisible
    addNewBookForm.classList.toggle("visible-form");

    // Add new book to library
    // Extract the data from the form inputs
    const formData = new FormData(addNewBookForm);
    const data = Object.fromEntries(formData);
    
}
/***********************************************************/





/******************** Book functions ***********************/
const myLibrary = [];

function Book(title, author, pages, haveRead){
    if (!new.target){
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}
Book.prototype.info = function(){ return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead ? "read already" : "not read yet"}`; }

// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
// console.log(theHobbit.info());

function addBookToLibrary(title, author, pages, haveRead){
    const newBook = new Book(title, author, pages, haveRead);
    newBook.id = crypto.randomUUID();
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(myLibrary[0].info());
console.log(myLibrary[0].id);
/***********************************************************/




