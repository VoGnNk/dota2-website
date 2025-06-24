const express = require('express');
const server=express();
const  PORT = 7777;
server.listen(PORT);
console.log('Server is running on port '+ PORT);

server.use(express.static(__dirname));

server.get('/', function(req, res){
    console.log("Dear client connected");
    res.sendFile(__dirname+"/main.html");
});
