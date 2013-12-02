
/*
    TODO:
    [x] - refactor loading the intakes model
    currently it only loads when the intakes model loads
    on / route
    -
    [x] - figure out * get route for single page app
*/

module.exports = function(app) {

    var IntakeModel, Intake;

    process.stdout.write("testing Model import :: ".rainbow)

    var loadIntakeModel = function(){
        IntakeModel = Intake || require('../app.js').Intake;
    }

    app.get('/', function(req, res, next) {

        loadIntakeModel(); // load intake model
        // now if webapp is visited by user first

        res.render('index', {
            title: 'Express'
        });
    });

    // api . get all todos
    app.get('/api/intakes', function(req, res, next) {

        // lets load the Intake model now if not already loaded
        Intake = IntakeModel || require('../app.js').Intake;

        // lets find some shit..
        Intake.find(function(err, intakes) {
            if (err) res.send(err); // error ?
            res.json(intakes); // return all intakes in json
        })
    });

    // put new intake in db
    app.post('/api/intakes', function(req, res){

        Intake = IntakeModel || require('../app.js').Intake;

        console.log(req.body.text);

        Intake.create({
            name : req.body.text,
            done : false
        }, function(err, intake){
            // catch error in intake document creation
            if(err) res.send(err);

            // return a list of all intakes
            // after one has been created...
            Intake.find(function(err, intakes){
                if(err) res.send(err);
                res.json(intakes);
            });
        });
    });

    // delete from db
    app.delete('/api/intakes/:intake_id', function(req, res){

        Intake = IntakeModel || require('../app.js').Intake;

        Intake.remove({
            _id : req.params.intake_id
        }, function(err, intake){

            if(err) res.send(err);

            // return a list of remaining intakes in
            // db
            Intake.find(function(err, intakes){
                if(err) res.send(err);
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
