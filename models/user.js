var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    email:String,
    name:String,
    avatarUrl:String
});
module.exports = User;
