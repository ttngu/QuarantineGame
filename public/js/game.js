var socket = io();
var userList = [];
var deck = [];
var sidePanel = $(".sidepanel")


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

function updateUser(userList){
    socket.emit('updateUserList', userList)
}

function getUser() {
    socket.on('updateUserListReturn', users => {
        userList = users
        renderUser();
    })
}

function renderUser() {

    sidePanel.text("")

    for (let i = 0; i < userList.length; i++){
        let placeholderHtml = `<p><img src='./assets/images/${userList[i].avatar}.jpeg'>${userList[i].name} / ${userList[i].score}</p>
        <button type="button" id="${i}" >Vote</button>`
        sidePanel.append(placeholderHtml);
    }
}

function createDeck() {
    $.get("/api/cards/1", function(data) {       
        if (data.length !== 0) {      
          for (var i = 0; i < data.length; i++) {
            deck.push(data[i]);
          }      
        }
        if(deck.length > 0){
            testFunction2();   
        }   
      });
}

function startGame() {
    socket.emit("startGame", userList);
}

socket.on("startGameReturn", userList => {
    userList = userList
    drawCard();
})


function endGame() {

}

$(document).ready(function() {
    if(localStorage.getItem("newLobby")){
        let userArr = JSON.parse(localStorage.getItem("newLobby"));
        localStorage.removeItem("newLobby");
        myModal.show();
        createGameLobby(userArr);
        createDeck();
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
    $("#startGame").click(() => startGame())
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

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    backdrop: 'static',
    keyboard: false
    })
    $(document).ready(function() {
      const valueSpan = $('.valueSpan');
      const value = $('#rounds');
      valueSpan.html(value.val());
      value.on('input change', () => {
      valueSpan.html(value.val());
    });
});

socket.on('drawCardReturn', (html) => {
    console.log("test");
    $('.bg-card-3').text("");
    $('.bg-card-3').append(html);
})

testFunction();

