const express = require('express');

async function basic_server(){
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




async function main(){
    await basic_server()

    process.exit(0)
}

main()