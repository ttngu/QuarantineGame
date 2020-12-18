$(document).ready(function() {
    $('.suggestion-btn').click(() => {
        let input = $('#submitInput').val();
        $.post(`/api/suggestion/`, {
            input: input
          }, function(data, status) {
              $('#submitInput').val("");
            console.log("suggestions submission status: " + status)
          })
    })
});