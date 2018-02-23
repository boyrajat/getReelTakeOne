// Import NPM dependency and Express router function.
var express = require('express');
var router = express.Router();

// Import data model.
var db = require('../models');

// GET route which calls uses Sequelize's findAll method.
// This route then hands the data it receives to handlebars so index can be rendered.
router.get('/', function (req, res) {
    db.Burger.findAll({
        order: 'burger_name ASC',
        include: [
            {model: db.Customer, required: false}
        ]
    }).then(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
    });
});

// POST route which calls Sequelize's create method with the burger name given.
router.post('/api/new/burger', function (req, res) {
    var burgerName = req.body.name;
    db.Burger.create({
        burger_name: burgerName
    }).then(function () {
        res.redirect('/');
    });
});

// POST route which calls Sequelize's create method with a customer name,
// then the update method to attach the name to a burger and mark that burger as eaten.
router.put('/api/new/customer/:id', function(req, res) {
    var customerName = req.body.customer_name;
    db.Customer.create({
        customer_name: customerName
    }).then(function(data) {
        var devoured = true;
        var ID = req.params.id;

        db.Burger.update({
            devoured: devoured,
            CustomerId: data.id},
            {where: {id: ID}}
        ).then(function() {
            res.redirect('/');
        });
    });
});



// PUT (update) route which calls Sequelize's update method to make the burger available to eat again..
// Sends the id to identify which burger. Clears out CustomerId.
router.put('/:id', function (req, res) {
    var devoured = false;
    var ID = req.params.id;

    db.Burger.update(
        {devoured: devoured,
        CustomerId: null},
        {where: {id: ID}}
    ).then(function () {
        res.redirect('/');
    });
});

// Export routes for server.js.
module.exports = router;