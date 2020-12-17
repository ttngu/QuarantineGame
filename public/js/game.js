"use strict";
var socket = io();
var userList = [];
var user = "";
var userId = -1;
var round = 10;
var score = 0;
var deck = [];
var usedDeck = [];
var voting = [];
var cons = "points";
var thisGameId = "";
var socketId = "";
let consequence = 0;
let roundsNumber = 0;
let voteButtons = $('.voteBtn');
let drawCard = 0;
let timer = 0;
const sidePanel = $(".sidepanel")
const valueSpan = $('.valueSpan');
const rounds = $('#rounds');
const consVal = $('#cons')
const userDisp = $('#userDisp');
const scoreDisp = $('#scoreDisp');
const startButton = $('#startGame');
const lobbyDisp = $('#lobbyDisp');
const topCard = $('.bg-card-3');
const timerDisp = $('#countdown');
const winnerDisp = $('#winnerDisp');

//add socket id to userlist array
//add disconnect check and remove from userlist

function createGameLobby() {
    // Create a unique Socket.IO Room
    const idArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    '0','1','2','3','4','5','6','7','8','9'];
    do{
        let i = Math.floor(Math.random() * idArr.length);
        thisGameId += idArr[i];
    }while(thisGameId.length<8);
    let data = {gameId: thisGameId}
    socket.emit('newGameLobby', data);
    let users = JSON.stringify(userList);
    $.post(`/api/gameroom/`, {
        lobbyCode: thisGameId,
        user: users,
        cons: cons,
        rounds: roundsNumber
    }, function(data, status){
        console.log("game room creation status: " + status)
    })
    lobbyDisp.html(thisGameId);
    renderUser();
};

function createButton(){
    if(userId === 0){        
        startButton.attr("style","display:inline-block");
    }
}

function renderUser() {
    sidePanel.text("");
    for (let i = 0; i < userList.length; i++){    
        let placeholderHtml = `<p><img src='./images/avatar-icons/${userList[i].avatar}.png'>${userList[i].name} - Score: ${userList[i].score}</p>
        <button type="button" id="${i}" class="voteBtn">Vote</button>`
        sidePanel.append(placeholderHtml);
    }
}

function createDeck() {

    $.get("/api/cards/1").then(data => {
        for(let i = 0; i < data.length; i++) {
            deck.push(data[i])
        }
    })
    // $.get("/api/cards/1", function(data) {       
    //     if (data.length !== 0) {      
    //       for (var i = 0; i < data.length; i++) {
    //         deck.push(data[i]);
    //       }      
    //     }
    //     if(deck.length > 0){
    //     }   
    //   });
}

// async function drawCard(){
//     let card = Math.floor(Math.random() * deck.length);
//     console.log(deck)
//     if(usedDeck.indexOf(card) === -1){
//         usedDeck.push(card);
//         return await card;
//     }else if(deck.length === usedDeck.length){
//         usedDeck = [];
//         drawCard();
//     }else{
//         drawCard();
//     }
// }


// async function startGame() {   
//     let card; 
//     if(userId === 0){ 
//         card = new Promise((res, rej) => {
//             return res(drawCard());
//         })
//         // let card = await drawCard();
//     //    if(typeof card === 'undefined' || card === null) {
//     //     card = new Promise((res, rej) => {
//     //         return res(drawCard());
//     //     })
//        }
//        console.log(await card);
//         socket.emit("startGame", {code: thisGameId, card: await card});
        
    
// }

// socket.on("startGameReturn", async (i) => {  
//     console.log(await i)      
//     startButton.attr("style","display:none");
//     // console.log(deck);
//     let html = `<h3>Most Likely To</h3><p>${deck[i]?.body}</p><p>${deck[i]?.consequence} ${cons}</p>`;
//     topCard.html(html);
//     startVoting();
// })

startButton.click(() => {
    if(userId === 0){
        socket.emit("startGame", {code: thisGameId, card: 0});}
    })

function roundCheck(){  
        if(roundsNumber < round){                      
            roundsNumber++;
            startGame();
        }else{
            endGame();
            }
        
}

socket.on('startGameReturn', (output) => {           
        roundCheck();
  });


function startGame(){   
    console.log("this"); 
    let i = drawCard;
    consequence = deck[i].consequence;
    let html = `<p>${deck[i]?.body}</p><p>${deck[i]?.consequence} ${cons}</p>`;
    topCard.html(html);
    drawCard < deck.length-1 ? drawCard++ : drawCard = 0;
    startVoting();
}

function startVoting(){
    voteButtons = $('.voteBtn');
    voteButtons.attr("style","display:inline-block");
    timer = 30;
    countdownStart();   
}

function countdownStart(){
    let countdown = setInterval(function(){
        timerDisp.html(timer);  
         timer--;
         if(timer < 0 || voting.length === userList.length){
            timerDisp.html("");
             clearInterval(countdown);
             endVoting();
         }
        }, 1000);
    
}

function endVoting(){
    clearInterval(countdown);
    let result = Array(userList.length).fill(0);
    voting.forEach(e => {
        result[e[1]]++;
    })
    voting = [];
    announceWinner(result);
}

function announceWinner(result){
    let i = result.indexOf(Math.max(...result));
    userList[i].score += consequence;
    if(i === userId){
        scoreDisp.html(userList[i].score)
    }
    renderUser();
    topCard.html(`<h3>${userList[i].name} is the "winner"</h3>`)
    setTimeout(() => {roundCheck();}, 7000);    
}

$(document).on("click", '.voteBtn', (function() {  
    console.log("vote cast");
    var id = $(this).attr('id');    
    voteButtons.attr("style","display:none");
    sendVote(id);
}));

function sendVote(id){
    socket.emit('sendVote', {user: userId, vote: id, code: thisGameId});
}

socket.on('userVoted', input =>{
    voting.push([input.user,parseInt(input.vote)])
})

function endGame() { 
    let i = Math.max.apply(Math, userList.map(function(e) { return e.score }));
    let x = userList.findIndex(e => e.score === i);
    topCard.html(`<h4>Game Over</h4><br>
    <h3>${userList[x].name} is the "grand winner" with ${i} ${cons}</h3>`)    
}

function updateUserScore(){
    scoreDisp.html(score)
}

function getUserList(){
    $.get(`/api/gameroom/${thisGameId}`, function(data, status) {    
        userList = JSON.parse(data[0].user_list);
        if(status==="success"){
            renderUser();
            if(userList.length > 1){                 
                createButton();
            }
        }
      });      
}



function updateUser(newUser){
    $.get(`/api/gameroom/${thisGameId}`, function(data, status) {
        userList = JSON.parse(data[0].user_list);
        round = data[0].rounds;
        cons = data[0].cons_name;
        console.log(user);
        let userReturn = usernameCheck(newUser, userList);
        console.log(userReturn);
        user = userReturn.name; 
        userDisp.html(user);
        lobbyDisp.html(thisGameId);
        if(status==="success"){
            if(userList.length<8){
                userList.push(userReturn);
                userId = userList.length - 1;
                let input = JSON.stringify(userList);
                $.ajax({
                    url: `/api/gameroom/${thisGameId}`,
                    type: 'PUT',
                    data: {
                        users: input
                    },
                    success: function(data, status) {
                        socket.emit('renderUser', thisGameId);
                    }
                });           
            } else{
                //lobby is full
            };
        }
    });     
}

function usernameCheck(user, userList){
    if(userList.some( e => {return e.name === user.name})){
        user.name += "_";
        return usernameCheck(user,userList);
    }else{
        console.log(user);
        return user;
    }
}

socket.on('renderUserReturn', () => getUserList())

socket.on('connect', () => {
    if(localStorage.getItem("newLobby")){ 
        userList = [];
        let userArr = JSON.parse(localStorage.getItem("newLobby"));
        userList = userArr;
        localStorage.removeItem("newLobby");
        myModal.show();
        user = userArr[0].name;
        userId = 0;
        userDisp.html(user);
        socketId = socket.id;
        userArr[0].socket = socketId;
        updateUserScore();
        createDeck();
    }
    $("#lobbycreate").click(() => {
        myModal.hide()
        roundsNumber = rounds.val();
        if(consVal.val()){
            cons = consVal.val();
        }
        createGameLobby();
    })
    if(localStorage.getItem("joinLobby")){
        let newUser = JSON.parse(localStorage.getItem("joinLobby"))[0];
        let lobbyCode = JSON.parse(localStorage.getItem("joinLobby"))[1];
        localStorage.removeItem("joinLobby");             
        thisGameId = lobbyCode;  
        socketId = socket.id
        newUser.socket = socketId;
        socket.emit('joinLobby', thisGameId);
        updateUserScore();
        updateUser(newUser);        
        createDeck();
        //needs to be revisted, name and avatar check
        // for(let i = 0; i < userArr.length; i++){
        //     if(newUser.name === userArr[i].name){
        //         newUser.name = newUser.name + "_";
        //     }            
        // }
        // joinGameLobby(lobbyCode);
    }
})

socket.on('disconnect', () => {
    //TBD
})


// let cardArr = [];
// const testFunction = () => {    
//     $.get("/api/cards/1", function(data) {       
//         if (data.length !== 0) {      
//           for (var i = 0; i < data.length; i++) {
//             cardArr.push(data[i]);
//           }      
//         }
//         if(cardArr.length > 0){
//         }   
//       });

      
// }
// const testFunction2 = () => {
//     let html = `<h3>Most Likely To</h3><p>${cardArr[2].body}</p><p>${cardArr[2].consequence} ${cons}</p>`
//     socket.emit('newGameLobby', {gameId: `12345678`, socketId: socket.id});
//     socket.emit('drawCard', html);
//     // $('.bg-card-3').append(html)
// }

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    backdrop: 'static',
    keyboard: false
    })
    $(document).ready(function() {
      valueSpan.html(rounds.val());
      rounds.on('input change', () => {
      valueSpan.html(rounds.val());
    });
});




