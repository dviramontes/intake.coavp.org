var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // ObjectId = Schema.ObjectId;
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({});
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
