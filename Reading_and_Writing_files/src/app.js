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



// file upload in disk
// cb = call back

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})




// file upload in memory

const upload = multer({storage});

app.post("/upload", upload.single("file"), (req, res)=>{
  console.log(req.file)

  ApiResponse.ok(res, "File uploaded")
})




app.use("/api/auth", authRoute);

// Catch-all for undefined routes
app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});



export default app;
