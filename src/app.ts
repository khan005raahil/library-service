import express, { Request, Response } from "express";
import bookRoutes from "./routes/bookRoutes";

const app = express();
app.use(express.json());

/**
 * Health check endpoint
 */
app.get("/api/v1/health", (req: Request, res: Response): void => {
    res.status(200).json({
        status: "ok",
        version: "1.0.0",
    });
});

/**
 * Book routes
 */
app.use("/api/v1/books", bookRoutes);

/**
 * Fallback 404
 */
app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: "Endpoint not found" });
});

export default app;
