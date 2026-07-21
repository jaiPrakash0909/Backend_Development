import { error } from "node:console"
import fs from "node:fs"


// fs.writeFile("async.txt", "Hello async", (err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log("File written succesfully")
// })



// fs.readFile("async.txt", "utf8", (err, data)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log("READ:", data)
// })



// fs.readFile("a.txt", "utf-8", (error, data)=>{
//     fs.writeFile("b.txt", data, (err) => {
//         fs.appendFile("b.txt", "\nDone", (err)=> {
//             fs.unlink("a.txt", (err)=> {
//                 console.log("a.txt deleted")
//             })
//         })
//     })
// })