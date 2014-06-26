$(document).ready(function() {

var $gifPullSubmit = $('#gifPullSubmit');
var $gif_search = $('#gif_search');
var $gifArea = $('#gifArea').masonry();
var $container = $('#gifSearchOverlay')
var $closeEditBox = $('#closeEditBox');
var $previousGifs = $('#previousGifs');
var $nextGifs = $('#nextGifs');
var counter = 15;
		// initialize
	$gifArea.imagesLoaded(function() {
		$gifArea.masonry({
		  columnWidth: 0,
		  itemSelector: '.item',
		  isFitWidth: false,
		  stamp: '.stamp',
		  opacity: 0, transform: 'scale(0.001)'
		});
	});



		

$('#getGifs').on('click', function() {
	$container.show();
	$closeEditBox.show();
});

$closeEditBox.on('click', function() {
	$container.hide();
	$closeEditBox.hide();
	$gifPullSubmit.val('');
	$('#gifArea').html('');
	counter = 15;
	console.log(counter);
});
	

//create array to gather all of the gifs
var allTheGifs = [];
//on 'enter'
$gif_search.on('submit', function(event) {
	//reinitialize the array to erase old searches
	allTheGifs = [];
	//set the counter to 15 to append 15 images at a time
	counter = 15;
	//remove old images from the gifArea
	$('#gifArea').html('');
	//prevent the default submission action	
	event.preventDefault();
	//grab the search query from the search bar
	var tag = ($gifPullSubmit.val());
	//submit the query to giphy first
	var getGif = "http://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=dc6zaTOxFJmzC&limit=100";
	//submit a json query to giphy
	$.getJSON(getGif, function(gifs) {
		for (var i = 0; i < 100; i++) {
			if(gifs.data[i] === undefined) {
				$gifArea.append('<div class="alert alert-warning alert-dismissible" role="alert">' +
  								 '<button type="button" class="close" data-dismiss="alert">' +
  								 '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>' +
  								 '</button><strong>No Results Found!</strong></div>');
				return;
			} else {
				allTheGifs.push('<div class="item"><img src=\"' + gifs.data[i].images.fixed_height.url + '\"\/></div>');
			}

				
								
		
						}
			$gifArea.imagesLoaded( function() {
			for(var j = 0; j < 15; j++) {
				$gifArea.append(allTheGifs[j]).masonry();
				}
			});
		});
		
	
});



//all the gifs now contains all the gifs loaded
$nextGifs.on('click', function() {
	console.log('all the gifs length is ' + allTheGifs.length);
	if((allTheGifs.length - 1) < counter) {
		$gifArea.append('<div class="alert alert-warning alert-dismissible" role="alert">' +
  								 '<button type="button" class="close" data-dismiss="alert">' +
  								 '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>' +
  								 '</button><strong>End of the Line!</strong></div>');
		return
	};

	console.log(allTheGifs);
		$('#gifArea').html('');
			//when next is clicked, load gifs 5 - 9, then 10 - 14
				$gifArea.imagesLoaded( function() {
					for(var i = counter; i < counter + 15; i++) {
					$gifArea.append(allTheGifs[i]).masonry();
					console.log(i);
					}
					counter += 15;
				});

			
			
			console.log(counter);
		});


//PREVIOUS FUNCTION
$previousGifs.on('click', function() {
	console.log('all the gifs length is ' + allTheGifs.length);
	if(counter < 0) {
		return;
	}
	console.log(allTheGifs);
		$('#gifArea').html('');
			//when next is clicked, load gifs 5 - 9, then 10 - 14
				$gifArea.imagesLoaded( function() {
					for(var i = counter; i > counter - 15; i--) {
					$gifArea.append(allTheGifs[i]).masonry();
					console.log(i);
					} 
					if(counter >= 15) {
						counter -= 15;
					} else {
						return;
					}
					
				});

			
			
			console.log(counter);
		});


});