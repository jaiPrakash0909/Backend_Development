const express = require('express');

function Block_1_httpMethods(){
    return new Promise((resolve)=>{
        const app = express()

        const logs = []

        app.use(express.json({limit: '50kb'}))
        app.use(express.urlencoded({extended: true, limit: '50'}))
        app.use(express.static(root, {
            dotfiles: 'ignore',
            maxAge: 0
        }))


        
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
                console.log(`[TIMER] - ${req.method} - ${req.url} took ${duration}ms`)
            })




            next()
        })

        function authMe (req, res, next) {
            const token = req.headers['x-auth-token']

            if(!token){
                return res.status(401).json({error:"No Token, please login"})
            }

            if(token !== "secret-code"){
                return res.status(403).json({error: "Invalid token"})
            }

            // token -> extract data from token -> userID, email, admin

            req.user = {id: 1, name: "jai", role: "admin"}

            next()
        }

        function getRole(role) {
            return (req, res, next) => {
                if(!req.user || req.user.role !== role){
                    return res.status(403).json({error: `Role ${role} required`})
                }
                next() 
            }
        }

// Rate limit
        function rateLimit(maxRequest){
            let count = 0

            return (req, res, next) => {
                count++
                if(count > maxRequest){
                    return res.status(429).json({error: "Too many request, please try after some time"})
                }
                next()
            }
        }

        const limitedEndPoint = rateLimit(3)

        app.get('/limited', limitedEndPoint,(req, res) => {
            
        })



        app.get('/profile', authMe, getRole('admin') ,() => {})
        app.get('/profile', authMe, getRole('teacher') ,() => {})
        app.get('/profile', authMe, getRole('student') ,() => {})
        app.get('/profile', authMe, getRole('admin') ,() => {})
        app.get('/profile', authMe, getRole(['admin', 'teacher', 'student']) ,() => {})




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