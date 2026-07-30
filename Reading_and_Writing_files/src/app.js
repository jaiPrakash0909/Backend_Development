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
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})


// by default
// const storage = multer.memoryStorage();  



// file upload in memory

const upload = multer({
  storage, 
  limits:{
  fileSize: 1024 * 1024 * 2 // 2mb
},
fileFilter:(req, file, cb)=>{
  const allowed = ["image/png", "image/jpeg", "application/pdf"]

  if(allowed.includes(file.mimetype)){
    cb(null,true )
  }
  else{
    cb(new Error("File type not supported", false))
  }
}
});



// handle error

// app.post("/upload", (req, res) => {
//   upload.single("file")(req, res, (err)=>{
//     if(err?.code === "LIMIT_FILE_SIZE"){
//       return res.send("File too large")
//     }
//     res.send("Upload")
//   })
// })


//single file upload at a time

// app.post("/upload", upload.single("file"), (req, res)=>{
//   console.log(req.file.buffer)

//   ApiResponse.ok(res, "File uploaded")
// })




// multiple file upload at a time

// app.post("/upload", upload.array("photos"), (req, res)=>{
//   console.log(req.file)

//   ApiResponse.ok(res, "File uploaded")
// })




app.use("/api/auth", authRoute);

// Catch-all for undefined routes
app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});



export default app;
