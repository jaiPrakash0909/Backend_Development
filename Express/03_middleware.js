const express = require('express');

function Block_1_httpMethods(){
    return new Promise((resolve)=>{
        const app = express()

        const logs = []

        app.use(express.json())

        // request logger
        // next is use when you want to write middleware
        app.use((req, res, next) => {
            // add to database
            // console log everything
            // write in some file
            // authenticate a user



            const logEntry = `${req.method} : ${req.url}`
            logs.push(logEntry)
            console.log(`[LOG] -- ${logEntry}`)

            // if your request hangs forever
            next()
        })

        app.use((req, res, next) => {
            req.startTime = Date.now()

            res.on('finish', () => {
                const duration = Date.now() - req.startTime;
            })




            next()
        })






        // frontend
        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`
            
            try{
            


            }
            catch (error){
                console.log(error)
            }

            server.close(()=>{
                console.log("block 1 served")
                resolve()
            })
        })
    })
}


async function main(){
    await Block_1_httpMethods()
    process.exit(0)
}

main()