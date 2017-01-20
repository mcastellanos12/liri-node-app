//Grab the data from keys.js and store the keys in a variable


var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;
var parameters = process.argv.slice(3);

var action = process.argv[2];
// var value = process.argv[3];

    switch(action){
    //This will show your last 20 tweets and when they were created at in your terminal/bash window.
    case 'my-tweets' :
      myTweets();
      break;
    //will show artist, the song name, a preview link of the song, and the album name
    case 'spotify-this-song' :
      mySpotify();
      break;
    //will show title, release year, rating, country, language, plot, actors, rotten tomatoes rating and URL
    case 'movie-this' :
      myMovie();
      break;
    //will take the text inside of random.txt and then use it to call one of Liri's commands
    case 'do-what-it-says' :
      doWhat();
      break;  
  };

  //npm twitter
  function myTweets () {
  var client = new Twitter(twitterKeys);

	var params = {screen_name: 'mickielilly', count: 20};
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
	if(!error){
		console.log(tweets);
	}
});
}

function mySpotify() {
	var querySong = process.argv[3];
  	spotify.search({ type: 'track', query: querySong }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;  //from spotify npm docs
    }
    else{
    var songInfo = data.tracks.items[0];
    var songResult = console.log(songInfo.artists[0].name)
                     console.log(songInfo.name)
                     console.log(songInfo.album.name)
                     console.log(songInfo.preview_url)
    console.log(songResult);
    };
  });
}  

function myMovie(){
	// pieces together movie title argvs 
	var movieTitle = process.argv[3];
	var movieSearch;
	var movieUrl = 'http://www.omdbapi.com/?t=' + movieTitle +'&tomatoes=true&y=&plot=short&r=json';

		request(movieUrl, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				movieSearch = JSON.parse(body);

				console.log("The Title is: " + movieSearch.Title);
				console.log("The Year is: " + movieSearch.Year);
				console.log("The imdbRating is: " + movieSearch.imdbRating);
				console.log("The Country is: " + movieSearch.Country);
				console.log("The Language is: " + movieSearch.Language);
				console.log("The Plot is: " + movieSearch.Plot);
				console.log("The Actors are: " + movieSearch.Actors);
				console.log("The Rotton Tomatoes Rating is: " + movieSearch.tomatoRating);
				console.log("The Rotton Tomatoes url is: " + movieSearch.tomatoURL);
			}
		});

}

function doWhat (){
	fs.readFile("random.txt", "utf8", function(error, data){
	console.log(data);
	})

}



