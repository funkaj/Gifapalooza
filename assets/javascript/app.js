

$(document).ready(function () {
    var searchGifs = ["Baseball", "Softball", "Football", "Soccer", "Hockey", "Lacross", "Tennis", "Golf"];
    console.log(searchGifs)

    // create and add buttons that user has entered in
    function renderButtons() {

        $("#gifs-button").empty();

        for (var i = 0; i < searchGifs.length; i++) {
            var a = $("<button>");
            a.addClass("gif-button");
            a.attr("data-name", searchGifs[i]);
            a.text(searchGifs[i]);
            $("#gifs-button").prepend(a);
        }
    }
    $("#add-gif").on("click", function (event) {

        event.preventDefault();
        var userInput = $("#gif-input").val().trim();
        searchGifs.push(userInput);
        renderButtons();
    });

    renderButtons();
    function displayImage() {
        // search gify for gifs and append to screen
        $("#gifs-view").empty();
        let newGif = $(this).attr('data-name')
        let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + newGif + '&api_key=qwdsORm6eCZFU7evcJceLJPt51ve5HC5&tag&limit=5';
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                let results = response.data
                for (i = 0; i < results.length; i++) {
                    if (results[i].rating !== 'R') {
                        let gifDiv = $('<div class="view col-md-3">')
                        let animated = results[i].images.fixed_width.url
                        let still = results[i].images.fixed_width_still.url
                        let p = $('<p>').text('Rating: ' + results[i].rating)
                        let gifImage = $('<img>')

                        gifImage.attr('src', still)
                        gifImage.addClass('gif')
                        gifImage.attr('data-state', 'still')
                        gifImage.attr('data-still', still)
                        gifImage.attr('data-animate', animated)

                        gifDiv.prepend(p)
                        gifDiv.prepend(gifImage)
                        $("#gifs-view").prepend(gifDiv)

                    }
                }
            })
    }
    $(document).on("click", ".gif-button", displayImage);

    $(document).on('click', '.gif', playPause)
    function playPause() {
        
        var state = $(this).attr("data-state");
      
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      }

})



