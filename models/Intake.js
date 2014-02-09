/*====================================

	TODO:
	[ ] -  refactor that requires a radio input selection
	[ ] -  refactor Caller
	[ ] -  refactor Taker /  User

====================================*/

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;


var IntakeSchema = new Schema({
	meta: {
		// 1A
		id: ObjectId,
		// 1B
		taker: {
			name: {
				first: String,
				last: String
			},
			contributorType: String
		},
		// 2A
		date: {
			type: Date,
			default: Date.now
		},
		// 3
		caseNumber: Number,
		hidden: {
			type: Boolean,
			default: false
		}
	},
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

// next compile the Schema object into a Model
// (registering a Model with Mongoose)
// all interaction with the Collection is mitigated
// thought this Model , ie. querying.

// This Scheme object is a simple abstraction that describes
// how the Model looks like and how it behaves

var Intake = mongoose.model('Intake', IntakeSchema);

// Taker = mongoose.model( 'Taker', TakerSchema);

exports.Intake = Intake;
