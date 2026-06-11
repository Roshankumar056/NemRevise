const ws=require("ws")

const server = new ws.Server({port:8080});

server.on("connection",(client)=>{
    console.log("Connected to Client");
    client.send("You are connected to chat application")
    client.on("message",(data)=>{
        console.log(data.toString());
    })
})


console.log("websoket server is running on ws://localhost:8080");



