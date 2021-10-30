//rest API and backend handler
//library imports 
import express, { Router, static, json } from "express";
const app = express();
import { connect } from "mongoose";
import { config } from "dotenv";
import morgan from "morgan";
import multer, { diskStorage } from "multer";

//apiRoute imports
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
const router = Router();
import { join } from "path";


//database config and connection
config();
connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", static(join(__dirname, "public/images")));

//middleware
app.use(json());
app.use(helmet());   
app.use(morgan("common"));  // logging http requests and responses

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});


//file upload config
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("The file has been successfully uploaded");
  } catch (error) {
    console.error(error);
  }
});


//api routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Server is up and running!");
});
