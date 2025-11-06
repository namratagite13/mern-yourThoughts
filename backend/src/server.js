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
const PROJECT_ROOT = process.cwd();

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

if (process.env.NODE_ENV === "production") {
    // Correctly points to /opt/render/project/src/frontend/dist
    const frontendDistPath = path.join(PROJECT_ROOT, "frontend", "dist"); 

    app.use(express.static(frontendDistPath));

    app.get("*", (req, res) => {
        // Correctly points to /opt/render/project/src/frontend/dist/index.html
        res.sendFile(path.join(frontendDistPath, "index.html")); 
    });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});