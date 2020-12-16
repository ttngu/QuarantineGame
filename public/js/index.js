const userInput = $('#username');
const imageInput = $('#inputGroupSelect04');
const lobbyInput = $('#lobby');

$('.create').click(() => {
    let avatar = imageInput.val();
    let name = userInput.val().trim();
    let userArr = [];
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
    let avatar = imageInput.val();
    let sentData = [];
    let lobbyCode = lobbyInput.val().trim();
    console.log(name);
    if(name){
        sentData = [{name: name, avatar: avatar, score: 0},lobbyCode];
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
            valueSpan.html(`<img src="/images/avatar-icons/${$(this).val()}.png">`);
        }
    }).change();
  });

  