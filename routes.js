//
// * route info and handlers
//

var Types = require('hapi').types;

// * GET plural

function getIntakes(request) {

    var _name = request.query.name || undefined;

    if (_name) {
        request.reply(findIntakes(_name));
    } else {
        request.reply(intakes);
    }

}

function findIntakes(name) {
    return intakes.filter(function(intake) {
        return intake.name.toLowerCase() === name.toLowerCase();
    });
}

// * GET single

function getIntake (request) {

	var intake = intakes.filter(function(d){
		return d.id == request.params.id;
	}).pop();

	request.reply(intake);
}

// * POST single

function addIntake(request){

	var _total = intakes.length - 1;

	var intake = {
		id : intakes[_total].id +1,
		name : request.payload.name
	}

	intakes.push(intake);

	request.reply.created('/intakes/' + intake.id)({
		id: intake.id
	});
}

//
// * export routes
//

module.exports = [{
    method: 'GET',
    path: '/intakes',
    config: {
        handler: getIntakes, // GET plural
        // query: {
        //     name: Types.String()
        // }
    }
}, {
    method: 'GET',
    path: '/intakes/{id}',
    config: {
        handler: getIntake // GET single
    }
}, {
    method: 'POST',
    path: '/intakes',
    config: {
        handler: addIntake, // POST single
        // payload: 'parse',
        schema: {
            name: Types.String().required().min(3)
        },
        response: {
            // id: Types.Number().required()
        }
    }
}];

//
// *  in memory db, replace with nedb.js
//

var intakes = [{
    id: 1,
    name: 'super'
}, {
    id: 2,
    name: 'awesome'
}];
