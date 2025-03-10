import React, { useEffect, useMemo, useState } from 'react';
import {io} from 'socket.io-client'
import {Button,Container, Stack, TextField, Typography} from '@mui/material'
const App = () => {
const socket = useMemo(()=> io("http://localhost:3000/") ,[]);

const [message,setMessage] = useState("");
const [room,setRoom] =  useState("");
const [socketID, setSocketID] = useState("");
const [messages, setMessages] = useState([]);
const [roomName, setRoomName] = useState("");

console.log(messages);

const handelSubmit = (e) => {
  e.preventDefault();
  socket.emit("message",{message,room});
  setMessage('');

}
const joinRoomHandeler = (e)=>{
    e.preventDefault();
    socket.emit('join-room',roomName);
    setRoomName("")
}

useEffect(()=>{
  socket.on("connect",()=>{
    setSocketID(socket.id);
    console.log("connected",socket.id);
  })
  socket.on("recieve-message",(data)=>{
    setMessages((messages)=>[...messages,data]);
  })
  socket.on("welcome",(s)=>{
    console.log(s);
  })
  return ()=>{
    socket.disconnect();
  }
},[])

//now socket io is connected
  return (
     <Container maxWidth='sm' >
        <Typography variant='h1' component='div' gutterBottom>
            Welcome to our chatapp
        </Typography>
        
        <Typography typography='h6' component='div' gutterBottom>
          ID-{socketID}
        </Typography>
        <form onSubmit={joinRoomHandeler}>
        <TextField value={roomName} onChange={(e)=>{setRoomName(e.target.value)}} id='outlined-basic' label="Room Name" variant='outlined' />
        <Button type='submit' variant="contained" color="primary" >Join Room</Button>
        </form>
        <form onSubmit={handelSubmit}>
          <TextField value={message} onChange={(e)=>{setMessage(e.target.value)}} id='outlined-basic' label="Message" variant='outlined' />
          <TextField value={room} onChange={(e)=>{setRoom(e.target.value)}} id='outlined-basic' label="Room" variant='outlined' />
          <Button type='submit' variant="contained" color="primary" >Send</Button>
        </form>
        <Stack>
            {messages.map((m,i)=>(
                <Typography key={i} variant='h6' component='div' gutterBottom>
                  {m}
                </Typography>
            ))}

        </Stack>

     </Container>
  )
}

export default App
