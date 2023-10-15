import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { user } from "./models/user.model";
import { post } from "./models/post.model";
// import { getUser } from "./auth/users";
import { fileURLToPath } from "url";

var app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

//storage conf
//set the directory to where we keep our assets (pictures) for now ;D
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//mongodb connection
const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(PORT, () => console.log(`server PORT number: ${PORT}`));
  })
  .catch((err) => {
    console.log(`${err} : dint connect`);
  });

app.post("/api/uploadFile", upload.single("myFile"), (res, req) => {
  console.log(req.file);
});

app.post("/adduser", async (req, res) => {
  try {
    const userData = await user.create(req.body);
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "All fields are required" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const postData = await post.create(req.body);
    res.json(postData);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "All fields are required" });
  }
});

app.get("/:id", getUser);

// app.get("/");
