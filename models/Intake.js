/*====================================

	TODO:
	[   ] - refactor all that requires a radio input selection
	[--] - refactor caller
	[X] - refactor taker /  user
	[   ] - replace date with objectid timestamp iso created time
	[X] - setup get one by $index

====================================*/


var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;


var IntakeSchema = new Schema({

	// 1a, unique random incremented {basedon : process id, time }
	id: ObjectId,
	// 1b
	taker:String,
	contributorType: String,
	// 2a
	// replace with objectid timestamp iso created time
	date: { type: Date, default: Date.now},
	// 3, index
	caseNumber: { type : Number, index: {unique:true} },
	hidden: { type: Boolean, default: false},
	// 2b
	callbackNeeded: Boolean,
	// 4
	caseType: String, // radio input
	// 5
	caller: {
		name: {
			first: String,
			last: String
		},
		address : String,
		county : String,
		phone: {
			number : Number,
			// ok to call ?
			private : Boolean
		},
		// alternative phone number
		altPhone: {
			number : Number,
			// ok to call ?
			private : Boolean
		},
		// email: {type: string, unique:false},
		email: String,

	},
	// 6
	callerPresentsAs: String, // radio input
	// 7
	callerAssessedAs: String, // radio input
	// 8
	referedBy: String // radio input
});

// 1 means ascending order..
// inspect index with
// db.system.indexes.find();

// dont need to call ensureindex method since
// mongoose will call t for you...
// intakeschema.ensureindex{casenumber: 1});

// drop unsed indexes with
// db.intakes.dropindex("meta.casenumber_1");

// next compile the schema object into a model
// (registering a model with mongoose)
// all interaction with the collection is mitigated
// thought this model , ie. querying.

// this scheme object is a simple abstraction that describes
// how the model looks like and how it behaves

var Intake = mongoose.model('Intake', IntakeSchema);

exports.Intake = Intake;

// mongoshell queries for inspecting indexes
// db.intakes.find({"caseNumber":1}).explain();
// db.intakes.find({"caseNumber":1});
// db.intakes.find();
