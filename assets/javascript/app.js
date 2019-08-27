$(document).ready(function() {
	const searchGifs = [
		'Final Fantasy 7',
		'Legend of Zelda',
		'Persona Gold 4',
		'Overwatch',
	];
	let lastClick = [];
	let ten = 10;

	// create and add buttons that user has entered in
	function renderButtons() {
		$('#gifs-button').empty();

		for (var i = 0; i < searchGifs.length; i++) {
			var a = $('<button>');
			a.addClass('gif-button');
			a.attr('data-name', searchGifs[i]);
			a.text(searchGifs[i]);
			$('#gifs-button').append(a);
		}
	}

	//add string user entered to userInput array and append new button to the screen
	$('#add-gif').on('click', function(event) {
		event.preventDefault();
		var userInput = $('#gif-input')
			.val()
			.trim();
		searchGifs.push(userInput);
		renderButtons();
		$('#gif-input').val('');
	});

	renderButtons();

	const addTen = $('#add-ten').on('click', function(event) {
		event.preventDefault();
		if (event) {
			ten += 10;
		}
	});

	//reset +10
	$('#reset').on('click', function(event) {
		event.preventDefault();

		if (event) {
			$('#gifs-view').empty();
			ten = 10;
		}
	});

	renderButtons();

	// get gifs and append to screen
	function displayImage() {
		lastClick = [];
		$('#gifs-view').empty(); //empty divs of previous gifs
		const newGif = $(this).attr('data-name');
		const queryURL = `https://api.giphy.com/v1/gifs/search?q=${newGif}&api_key=qwdsORm6eCZFU7evcJceLJPt51ve5HC5&limit=${ten}`;
		lastClick.push($(this).attr('data-name'));

		//search Gipphy API for matching gifs
		$.ajax({
			url: queryURL,
			method: 'GET',
		}).then(function(response) {
			const results = response.data;

			//loop through gifs and place in new divs and prepend gif to page
			for (i = 0; i < results.length; i++) {
				if (results[i].rating !== 'R') {
					const gifDiv = $('<div class="view col-12 col-md-5">');
					const animated = results[i].images.fixed_width.url; 
					const still = results[i].images.fixed_width_still.url; 
					const p = $('<p>').text('Rating: ' + results[i].rating); 
					const t = $('<p>').text('Title: ' + results[i].title);
					const d = $('<p>').text('Tag: ' + newGif);
					const gifImage = $('<img>');
					gifImage
						.attr('src', still)
						.addClass('gif')
						.attr('data-state', 'still')
						.attr('data-still', still)
						.attr('data-animate', animated);
					addTen.attr('data-name', lastClick);
					gifDiv.append(t, d, p);
					gifDiv.prepend(gifImage);
					$('#gifs-view').prepend(gifDiv); 
				}
			}
		});
	}

	$(document).on('click', '.gif-button', displayImage);

	$(document).on('click', '.gif', playPause);

	//play or pause gif on click
	function playPause() {
		var state = $(this).attr('data-state');
		//if state is 'data-still' switch to 'data-animate' else switch to 'data-still'
		if (state === 'still') {
			$(this).attr('src', $(this).attr('data-animate'));
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', $(this).attr('data-still'));
			$(this).attr('data-state', 'still');
		}
	}
});
