var mongoose = require('mongoose');
        Schema = mongoose.Schema,
        ObjectId  = Schema.ObjectId;

var TakerSchema  = new Schema({
    name : String,
    catergory : String
})

var  IntakeSchema = new Schema({
    id: ObjectId,
    date : { type : Date, default: Date.now } , 
    taker:  [Taker]// use arrays or refs for nested Schemas
});

// next compile the Schema object into a Model
// (registering a Model with Mongoose)
// all interaction with the Collection is mitigated
// thought this Model , ie. querying :
// the Scheme is a simple abstraction that describes
// how the Model looks like and how it behaves
var Intake = mongoose.model("Intake", IntakeSchema);
var Taker = mongoose.model( "Taker", TakerSchema);

exports.Intake = Intake;

