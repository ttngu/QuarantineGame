$(document).ready(function() {
    $('.suggestion-btn').click(() => {
        let input = $('#submitInput').val();
        $.post(`/api/suggestion/`, {
            input: input
          }, function(data, status) {
            console.log("suggestions submission status: " + status)
          })
    })
});