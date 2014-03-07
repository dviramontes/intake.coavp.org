var Intake = require('../models/Intake');

exports.del = function(req, res, next) {
    Intake.remove({
        caseNumber: req.body.caseNumber
    }, function(err, deletedIntake) {
        if (err) {
            return next(
                new restify.InvalidArgumentError(JSON.stringify(err.errors))
            );
        }
        res.send(200, 'Deleted intake with caseNumber of :' + deletedIntake);
    });
}

exports.post = function(req, res, next) {
    console.log(req.body);
    if (req.body.caller.first === undefined) {
        console.log('name is undefined yo');
        return next(new restify.InvalidArgumentError(
            'Name must be supplied yo'));
    }

    return (new Intake(req.body)
        .save(function(err, savedIntake) {
            if (err) {
                console.warn('duplicate caseNumber, skipping post');
                console.dir(err);
                return next(res.send(JSON.stringify(err.err)));
            }
            res.send(201, savedIntake);
        }));

}

exports.get = function(req, res, next) {
    Intake.findOne({
        // caseNumber: req.body.caseNumber
    }, function(err, gotIntake) {
        if (err) {
            return next(new restify.InvalidArgumentError(
                JSON.stringify(err.errors)));
        }
        if (gotIntake) {
            res.send(gotIntake);
        } else {
            res.send(404);
        }
    });
}

exports.getAll = function(req, res) {
    Intake.find({}, function(err, foundIntakes) {
        if (err) { // error ?
            res.send(err);
        }
        res.json(foundIntakes); // return all intakes in json
    });
}

/**
 * UPDATE single
 */

exports.put = function(req, res, next) {
    console.log(red('printing req.body'));
    console.dir(req.body);
    var caseNumber = req.body.caseNumber || undefined;
    if (caseNumber === undefined) {
        console.log('A case number must be provided update route');
        return next(new restify.InvalidArgumentError(
            'A case number must be provided update route'));
    }
    // aliases
    var _ = req.body;
    var _caller = _.caller;

    var update = {
        'taker': _.taker,
        'contributorType': _.contributorType,
        // 'caseNumber': _.caseNumber,
        'hidden': _.hidden,
        'callbackNeeded': _.callbackNeeded,
        'caseType': _.caseType,
        'caller': {
            'first': _caller.first,
            'last': _caller.last,
            'email': _caller.email,
            'address': _caller.address,
        },
        'callerPresentsAs': _.callerPresentsAs,
        'callerAssessedAs': _.callerAssessedAs,
        'referedBy': _.referedBy
    };

    Intake.findOneAndUpdate({
            'caseNumber': caseNumber
        }, // conditions
        update, // payload
        { // options
            upsert: true,
            new: true
        },

        function(err) { // callback
            if (err) {
                res.send(err.err);
            }
            console.log('updated intake with caseNumber of : ' + caseNumber);
            res.send(200, 'updated intake with caseNumber of : ' + caseNumber);
        });
}

