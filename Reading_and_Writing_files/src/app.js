import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./modules/auth/auth.routes.js";
import ApiError from "./common/utils/api-error.js";
import multer from "multer";
import ApiResponse from "./common/utils/api-response.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




const upload = multer();

app.post("/upload", upload.single("file"), (req, res)=>{
  console.log(req.file)

  ApiResponse.ok(req, "File uploaded")
})






app.use("/api/auth", authRoute);

// Catch-all for undefined routes
app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});



export default app;
