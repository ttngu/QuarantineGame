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