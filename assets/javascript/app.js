
var startGifs = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

console.log(startGifs)
$(document).ready(function () {
    
    // create and add buttons that user has entered in
    function renderButtons() {

        $("#gifs-view").empty();

        for (var i = 0; i < searchGifs.length; i++) {
            var a = $("<button>");
            a.addClass("gif");
            a.attr("data-name", searchGifs[i]);
            a.text(searchGifs[i]);
            $("#gifs-view").prepend(a);
        }
    }
    $("#add-gif").on("click", function (event) {
        let searchGifs = startGifs
    console.log(searchGifs)
        event.preventDefault();
        var userInput = $("#gif-input").val().trim();
        searchGifs.push(userInput);
        renderButtons();
    });

    renderButtons();
    // search gify for gifs and append to screen
    $(".gif").on('click', function () {
        let newGif = $(this).attr('data-name')
        let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + newGif + '&api_key=qwdsORm6eCZFU7evcJceLJPt51ve5HC5&tag&limit=10';
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                let results = response.data
                for (i = 0; i < results.length; i++) {
                    if (results[i].rating !== 'R' && results[i] !== 'PG-13') {
                    let gifDiv = $('<div id="gifs-view">')
                    let rating = results[i].rating
                    let p = $('<p>').text('Rating: ' + rating)
                    let gifImage = $('<img>')
                    gifImage.attr('src', results[i].images.fixed_height.url)
                    gifDiv.append(p)
                    gifDiv.append(gifImage)
                    $("#gifs-view").prepend(gifDiv)
                }
                }
            })
    })


})



