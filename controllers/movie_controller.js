// Import NPM dependency and Express router function.
var express = require('express');
var router = express.Router();
var request = require('request');

// Import data model.
var db = require('../models');

// GET route which calls uses Sequelize's findAll method.
// This route then hands the data it receives to handlebars so index can be rendered.
router.get('/', function(req, res) {
    db.Movie.findAll({
        order: 'movie_name ASC'

    }).then(function(data) {
        var hbsObject = {
            movies: data
        };
        res.render('index', hbsObject);
    });
});

router.get('/year', function(req, res) {
    db.Movie.findAll({
        order: 'movie_year DESC'

    }).then(function(data) {
        var hbsObject = {
            movies: data
        };
        res.render('index', hbsObject);
    });
});

router.get('/rating', function(req, res) {
    db.Movie.findAll({
        order: 'movie_ratingImdb DESC'

    }).then(function(data) {
        var hbsObject = {
            movies: data
        };
        res.render('index', hbsObject);
    });
});


// POST route which calls Sequelize's create method with the movie name given.
router.post('/api/new/movie', function(req, res) {

    var movieName = req.body.name;

    var queryUrl = "http://omdbapi.com/?apikey=40e9cece&t=" + movieName;

    request(queryUrl, function(error, response, body) {


        if (!error && JSON.parse(body).Response !== 'False') {
            console.log(JSON.parse(body));

            var imdbId = JSON.parse(body).imdbID;

            console.log(imdbId);

            var videos = "";

            var options = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/' + imdbId + '/videos',
                qs: {
                    language: 'en-US',
                    api_key: 'd50548305ff81a83c1c65efa4ce59583'
                },
                body: '{}'
            };

            request(options, function(error, response, result) {

                if (error) res.redirect('/');


                // if (error) {
                //     alert("Seems to be a problem with your input. Please try again");
                //     //res.redirect('/');
                // } else {
                if (!JSON.parse(result).results) {
                    // res.send('SOMETHING WENT WRONG');
                    res.redirect('/')
                } else {
                    videos = JSON.parse(result).results[0].key;
                    console.log(videos);
                    db.Movie.create({
                        movie_name: JSON.parse(body).Title,
                        movie_poster: JSON.parse(body).Poster,
                        movie_genre: JSON.parse(body).Genre,
                        movie_time: JSON.parse(body).Runtime,
                        movie_plot: JSON.parse(body).Plot,
                        movie_director: JSON.parse(body).Director,
                        movie_actors: JSON.parse(body).Actors,
                        movie_year: JSON.parse(body).Year,
                        movie_trailer: videos,
                        movie_ratingImdb: JSON.parse(body).Ratings[0].Value,
                        movie_ratingRotten: JSON.parse(body).Ratings[1].Value

                    }).then(function() {
                        res.redirect('/');
                    });

                }
            });

        } else {
            console.log("\nOops...something went wrong with you movie search. Try again...");
            res.redirect('/');
        }
    });
});


// update method to mark that movie as watched.
router.put('/api/new/watched/:id', function(req, res) {

    var watched = true;
    var ID = req.params.id;

    db.Movie.update({
        watched: watched,

    }, { where: { id: ID } }).then(function() {
        res.redirect('/');
    });
});


// PUT (update) route which calls Sequelize's update method to mark the movie as not yet watched .
// Sends the id to identify which movie. 
router.put('/:id', function(req, res) {
    var watched = false;
    var ID = req.params.id;

    db.Movie.update({
        watched: watched,

    }, { where: { id: ID } }).then(function() {
        res.redirect('/');
    });
});

// Deleting a movie

router.delete('/api/new/delete/:id', function(req, res) {

    var ID = req.params.id;

    db.Movie.destroy({
        where: { id: ID }
    }).then(function() {
        res.redirect('/');
    });
});

// Export routes for server.js.
module.exports = router;