const express = require('express');

function block1_basic_server(){
    return new Promise((resolve)=>{
        const app = express()
        app.use(express.json())
        
        app.get('/menu',(req,res)=>{
            res.json({
                items: [
                    'thali',
                    'biryani'
                ]
            })
        })

        app.get('/search',(req,res)=>{
            const {q, limit} = req.query;
            res.json({
                query: q,
                limit: limit || 10
            })
            
        })

        app.get('/menu/:id',(req, res)=>{
            const {id} = req.params
            res.json({
                items: id,
                price: 123
            })
        })

        app.post('/order',(req, res) => {
            const order = req.body
            res.status(201).json({
                status: 'created',
                order
            })
        })

        // frontend
        const server = app.listen(0, async () => {
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`
            
            try{
                const menuRes = await fetch(`${base}/menu`)
                const menuData = await menuRes.json()
                console.log('GET /menu',JSON.stringify(menuData))

                console.log("+++++++++++++++++++++++++++++++++")

                const searchRes = await fetch(`${base}/search?q=biryani&limit=5`)
                const searchData = await searchRes.json()
                console.log('GET /search',JSON.stringify(searchData))

                console.log("+++++++++++++++++++++++++++++++++")

                const menuItemRes = await fetch(`${base}/menu/23`)
                const menuItemData = await menuItemRes.json()
                console.log('POST /menu/23',JSON.stringify(menuItemData))

                console.log("+++++++++++++++++++++++++++++++++")

                const orderRes = await fetch(`${base}/order`, {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                        body: JSON.stringify({
                            dish: 'biryani',
                            quantity: 2
                        })
                    }

                })
                const orderData = await orderRes.json()
                console.log('PORT /order',JSON.stringify(orderData))

                console.log("+++++++++++++++++++++++++++++++++")


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

function block2_response() {
    return new Promise((resolve) =>{
        const app = express()

        app.get('/text',(req, res)=>{
            res.send('Hello from jai')
        })

        app.get('/json',(req,res)=>{
            res.json({
                framework: 'express',
                version: '6.1.2'
            })
        })

        app.get('/not-found',(req, res)=>{
            res.status(404).json({
                error: "page not found"
            })
        })

        app.get('/heart',(req, res) => {
            res.sendStatus(200)
        })

        app.get('/old-menu',(req, res) =>{
            res.redirect(302,'/new-menu')
        })

        app.get('/xml',(req, res)=>{
            res.type('application/xml').send('<dish><name>Biryani</name></dish>')
        })

        app.get('/custom-headers',(req, res) =>{
            res.set('X-powered-By', 'windows');
            res.set('X-Request-Id', '123456');
            res.json({
                message: 'Custom headers set'
            })
            
        })

        app.get('/no-content',(req, res) =>{
            res.status(204).end()
        })


        const server = app.listen(0, async ()=>{
            const port = server.address().port
            const base = `http://127.0.0.1:${port}`
            try{
                const textRes = await fetch(`${base}/text`)
                const textData = await textRes.text()
                console.log('GET /text',textData)

                console.log("+++++++++++++++++++++++++++++++++")

                const jsonRes = await fetch(`${base}/json`)
                const jsonData = await jsonRes.json()
                console.log('GET /json', JSON.stringify(jsonData))
                console.log('GET /json',jsonData)
                console.log(typeof(JSON.stringify(jsonData)))

                console.log("+++++++++++++++++++++++++++++++++")

                const notFoundRes = await fetch(`${base}/not-found`)
                const notFoundData = await notFoundRes.json()
                console.log('GET /not-found',
                    'Status:', notFoundRes.status,
                    'Body', JSON.stringify(notFoundData)
                )
                console.log("+++++++++++++++++++++++++++++++++")

                const heartRes = await fetch(`${base}/heart`)
                const heartData = await heartRes.status
                console.log('GET /heart','status:',heartRes.status)
                console.log("+++++++++++++++++++++++++++++++++")

                const oldMenuRes = await fetch(`${base}/old-menu`)
                const oldMenuData = await oldMenuRes.redirected
                console.log('GET /old-menu',oldMenuRes.status,oldMenuRes.redirected)
                console.log("+++++++++++++++++++++++++++++++++")

                const xmlRes = await fetch(`${base}/xml`)
                const xmlData = await xmlRes.text()
                console.log('GET /xml', xmlData)
                console.log("+++++++++++++++++++++++++++++++++")

                const customHeaderRes = await fetch(`${base}/custom-headers`)
                const customHeaderData = await customHeaderRes.json()
                console.log('GET /custom-headers',customHeaderRes.status)
                console.log("X-Powered-By:", customHeaderRes.headers.get("X-Powered-By"));
                console.log("X-Request-Id:", customHeaderRes.headers.get("X-Request-Id"));
                console.log(JSON.stringify(customHeaderData))
                console.log("+++++++++++++++++++++++++++++++++")

                const noContentRes = await fetch(`${base}/no-content`)
                const noContentData = await noContentRes.status
                console.log('GET /no-content', customHeaderRes.status)


            }catch(error) {
                console.log(error)
            }
        })


    })
}


async function main(){
    await block1_basic_server()
    await block2_response()
    process.exit(0)
}

main()