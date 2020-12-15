var socket = io();

function createGameLobby(userList) {
    // Create a unique Socket.IO Room    
    const idArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '0','1','2','3','4','5','6','7','8','9']
    let thisGameId = "";
    do{
        let i = Math.floor(Math.random() * idArr.length);
        thisGameId += idArr[i];
    }while(thisGameId.length<8);
    let data = {gameId: thisGameId, socketId: socket.id}
    socket.emit('newGameLobby', data);     
    
};
$(document).ready(function() {
    if(localStorage.getItem("newLobby")){
        let userArr = JSON.parse(localStorage.getItem("newLobby"));
        localStorage.removeItem("newLobby");
        // createGameLobby(userArr);
    }
    if(localStorage.getItem("joinLobby")){
        let newUser = JSON.parse(localStorage.getItem("joinLobby"))[0];
        let lobbyCode = JSON.parse(localStorage.getItem("joinLobby"))[1];
        localStorage.removeItem("joinLobby");
        //needs to be revisted, name and avatar check
        for(let i = 0; i < userArr.length; i++){
            if(newUser.name === userArr[i].name){
                newUser.name = newUser.name + "_";
            }            
        }
        joinGameLobby(lobbyCode);
    }
})

const renderUserList = (userList) => {

}
let cardArr = [];
const testFunction = () => {    
    $.get("/api/cards/1", function(data) {       
        if (data.length !== 0) {      
          for (var i = 0; i < data.length; i++) {
            cardArr.push(data[i]);
          }      
        }
        if(cardArr.length > 0){
            testFunction2();   
        }   
      });

      
}
const testFunction2 = () => {
    let html = `<h3>Most Likely To</h3><p>${cardArr[2].body}</p><p>${cardArr[2].consequence} shot</p>`
    socket.emit('newGameLobby', {gameId: `12345678`, socketId: socket.id});
    socket.emit('drawCard', html);
    // $('.bg-card-3').append(html)
}

socket.on('drawCardReturn', (html) => {
    console.log("test");
    $('.bg-card-3').text("");
    $('.bg-card-3').append(html);
})

testFunction();