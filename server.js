import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { getUser } from "./auth/users.js";
import { fileURLToPath } from "url";
import { register } from "./controller/auth.js";
import { verifyToken } from "./middleware/jwb.js";
import { createPost } from "./controller/posts.js";

var app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// files uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/adduser", upload.single("picturePath"), register);
app.post("/posts", createPost);
app.use("/users", userRoutes);

//
app.use("/auth", authRoutes);

//mongodb connection
const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server PORT number: ${PORT}`));
  })
  .catch((err) => {
    console.log(`${err} : dint connect`);
  });

app.post("/posts", async (req, res) => {
  try {
    const postData = await Post.create(req.body);
    res.json(postData);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "All fields are required" });
  }
});

app.get("/getImage");

app.get("/:id", getUser);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// app.get("/");
