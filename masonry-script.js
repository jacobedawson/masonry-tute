$(document).ready(function() {

var $gifPullSubmit = $('#gifPullSubmit');
var $gif_search = $('#gif_search');
var $gifArea = $('#gifArea');
var $container = $('#gifSearchOverlay').masonry();

		// initialize
	$container.imagesLoaded(function() {
		$container.masonry({
		  columnWidth: 0,
		  itemSelector: '.item',
		  isFitWidth: false,
		  stamp: '.stamp',
		  opacity: 0, transform: 'scale(0.001)'
		});
	});



		

$('#getGifs').on('click', function() {
	$container.show();
});

$('#hideGifs').on('click', function() {
	$container.hide();
	$('#gifArea').html('');
});
	



$gif_search.on('submit', function(event) {
	$('#gifArea').html('');
	var allTheGifs = [];
	event.preventDefault();
	var tag = ($gifPullSubmit.val());
	var getGif = "http://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=dc6zaTOxFJmzC&limit=15";
	$.getJSON(getGif, function(gifs) {
		for (var i = 0; i < 15; i++) {
		allTheGifs.push('<div class="item"><img src=\"' + gifs.data[i].images.fixed_height.url + '\"\/></div>');
					}
			$container.imagesLoaded( function() {
				$('#gifArea').append(allTheGifs).masonry();
			});
		});
});






	
	//end script
	});
