$( document ).ready(function() {

	// my array
var showName = ["South Park", "Futurama", "Beavis and Butthead", "Rick and Morty", "Family Guy", "Bugs Bunny"];

//function that displays the gif buttons

function displayGifButtons() {
    $("#gifButtonsView").empty();    
	for (var i = 0; i < showName.length; i++) {
		var gifButton = $("<button>");
		gifButton.addClass("cartoon");
		gifButton.addClass("btn btn-primary")
		gifButton.attr("data-name", showName[i]);
		gifButton.text(showName[i]);
        $("#gifButtonsView").append(gifButton);
    }
}

//function to add new button

function addNewButton() {
	$("#addGif").on("click", function() {
		var cartoon = $("#topicInput").val().trim();
		if (cartoon == ""){
			return false; //no blank buttons
		}
		showName.push(cartoon);
		displayGifButtons();
		return false;
		});
}		

//function to remove last button
function removeLastButton() {
	$("removeGif").on("click", function() {
		showName.pop(cartoon);
		displayGifButtons();
		return false;
	});

}
console.log(removeLastButton)

// function that displays the gifs

function displayGifs() {
	var cartoon = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=21epgz1r7Dr9vA4P79rxPK9bqU9se9qY&limit=10";
	
	$.ajax({
		url: queryURL,
		method: 'GET'
	})

	.done(function(response) {
		$("#gifsView").empty();
		//show results of gifs
		var results = response.data;
		if (results == ""){
			alert("GIF You!");	
		}
		for (var i = 0; i<results.length; i++){
			//put gifs in a div
            var gifDiv = $("<div1>");
            
			//pull rating of gif
			var gifRating = $("<p>").text("Rated - " + results[i].rating);
			gifDiv.append(gifRating);

			//pull gif
			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height_small_still.url);
        
            //paused images
			gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        
            //animated images
			gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
        
            //how images come in, already paused
			gifImage.attr("data-state", "still");
			gifImage.addClass("image");
			gifDiv.append(gifImage);
        
            //add new div to existing divs
			$("#gifsView").prepend(gifDiv);
		}
	});
}

//list of already added cartoons
displayGifButtons();
addNewButton();
removeLastButton();


//event listeners
$(document).on("click", ".cartoon", displayGifs);

$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	} else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}

	});

});