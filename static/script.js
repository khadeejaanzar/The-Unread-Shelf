/* =========================================
   THE UNREAD SHELF
========================================= */

// DOM Elements
const bookshelf = document.getElementById("bookshelf");
const bookCount = document.getElementById("bookCount");
const spinButton = document.getElementById("spinButton");
const openAddBook = document.getElementById("openAddBook");
const addBookModal = document.getElementById("addBookModal");
const closeAddBook = document.getElementById("closeAddBook");
const addBookForm = document.getElementById("addBookForm");
const bookModal = document.getElementById("bookModal");
const closeBookModal = document.getElementById("closeBookModal");
const randomResult = document.getElementById("randomResult");
const closeResult = document.getElementById("closeResult");

const resultTitle = document.getElementById("resultTitle");
const resultAuthor = document.getElementById("resultAuthor");

const detailTitle = document.getElementById("detailTitle");
const detailAuthor = document.getElementById("detailAuthor");
const detailGenre = document.getElementById("detailGenre");
const detailStatus = document.getElementById("detailStatus");
const detailAction = document.getElementById("detailAction");

const navLinks = document.querySelectorAll(".nav-link");

let activeSelectedBook = null;

/* =========================================
   MODAL FUNCTIONS
========================================= */

function openModal(modal) {
    modal.classList.add("active"); // Changed to match CSS '.active'
}

function closeModal(modal) {
    modal.classList.remove("active");
}

/* =========================================
   BOOK UTILITIES
========================================= */

function getBooks() {
    return Array.from(document.querySelectorAll(".book"));
}

function formatStatus(status) {
    if (status === "reading") return "Currently Reading";
    if (status === "finished") return "Finished";
    return "TBR";
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function updateBookCount() {
    const books = getBooks();
    bookCount.textContent = books.length;
}

function resetBookPositions() {
    getBooks().forEach(book => {
        book.style.transform = "";
        book.style.zIndex = "";
    });
}

/* =========================================
   BOOK INTERACTION
========================================= */

function setupBook(book) {
    book.addEventListener("click", () => {
        activeSelectedBook = book;
        
        const title = book.dataset.title;
        const author = book.dataset.author;
        const genre = book.dataset.genre || "Not specified";
        const status = book.dataset.status || "tbr";

        detailTitle.textContent = title;
        detailAuthor.textContent = `by ${author}`;
        detailGenre.textContent = genre;
        detailStatus.textContent = formatStatus(status);

        if (status === "tbr") {
            detailAction.textContent = "Start Reading";
        } else if (status === "reading") {
            detailAction.textContent = "Mark as Finished";
        } else {
            detailAction.textContent = "Finished ✓";
        }

        openModal(bookModal);
    });

    /* Hover effect */
    book.addEventListener("mouseenter", () => {
        getBooks().forEach(otherBook => {
            if (otherBook !== book) {
                otherBook.style.opacity = "0.7";
            }
        });
    });

    book.addEventListener("mouseleave", () => {
        getBooks().forEach(otherBook => {
            otherBook.style.opacity = "1";
        });
    });
}

// Setup initial books
getBooks().forEach(setupBook);
updateBookCount();

/* Handle Status Update Action in Modal */
detailAction.addEventListener("click", () => {
    if (!activeSelectedBook) return;

    const currentStatus = activeSelectedBook.dataset.status;
    if (currentStatus === "tbr") {
        activeSelectedBook.dataset.status = "reading";
    } else if (currentStatus === "reading") {
        activeSelectedBook.dataset.status = "finished";
    }

    closeModal(bookModal);
});

/* =========================================
   ADD BOOK
========================================= */

openAddBook.addEventListener("click", () => openModal(addBookModal));
closeAddBook.addEventListener("click", () => closeModal(addBookModal));

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("newTitle").value.trim();
    const author = document.getElementById("newAuthor").value.trim();
    const genre = document.getElementById("newGenre").value.trim();
    const status = document.getElementById("newStatus").value;

    if (!title || !author) return;

    const book = document.createElement("div");
    book.className = "book new-book";
    book.dataset.title = title;
    book.dataset.author = author;
    book.dataset.genre = genre || "Not specified";
    book.dataset.status = status;

    const colors = [
        "#704b45", "#b58b63", "#68725c", "#8d5f4c",
        "#b59b66", "#4c5555", "#8a4650", "#5f706d"
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    book.style.backgroundColor = randomColor;

    book.innerHTML = `
        <div class="book-spine">
            <span class="book-decoration"></span>
            <span class="book-title">${escapeHTML(title)}</span>
            <span class="book-author">${escapeHTML(author)}</span>
            <span class="book-decoration bottom"></span>
        </div>
    `;

    bookshelf.appendChild(book);
    setupBook(book);
    updateBookCount();
    closeModal(addBookModal);
    addBookForm.reset();

    book.scrollIntoView({ behavior: "smooth", block: "center" });
});

/* =========================================
   SPIN THE SHELF
========================================= */

spinButton.addEventListener("click", () => {
    const books = getBooks();
    if (books.length === 0) return;

    const tbrBooks = books.filter(book => book.dataset.status === "tbr");
    const availableBooks = tbrBooks.length > 0 ? tbrBooks : books;
    const selectedBook = availableBooks[Math.floor(Math.random() * availableBooks.length)];

    // Animate bookshelf
    books.forEach(book => {
        book.style.transition = "transform 0.15s ease";
        const randomRotation = (Math.random() - 0.5) * 5;
        const randomMove = Math.random() * -15;
        book.style.transform = `translateY(${randomMove}px) rotate(${randomRotation}deg)`;
    });

    setTimeout(() => {
        books.forEach(book => {
            book.style.transform = "";
            book.style.transition = "";
        });

        // Highlight chosen book
        selectedBook.style.transform = "translateY(-35px) rotate(-3deg) scale(1.05)";
        selectedBook.style.zIndex = "50";

        resultTitle.textContent = selectedBook.dataset.title;
        resultAuthor.textContent = `by ${selectedBook.dataset.author}`;

        openModal(randomResult);
    }, 650);
});

/* =========================================
   MODAL CLOSING & NAVIGATION FILTERS
========================================= */

closeBookModal.addEventListener("click", () => closeModal(bookModal));
closeResult.addEventListener("click", () => {
    closeModal(randomResult);
    resetBookPositions();
});

document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeModal(overlay);
            resetBookPositions();
        }
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal-overlay").forEach(modal => closeModal(modal));
        resetBookPositions();
    }
});

navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        navLinks.forEach(navLink => navLink.classList.remove("active"));
        link.classList.add("active");

        const filter = link.dataset.filter;
        getBooks().forEach(book => {
            const status = book.dataset.status;
            if (filter === "all" || status === filter) {
                book.style.display = "flex";
            } else {
                book.style.display = "none";
            }
        });
    });
});
