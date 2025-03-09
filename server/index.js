import express from 'express';
import { Server } from 'socket.io';
import {createServer} from 'http'
import cors from 'cors'

const port = 3000;

const app = express();
const server = createServer(app);

//create an io instance
const io = new Server(server,{
   cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials: true
}
});

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
});

//made a circuit
io.on("connection", (socket) => {
    console.log("User Connected",socket.id);
    socket.emit("welcome","Welcome to the chat");
    
    socket.on("message",()=>{
       console.log("Message from user")
    })

    socket.on("disconnect",()=>{
        console.log("User Disconnected");
    })
    
});

server.listen(port, () => {
    console.log(`Server is running at ${port}`);
});