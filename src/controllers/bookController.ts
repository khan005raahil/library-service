import { Request, Response } from "express";
import { borrowBook } from "../services/bookService";
import { HTTP_STATUS } from "../constants/httpConstants";

/**
 * Borrow a book by ID with request validation
 */
export const borrowBookController = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { borrowerId } = req.body;

    // Validate book ID parameter
    if (!id || id.trim() === "") {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: "Book ID is required",
        });
    }

    // Validate borrowerId field
    if (!borrowerId || typeof borrowerId !== "string" || borrowerId.trim() === "") {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: "borrowerId is required and must be a non-empty string",
        });
    }

    try {
        const borrowedBook = borrowBook(id, borrowerId);

        if (!borrowedBook) {
            // Check if book doesn’t exist or already borrowed
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: "Book not found",
            });
        }

        if (borrowedBook.isBorrowed && borrowedBook.borrowerId !== borrowerId) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Book is already borrowed",
            });
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            data: borrowedBook,
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to borrow book",
        });
    }
};


/**
 * Return book controller
 */
export const returnBookController = (req: Request, res: Response): void => {
    const { id } = req.params;

    if (!id || id.trim() === "") {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: "Book ID is required",
        });
    }

    const result = returnBook(id);

    if (result === "NOT_FOUND") {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            message: "Book not found",
        });
    }

    if (result === "NOT_BORROWED") {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: "Book is not currently borrowed",
        });
    }

    res.status(HTTP_STATUS.OK).json({
        success: true,
        data: result,
    });
};

/**
 * Get stats controller
 */
export const getBookStatsController = (req: Request, res: Response): void => {
    try {
        const stats = getBookStats();
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: stats,
        });
    } catch {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to fetch book statistics",
        });
    }
};
