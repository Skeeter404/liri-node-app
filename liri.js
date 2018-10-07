//laying out code for required packages.
//placing variables that will remain the same throughout the whole program. 
require("dotenv").config();

var request = require("request");

var keys = require("./keys.js");

var moment = require("moment");

var selector = process.argv[2];

var query = process.argv.slice(3).join("+");

//starting functioning for spotify data retrieval
function spotifyThisSong(trackQuery) {

  var Spotify = require('node-spotify-api');

  var spotify = new Spotify(keys.spotify);

  if (trackQuery === undefined) {
    trackQuery = "Don't stop believin";
  }


  spotify.search({ type: 'track', query: trackQuery }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var songData = data.tracks.items[0];

    var showData = [
      "Song: " + songData.name,
      "Album: " + songData.album.name,
      "Artist: " + songData.artists[0].name,
      "Release Date: " + songData.album.release_date,
      "Preview: " + songData.preview_url
    ].join("\n");

    console.log(showData);
  });
};

//functionality to hit bands in town api and post info to terminal
function concertThis(artistQuery) {

  if(artistQuery === undefined){
    artistQuery = "Chris Stapleton";
  }

  var queryURL = "https://rest.bandsintown.com/artists/" + artistQuery + "/events?app_id=codingbootcamp";

  request(queryURL, function (error, response, body) {

    var concertInfo = JSON.parse(body);

    concertInfo.forEach(function (event) {

      console.log(`\nVenue: ${event.venue.name} \nLocation: ${event.venue.city + ", " + event.venue.country} \nShow Date: ${moment(event.datetime).format("MM-DD-YYYY")}`)

    })
  });
};

//functionality for omdb request
function movieThis(movieQuery) {
  
  if (movieQuery === undefined) {
    movieQuery = "batman the dark knight";
  }

  var movieURL = "http://www.omdbapi.com/?t=" + movieQuery + "&plot=short&apikey=trilogy";

  request(movieURL, function (error, response, body) {
    
      var movieData = JSON.parse(body);

      var rottenRating = "";

        if(movieData.Ratings[1]){
          rottenRating = movieData.Ratings[1].Value;
        } else {
          rottenRating = "N/A";
        }

      var movieShow = [
        "Title: " + movieData.Title,
        "Release Year: " + movieData.Year,
        "IMDB Rating: " + movieData.imdbRating,
        "Rotten Tomatoes Rating: " + rottenRating,
        "Produced in: " + movieData.Country,
        "Language: " + movieData.Language,
        "Plot: " + movieData.Plot,
        "Actors: " + movieData.Actors
      ].join("\n");
      console.log(movieShow);
  });
};

movieThis();