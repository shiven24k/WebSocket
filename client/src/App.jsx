import React, { useEffect } from 'react';
import {io} from 'socket.io-client'
import {Container, Typography} from '@mui/material'
const App = () => {
const socket = io("http://localhost:3000/");

useEffect(()=>{
  socket.on("connect",()=>{
    console.log("connected");
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


     </Container>
  )
}

export default App
