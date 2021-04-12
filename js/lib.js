// Default data
let library = [];
let DEFAULT_DATA = [
    {
        author: "J.G. Ballard",
        pages: 200,
        isRead: false,
        title: "The Lady Elizabeth"
    },
    {
        author: "K.R.Wellington",
        pages: 10,
        isRead: true,
        title: "Once of a lifetime",
    },
    {
        author: "K.R.Wellington",
        pages: 150,
        isRead: true,
        title: "We are the One",
    }, 
    {
        author: "I.D Newton",
        pages: 150,
        isRead: true,
        title: "Rich Kid",
    }, 
];

// DOM elements
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('#popup__form');
const newbook = document.querySelector('#newbook');
const overlay = document.querySelector('.overlay');
const bookContainer = document.createElement('div');

function displayBookContainer(){
    const body = document.querySelector('body');
    body.insertBefore(bookContainer, popup);
    bookContainer.classList.add('book-container');

    checkLocalStorage();
    library.forEach((book, index) => createBookItem(book, index));
}

function createBookItem(book, index){
    const bookItem = document.createElement('div');
    const author = document.createElement('h3');
    const title = document.createElement('h3');
    const pages = document.createElement('h3');
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button');

    author.innerHTML = `Author: ${book['author']}` ;
    title.innerHTML = `Title: ${book['title']}` ;
    pages.innerHTML = `Pages: ${book['pages']}` ;
    book.isRead ? readButton.innerHTML = 'Read' : readButton.innerHTML = 'Not read';
    removeButton.innerHTML = 'X';
    removeButton.dataset.id = index;

    // Update book.read status
    readButton.addEventListener('click', () => {
        book.isRead = !book.isRead;
        book.isRead ? readButton.innerHTML = 'Read' : readButton.innerHTML = 'Not read';
    });

    // Remove book
    removeButton.addEventListener('click', (e) => {
        console.log(e.target.closest('div'));
        let id = e.target.dataset.id
        library.splice(id, 1);
        removeBookFromLocalStorage();
        e.target.closest('div').remove();
    })

    bookItem.classList.add('book-container__items');

    removeButton.classList.add('book-container__remove-button');
    author.classList.add('book-container__column');
    title.classList.add('book-container__column');
    pages.classList.add('book-container__column');
    readButton.classList.add('book-container__read-button');

    bookItem.appendChild(removeButton);
    bookItem.appendChild(title);
    bookItem.appendChild(author);
    bookItem.appendChild(pages);
    bookItem.appendChild(readButton);

    bookContainer.appendChild(bookItem);
}

function openPopup(){
    // Either display or scale exists
    //popup.style.display = 'block'; 
    popup.classList.add('popup--alive');
    overlay.style.display = 'block';
}

function closePopup() {
    //popup.style.display = 'none';
    popup.classList.remove('popup--alive');
    overlay.style.display = 'none';
}

function Book(title, author, pages, isRead){
    // Object Constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(e){
    e.preventDefault();

    let isRead = document.querySelector('#is-read').checked;
    let book = new Book(this.title.value, this.author.value, this.pages.value, isRead);
    addBooktoLocalStorage(book);
    createBookItem(book);
    closePopup();
}

function addBooktoLocalStorage(book){
    library.push(book);
    localStorage.setItem('library', JSON.stringify(library));
}

function removeBookFromLocalStorage(){
    localStorage.setItem('library', JSON.stringify(library));
}

function checkLocalStorage(){
    if(!localStorage.getItem('library')){
        localStorage.setItem('library', JSON.stringify(DEFAULT_DATA));
    }
    library = JSON.parse(localStorage.getItem('library'));

}

newbook.addEventListener('click', openPopup);
popupForm.addEventListener('submit', addBookToLibrary);
overlay.addEventListener('click', closePopup);

displayBookContainer();