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

function noGifAlert() {
	$('body').prepend('<div class="alert alert-warning alert-dismissible" role="alert">' +
  								 '<button type="button" class="close" data-dismiss="alert">' +
  								 '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>' +
  								 '</button><strong>No Results Found!</strong></div>');
};

function endOfTheLine() {
	$('body').prepend('<div class="alert alert-warning alert-dismissible" role="alert">' +
  								 '<button type="button" class="close" data-dismiss="alert">' +
  								 '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>' +
  								 '</button><strong>End of the Line!</strong></div>');
};


	

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
	
	tryGiphy();

	function tryGiphy() {
	var getGif = "http://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=dc6zaTOxFJmzC&limit=100";
			//submit a json query to giphy
	$.getJSON(getGif, function(gifs) {
				if (gifs.data.length == 0) {
						console.log('giphy aint got it');
						tryFuckYeah();
						return;
						} else {
							console.log('giphy got it');
							tryFuckYeah();
							for(var i = 0; i < gifs.data.length; i++) {
							allTheGifs.push('<div class="item"><img src=\"' + gifs.data[i].images.fixed_height.url + '\"\/></div>');
				              	}
							}
			});
		//END GIPHY FUNCTION
			//END GIPHY QUERY 
	}



			
							      


								
		
						
	function tryFuckYeah() {
				//submit a query to fuck yeah gifs
	$.ajax({
			url: "http://api.tumblr.com/v2/blog/fuckyeahreactions.tumblr.com/posts/" +
			"?api_key=9Yt8UYwcFzmGT08az8NmSMVYsEGQwnVWio1dbUuJ4d4mZsp9kr&tag=" + tag,
						        dataType: 'jsonp',
						        success: function(data){
						            if(data.response.posts.length == 0) {
						            	console.log('fuck yeah aint got it');
						            	tryReplyGif();
					                	return;
					                } else {
					                	console.log('fuck yeah got it');
					                	tryReplyGif();
					                	for(var i = 0; i < data.response.posts.length; i++) {
						                    var gif = data.response.posts[i].body;
						                    var gifSrc = $(gif).find('img').attr('src');
						                    allTheGifs.push('<div class="item"><img src=\"' + gifSrc + '\"\/></div>');
						                }  
					                }
						                                         
						        }
						    });		
			//END FUCK YEAH QUERY
			}
	

	function tryReplyGif() {
				//REPLY GIF FUNCTION
	var getGif = "http://replygif.net/api/gifs?tag=" + tag + "&tag-operator=and&api-key=39YAprx5Yi";

								$.getJSON(getGif, function(gifs) {
									if (gifs.length == 0) {
									console.log('reply gif aint got it');
									tryGifbase();
									return;
								} else {
									console.log('reply gif got it');
									tryGifbase();
									for(var i = 0; i < gifs.length; i++) {
									allTheGifs.push('<div class="item"><img src=\"' +gifs[i].file + '\"\/></div>');
				              			}
									}
							      
				     			});
	//END REPLY GIF FUNCTION
			}
	

	 function tryGifbase() {
		//GIFBASE FUNCTION WITH PAGINATION CONTROL
	tag = tag.replace(/\s+/g, '');
	var getGif = "http://www.gifbase.com/tag/" + tag + "?p=1&format=json";
							//function if empty, display message
							$.getJSON(getGif, function(data) {
								if(data.length == 0 || data.error == "no gifs found for specified tag") {
									console.log('Gifbase aint got it');
									tryImagesLoaded();
									return;
								} else {
								console.log('Gifbase got it');
								for(var j = 1; j <= data.page_count; j++) {
									getGif = "http://www.gifbase.com/tag/" + tag + "?p=" + j + "&format=json";
									$.getJSON(getGif, function(data) {
										for(var i = 0; i < data.gifs.length; i++) {
										allTheGifs.push('<div class="item"><img src=\"' + data.gifs[i].url + '\"\/></div>');
												}
											});
										}
									tryImagesLoaded();
									}
								});					
	//END GIFBASE FUNCTION 	
	}
	

			 function tryImagesLoaded() {
				//BEGIN IMAGES LOADED FUNCTION
			$gifArea.imagesLoaded( function() {
			//console.log('all the gifs length is ' + allTheGifs.length);
			if(allTheGifs.length === 0) {
					noGifAlert();
				} else {
				 	for(var j = 0; j < 15; j++) {
					 $gifArea.append(allTheGifs[j]).masonry();
					}
				}	
			});
			//END IMAGES LOADED FUNCTION
			}	
			
			
		

});
//END GIF SEARCH	


//SHOW NEXT GIFS FUNCTION
$nextGifs.on('click', function() {
	//console.log('all the gifs length is ' + allTheGifs.length);
	if((allTheGifs.length - 1) < counter) {
		endOfTheLine();
		return;
	};

		$('#gifArea').html('');
			//when next is clicked, load gifs 5 - 9, then 10 - 14
				$gifArea.imagesLoaded( function() {
					for(var i = counter; i < counter + 15; i++) {
					$gifArea.append(allTheGifs[i]).masonry();
					console.log(i);
					}
					counter += 15;
				});

			
			
			//console.log(counter);
		});
//END NEXT GIFS FUNCTION

//SHOW PREVIOUS GIFS FUNCTION
$previousGifs.on('click', function() {
	//console.log('all the gifs length is ' + allTheGifs.length);
	if(counter < 0) {
		return;
	}
		$('#gifArea').html('');
			//when next is clicked, load gifs 5 - 9, then 10 - 14
				$gifArea.imagesLoaded( function() {
					for(var i = counter; i > counter - 15; i--) {
					$gifArea.append(allTheGifs[i]).masonry();
					//console.log(i);
					} 
					if(counter >= 15) {
						counter -= 15;
					} else {
						return;
					}
					
				});

			
			
			//console.log(counter);
		});
//END PREVIOUS GIFS FUNCTION


});
//END SCRIPT