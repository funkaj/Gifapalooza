
var searchGifs = ["Spaceballs", "Final Fantasy 7", "Howls Moving Castle", "Mega-Man"];

console.log(searchGifs)
$(document).ready(function () {
    
    // create and add buttons that user has entered in
    function renderButtons() {
        $("#view").empty();
        
        
        for (var i = 0; i < searchGifs.length; i++) {
            var a = $("<button>");
            a.addClass("gif");
            a.attr("data-name", searchGifs[i]);
            a.text(searchGifs[i]);
            $("#gifs-view").prepend(a);
        }
    }
    $("#add-gif").on("click", function (event) {
        
        event.preventDefault();
        var userInput = $("#gif-input").val().trim();
        searchGifs.push(userInput);
        renderButtons();
    });
    
    renderButtons();
    
    // search gify for gifs and append to screen
    $(".gif").on('click', function () {
        let newGif = $(this).attr('data-name')
        let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + newGif + '&api_key=qwdsORm6eCZFU7evcJceLJPt51ve5HC5&tag&limit=5';
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                let results = response.data
                for (i = 0; i < results.length; i++) {
                    if (results[i].rating !== 'R') {
                    let gifDiv = $('<div id="view">')
                    let rating = results[i].rating
                    let p = $('<p>').text('Rating: ' + rating)
                    let gifImage = $('<img>')
                    gifImage.attr('src', results[i].images.fixed_height.url)
                    gifDiv.prepend(p)
                    gifDiv.prepend(gifImage)
                    $("#image").append(gifDiv)
                }
                }
            })
    })


})



