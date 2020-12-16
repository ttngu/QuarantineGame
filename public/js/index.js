const userInput = $('#username');
const imageInput = $('#inputGroupSelect04');
// const lobbyInput = $('#lobby');

$('.create').click(() => {
    let avatar = imageInput.val();
    let name = userInput.val().trim();
    let userArr = [];
    console.log(avatar);
    if(name){
        userArr = [{name: name, avatar: avatar, score: 0}];
        localStorage.setItem("newLobby", JSON.stringify(userArr));
        window.location.href = "/game";
    } else {
        //fail condition for trying to create lobby
    }
})

$('.join').click(() => {
    let name = userInput.val().trim();
    let sentData = [];
    let lobbyCode = "Hello";
    console.log(name);
    if(name){
        sentData = [{name: name, avatar: 0, score: 0},lobbyCode];
        localStorage.setItem("joinLobby", JSON.stringify(sentData));
        window.location.href = "/game";
    } else {
        //fail condition for trying to create lobby
    }
})

$(document).ready(function() {
    const valueSpan = $('.valueSpan');
    const value = $('#inputGroupSelect04');
    console.log($(this).val());
    value.change(function() {
        if($(this).val() !== "Choose Your Avatar"){
            valueSpan.html(`<img src="/images/${$(this).val()}.png">`);
        }
    }).change();
  });

  