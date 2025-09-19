import { Router } from "express";
import {
    borrowBookController,
    returnBookController,
    getBookStatsController,
} from "../controllers/bookController";

const router = Router();

// Borrow a book
router.post("/:id/borrow", borrowBookController);

// Return a book
router.post("/:id/return", returnBookController);

// Get stats
router.get("/stats", getBookStatsController);


export default router;
