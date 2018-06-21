

$(document).ready(function () {
    var searchGifs = ["Final Fantasy 7", "Legend of Zelda", "Persona Gold 4", "Overwatch"];
    console.log(searchGifs)

    // create and add buttons that user has entered in
    function renderButtons() {

        $("#gifs-button").empty();

        for (var i = 0; i < searchGifs.length; i++) {
            var a = $("<button>");
            a.addClass("gif-button");
            a.attr("data-name", searchGifs[i]);
            a.text(searchGifs[i]);
            $("#gifs-button").append(a);
        }
    }
    //add string user entered to userInput array and append new button to the screen
    $("#add-gif").on("click", function (event) {

        event.preventDefault();
        var userInput = $("#gif-input").val().trim();
        searchGifs.push(userInput);
        renderButtons();
        $("#gif-input").val("");
    });

    renderButtons();
    // get gifs and append to screen
    function displayImage() {
        
        $("#gifs-view").empty();//empty divs of previous gifs

        let newGif = $(this).attr('data-name')
        let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + newGif + '&api_key=qwdsORm6eCZFU7evcJceLJPt51ve5HC5&tag&limit=5';
        console.log(queryURL)
        //search Gipphy API for matching gifs
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                let results = response.data
                //loop through gifs and place in new divs
                for (i = 0; i < results.length; i++) {
                    if (results[i].rating !== 'R') {
                        
                        let gifDiv = $('<div class="view col-12">')//create new divs with grid
                        let animated = results[i].images.fixed_width.url //assign gif to a varible
                        let still = results[i].images.fixed_width_still.url //assign still to a varible
                        let p = $('<p>').text('Rating: ' + results[i].rating) //create and assign the Rating to a <p>
                        let gifImage = $('<img>') //create an img tag for the gifs
                        //assign attr and class to <img> to use later for play and pause of gifs
                        gifImage.attr('src', still) 
                        gifImage.addClass('gif')
                        gifImage.attr('data-state', 'still')
                        gifImage.attr('data-still', still)
                        gifImage.attr('data-animate', animated)
                        //prepend rating and gif
                        gifDiv.prepend(p)
                        gifDiv.prepend(gifImage)
                        $("#gifs-view").prepend(gifDiv)//prepend gif to page

                    }
                }
            })
    }
    $(document).on("click", ".gif-button", displayImage);//call displayImage function

    $(document).on('click', '.gif', playPause)//call playPause function
   //play or pause gif on click
    function playPause() {
        //assign varible to 'data-state
        var state = $(this).attr("data-state");
        //if state is 'data-still' switch to 'data-animate' else switch to 'data-still'
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

})



