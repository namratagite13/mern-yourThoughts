import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// 💡 NEW POSITION: MUST run before any module imports that try to read env variables
dotenv.config();

import notesRoutes from './routes/notesRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
// if (process.env.NODE_ENV !== "production") {
//   app.use(
//     cors({
//       origin: "http://localhost:5173",
//     })
//   );
// }

const allowedOrigins = ['http://localhost:5173']; // Change 5173 to 5174

app.use(cors({
  origin: allowedOrigins
}));


app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);
app.use("/api/ai", searchRoutes)

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});