// Add book form visibility toggle
const addBookBtn = document.querySelector('.add-book');
addBookBtn.addEventListener('click', () => {
    document.querySelector('#book-info').classList.toggle('visible');
    addBookBtn.classList.toggle('add');
});

// Search functionality
const searchBar = document.querySelector("#search-input");
searchBar.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase();
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        const title = book.querySelector('.title').innerText.toLowerCase();
        book.style.display = title.includes(term) ? 'block' : 'none';
    });
});

// Remove books functionality
const container = document.querySelector('.flex-container');
container.addEventListener('click', function(e) {
    if (e.target.id === 'trash') {
        const bookCard = e.target.closest('.book');
        container.removeChild(bookCard);
    }
});

// Toggle Read/Unread status
document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('check-to-read')) {
        e.target.innerText = e.target.innerText === 'Read' ? 'unRead' : 'Read';
    }
});

// Add book functionality
const addBtn = document.querySelector('#add-btn');

function resetForm() {
    document.querySelector('#book-name').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#url').value = '';
    document.querySelector('#page-no').value = '';
    document.querySelector('#read').innerText = 'unRead';
    document.querySelector('#book-info').classList.remove('visible');
    addBookBtn.classList.remove('add');
}

addBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const newBook = createBook(); 
    newBook.createBookCard();  
    resetForm(); 
});

// Book object and creation
function Book(thumbnail, authorName, bookTitle, urlAddress, pageNumber, checker) {
    this.thumbnail = thumbnail;
    this.authorName = authorName;
    this.bookTitle = bookTitle;
    this.urlAddress = urlAddress;
    this.pageNumber = pageNumber;
    this.checker = checker;
}

Book.prototype.createBookCard = function() {
    const newBookCard = document.createElement('div');
    newBookCard.classList.add('book');

    // Book thumbnail
    const imgEle = document.createElement('img');
    if (this.thumbnail && ['image/jpeg', 'image/png', 'image/jpg'].includes(this.thumbnail.type)) {
        const imageUrl = URL.createObjectURL(this.thumbnail);
        imgEle.setAttribute('src', imageUrl);
    }
    newBookCard.appendChild(imgEle);

    // Author, title, details
    const author = document.createElement('p');
    author.innerText = this.authorName;
    const title = document.createElement('p');
    title.innerText = this.bookTitle;
    newBookCard.appendChild(author);
    newBookCard.appendChild(title);

    // Status, page, and link
    const checkToRead = document.createElement('p');
    checkToRead.innerText = this.checker;
    checkToRead.classList.add('check-to-read');
    newBookCard.appendChild(checkToRead);
    
    const linkToBook = document.createElement('a');
    linkToBook.setAttribute('href', this.urlAddress);
    linkToBook.setAttribute('target', '_blank');
    linkToBook.innerHTML = `Continue Reading <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
    newBookCard.appendChild(linkToBook);
    
    const page = document.createElement('p');
    page.innerText = `${this.pageNumber} Pages`;
    newBookCard.appendChild(page);
    
    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.id = 'trash';
    newBookCard.appendChild(removeBtn);

    // Append to container
    container.appendChild(newBookCard);
};

// Function to create a book from form inputs
function createBook() {
    const thumbnail = document.querySelector('#thumbnail').files[0];
    const authorName = document.querySelector('#author').value;
    const bookTitle = document.querySelector('#book-name').value;
    const urlAddress = document.querySelector('#url').value;
    const pageNumber = document.querySelector('#page-no').value;
    const checker = document.querySelector('#read').innerText;

    return new Book(thumbnail, authorName, bookTitle, urlAddress, pageNumber, checker);
}
