/*====================================

	TODO:
	[ ] -  refactor that requires a radio input selection
	[ ] -  refactor Caller
	[ ] -  refactor Taker /  User
	[ ] - replace date with objectId TimeStamp ISO created time

====================================*/

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;


var IntakeSchema = new Schema({

	// 1A, unique random incremented {basedOn : process id, time }
	id: ObjectId,
	// 1B
	taker:String,
	contributorType: String,
	// 2A
	// replace with objectId TimeStamp ISO created time
	date: { type: Date, default: Date.now},
	// 3
	caseNumber: { type : Number, index: true },
	hidden: { type: Boolean, default: false},
	// 2B
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
		// email: {type: String, unique:false},
		email: String,

	},
	// 6
	callerPresentsAs: String, // radio input
	// 7
	callerAssessedAs: String, // radio input
	// 8
	referedBy: String // radio input
});

// IntakeSchema({meta: })

// next compile the Schema object into a Model
// (registering a Model with Mongoose)
// all interaction with the Collection is mitigated
// thought this Model , ie. querying.

// This Scheme object is a simple abstraction that describes
// how the Model looks like and how it behaves

var Intake = mongoose.model('Intake', IntakeSchema);

// Taker = mongoose.model( 'Taker', TakerSchema);

exports.Intake = Intake;
