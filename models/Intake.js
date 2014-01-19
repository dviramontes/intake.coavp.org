var mongoose = require('mongoose');

// mongoose shortcuts
var Schema = mongoose.Schema,
     ObjectId = Schema.ObjectId;

var Intake = new Schema({
    id: ObjectId,
    taker: String,
    date: {
        type: Date,
        // default: Date.now()
    }
});

// next compile the Schema object into a Model
// (registering a Model with Mongoose)
// all interaction with the Collection is mitigated
// thought this Model , ie. querying :
//
// the Scheme is a simple abstraction that describes
// how the Model looks like and how it behaves
exports.Intake = mongoose.model("Intake", Intake);

