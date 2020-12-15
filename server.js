var express = require("express");

// Sets up the Express App
// =============================================================
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize.sync({ force: false, alter: true }).then(function() {
  http.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);    
  });
});

let lobbyCode = "";
io.on('connection', function(socket){
  //create new lobby     
  socket.on('newGameLobby', data => {
    lobbyCode = data.gameId;
    if(lobbyCode.length > 0){
      socket.join(lobbyCode);  
    }
  });
  //join existing lobby
  socket.on('joinLobby', code => {
    if(io.sockets.adapter.rooms.get(lobbyCode).size >= 1){
      lobbyCode = code;
      socket.join(code);
    } else {
      //empty lobby fail condition TBD
    }
  });
  //placeholder draw card
  socket.on('drawCard', (card) => {
    io.to(lobbyCode).emit('drawCardReturn', card)
  });
  //placeholder update scoreboard
  socket.on('updateUserList', (userArr) => {
    io.to(lobbyCode).emit('updateUserListReturn', userArr)
  });
});