var mongoose = require('mongoose');
var config = require('./config');
var connectStr = 'mongodb://' + config.host + ':' + config.port + '/' + config.db;
mongoose.connect(connectStr, {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
});
var userModel = require('./User');
exports.User = mongoose.model('User', userModel);
