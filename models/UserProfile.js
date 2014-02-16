var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// ObjectId = Schema.ObjectId;

var UserProfileSchema =  new Schema({
    local: {
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
    twitter: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
});

var UserProfile = mongoose.model('UserProfile', UserProfileSchema);
exports.UserProfile = UserProfile;
