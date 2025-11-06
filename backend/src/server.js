import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";


dotenv.config();

import notesRoutes from './routes/notesRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


const app = express();
const PORT = process.env.PORT || 8080;

const BACKEND_ROOT = process.cwd(); 


const FRONTEND_DIST_PATH = path.join(BACKEND_ROOT, '..', 'frontend', 'dist');



// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}


app.use(express.json()); 
app.use(rateLimiter);


app.use("/api/notes", notesRoutes);
app.use("/api/ai", searchRoutes)


if (process.env.NODE_ENV === 'production') {
    // 1. Serve static assets (JS, CSS, images)
    app.use(express.static(FRONTEND_DIST_PATH));

    // 2. Serve index.html for all other requests
    app.get('*', (req, res) => {
        // Must use the full path to the file
        res.sendFile(path.join(FRONTEND_DIST_PATH, 'index.html'), (err) => {
            if (err) {
                console.error("Error sending index.html:", err);
                res.status(500).send("Could not load application. Build artifact missing.");
            }
        });
    });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});