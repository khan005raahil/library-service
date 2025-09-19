import { Book } from "../models/bookModel";

const books: Book[] = [
    {
        id: "1",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        isBorrowed: false,
    },
    {
        id: "2",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        isBorrowed: false,
    },
    {
        id: "3",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
        isBorrowed: false,
    },
];

/**
 * Get all books
 */
export const getAllBooks = (): Book[] => {
    return structuredClone(books);
};

/**
 * Borrow a book with validation logic
 */
export const borrowBook = (
    id: string,
    borrowerId: string
): Book | "NOT_FOUND" | "ALREADY_BORROWED" => {
    const book = books.find((b) => b.id === id);

    if (!book) {
        return "NOT_FOUND";
    }

    if (book.isBorrowed) {
        return "ALREADY_BORROWED";
    }

    book.isBorrowed = true;
    book.borrowerId = borrowerId;

    // 14 days from now
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    return structuredClone(book);
};

/**
 * Return a borrowed book
 */
export const returnBook = (id: string): Book | "NOT_FOUND" | "NOT_BORROWED" => {
    const book = books.find((b) => b.id === id);

    if (!book) {
        return "NOT_FOUND";
    }

    if (!book.isBorrowed) {
        return "NOT_BORROWED";
    }

    book.isBorrowed = false;
    delete book.borrowerId;
    delete book.dueDate;

    return structuredClone(book);
};

/**
 * Get book stats
 */
export const getBookStats = () => {
    const totalBooks = books.length;
    const availableBooks = books.filter((b) => !b.isBorrowed).length;
    const borrowedBooks = books.filter((b) => b.isBorrowed).length;

    const genreBreakdown: { [key: string]: number } = {};
    books.forEach((book) => {
        genreBreakdown[book.genre] = (genreBreakdown[book.genre] || 0) + 1;
    });

    return {
        totalBooks,
        availableBooks,
        borrowedBooks,
        genreBreakdown,
    };
};


export const borrowBook = (
    id: string,
    borrowerId: string
): Book | "NOT_FOUND" | "ALREADY_BORROWED" => {
    const book = books.find((b) => b.id === id);

    if (!book) {
        return "NOT_FOUND";
    }

    if (book.isBorrowed) {
        return "ALREADY_BORROWED";
    }

    book.isBorrowed = true;
    book.borrowerId = borrowerId;

    // 14 days from now
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    return structuredClone(book);
};
