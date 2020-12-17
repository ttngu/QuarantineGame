const userInput = $('#username');
const imageInput = $('#inputGroupSelect04');
const lobbyInput = $('#lobby');

$('.create').click(() => {
    let avatar = imageInput.val();
    if(avatar === "Choose Your Avatar"){
        avatar = "trash";
    }
    let name = userInput.val().trim();
    let userArr = [];
    if(name){
        userArr = [{name: name, avatar: avatar, score: 0}];
        localStorage.setItem("newLobby", JSON.stringify(userArr));
        window.location.href = "/game";
    } else {
        alert("Username Required to Join a Lobby");  
    }
})

$('.join').click(() => {
    let name = userInput.val().trim();
    let avatar = imageInput.val();
    if(avatar === "Choose Your Avatar"){
        avatar = "trash";
    }
    let sentData = [];
    let lobbyCode = lobbyInput.val().trim();
    if(!lobbyCode){
        alert("Lobby Code Required to Join a Lobby");       
    }else{ 
        if(name){
        sentData = [{name: name, avatar: avatar, score: 0},lobbyCode];
        localStorage.setItem("joinLobby", JSON.stringify(sentData));
        window.location.href = "/game";
    } else {
        alert("Username Required to Join a Lobby");  
    }}
    
})

$(document).ready(function() {
    const valueSpan = $('.valueSpan');
    const value = imageInput;
    value.change(function() {
        if($(this).val() !== "Choose Your Avatar"){
            valueSpan.html(`<img src="/images/avatar-icons/${$(this).val()}.png">`);
        }
    }).change();
  });

  