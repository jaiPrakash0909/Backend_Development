import http from 'node:http'
import { Server, Socket } from 'socket.io'
import path from 'node:path'
import express from 'express'

async function main() {
    const app = express();
    app.use(express.static(path.resolve('./public')))

    const server = http.createServer(app);
    const io = new Server();


    io.attach(server);

    io.on('connection', (Socket) => {
        console.log(`A new socket has connected`, Socket.id);

        Socket.on('user:message', (data) => {
            console.log('Message from socket', data);
            
        })
    })

    server.listen(9000,() => {
        console.log(`Http server is running on PORT 9000`)
    });
}

main();