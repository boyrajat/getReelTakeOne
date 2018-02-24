// Import NPM dependency and Express router function.
var express = require('express');
var router = express.Router();
var request = require('request');
//var omdb = require('omdb');
// Import data model.
var db = require('../models');

// GET route which calls uses Sequelize's findAll method.
// This route then hands the data it receives to handlebars so index can be rendered.
router.get('/', function(req, res) {
    db.Movie.findAll({
        order: 'movie_name ASC',
        include: [
            { model: db.Customer, required: false }
        ]
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
    // movieName = movieName.toLowerCase();
    var queryUrl = "http://omdbapi.com/?apikey=40e9cece&t=" + movieName;

    request(queryUrl, function(error, response, body) {
        // console.log(error);
        // console.log(response);


        if (!error && JSON.parse(body).Response !== 'False') {
            console.log(JSON.parse(body));
            console.log(JSON.parse(body).Poster);
            // var reqData = '\n' + '<---- Here It Goes ----> ' +
            //     '\n' + '> Title: ' + JSON.parse(body).Title +
            //     '\n' + '> Year Released: ' + JSON.parse(body).Year +
            //     '\n' + '> IMDB Rating: ' + JSON.parse(body).Ratings[0].Value +
            //     '\n' + '> Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value +
            //     '\n' + '> Countries: ' + JSON.parse(body).Country +
            //     '\n' + '> Available in: ' + JSON.parse(body).Language +
            //     '\n' + '> Starring: ' + JSON.parse(body).Actors +
            //     '\n' + '> Here is a gist of it: ' + JSON.parse(body).Plot + '\n';

            // console.log(reqData);

            //                     fs.appendFile('./log.txt', '\n***MOVIE INFO LOGGED' + reqData + '\n', function() {
            // console.log('\nMOVIE INFO HAS BEEN LOGGED TO log.txt FILE' + '\n');
            // });



        } else {
            console.log("\nOops...something went wrong with you movie search. Try again...");
            // fs.appendFile('./log.txt', '\n***MOVIE SEARCH ERROR LOGGED ' + JSON.parse(body).Error + '\n', function() {
            // console.log('\nMOVIE SEARCH ERROR HAS BEEN LOGGED TO log.txt FILE' + '\n');
        }
        db.Movie.create({
            movie_name: JSON.parse(body).Title,
            movie_poster: JSON.parse(body).Poster,
            movie_genre: JSON.parse(body).Genre,
            movie_time: JSON.parse(body).Runtime,
            movie_plot: JSON.parse(body).Plot,
            movie_director: JSON.parse(body).Director,
            movie_actors: JSON.parse(body).Actors,
            movie_year: JSON.parse(body).Year,
            movie_ratingImdb: JSON.parse(body).Ratings[0].Value,
            movie_ratingRotten: JSON.parse(body).Ratings[1].Value
        }).then(function() {
            res.redirect('/');
        });
    });



});

// POST route which calls Sequelize's create method with a customer name,
// then the update method to attach the name to a burger and mark that burger as eaten.
router.put('/api/new/customer/:id', function(req, res) {
    var customerName = req.body.customer_name;
    db.Customer.create({
        customer_name: customerName
    }).then(function(data) {
        var watched = true;
        var ID = req.params.id;

        db.Movie.update({
            watched: watched,
            CustomerId: data.id
        }, { where: { id: ID } }).then(function() {
            res.redirect('/');
        });
    });
});



// PUT (update) route which calls Sequelize's update method to make the burger available to eat again..
// Sends the id to identify which burger. Clears out CustomerId.
router.put('/:id', function(req, res) {
    var watched = false;
    var ID = req.params.id;

    db.Movie.update({
        watched: watched,
        CustomerId: null
    }, { where: { id: ID } }).then(function() {
        res.redirect('/');
    });
});

// Export routes for server.js.
module.exports = router;