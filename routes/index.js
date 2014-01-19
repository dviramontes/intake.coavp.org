/*
    TODO:
    [x] - refactor loading the intakes model
    currently it only loads when the intakes model loads
    on / route
    -
    [x] - figure out * get route for single page app
*/

// load intake model
var Intake = require('../models/Intake').Intake;
var colors = require('colors');

module.exports = function(app) {

    app.get('/', function(req, res, next) {
        // res.render('index', {
        //     title: 'Express'
        // });
    });

    // api . get all todos
    app.get('/api/intakes', function(req, res, next) {
        // lets find some intakes..
        Intake.find(function(err, intakes) {
            if (err) res.send(err); // error ?
            res.json(intakes); // return all intakes in json
        })
    });

    // put new intake in db
    app.post('/api/intakes', function(req, res) {

        console.log("name from view :-> ".red );
        console.dir(JSON.stringify(req.body));

        Intake.create({
            taker : {
                "name" : req.body.name,
                "category"   : req.body.category
            },
            date: req.body.date,
            
            done: false
        }, function(err, intake) {
            // catch error in intake document creation
            if (err) res.send(err);

            // return a list of all intakes
            // after one has been created...
            Intake.find(function(err, intakes) {
                if (err) res.send(err);
                res.json(intakes);
            });
        });
    });

    // delete from db
    app.delete('/api/intakes/:intake_id', function(req, res) {

        Intake.remove({
            _id: req.params.intake_id
        }, function(err, intake) {

            if (err) res.send(err);

            // return a list of remaining intakes in
            // db
            Intake.find(function(err, intakes) {
                if (err) res.send(err);
                res.json(intakes);
            })
        })
    });

    // route for single page app or SPA
    // app.get('*', function(req,res){
    //     // load single view
    //     // angular will handle other views
    //     res.sendfile('./public/index.html');
    // })


};
