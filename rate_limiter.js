// API Rate Limiter
// Node.js + Express

const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3000;

app.use(express.json());

// Rate limiter configuration
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 5,             // Maximum 5 requests
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Rate Limiter API is running!"
    });
});

// Protected API with rate limiting
app.get("/api/data", apiLimiter, (req, res) => {
    res.json({
        success: true,
        message: "API data fetched successfully",
        data: {
            project: "Daily GitHub Code",
            day: 28,
            technology: "Node.js"
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
