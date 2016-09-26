var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var registerApi = require('./api/api');
var app = express();
var mongoStore = require('connect-mongo')(session);
var config = require('./models/config');
var sessionStore = new mongoStore({
    url: 'mongodb://' + config.host + ':' + config.port + '/' + config.db
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret: config.cookieSecret,
    resave: true, //每次请求重置过期时间
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000 //1小时过期
    }
    //store: sessionStore
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/components', express.static(path.join(__dirname, 'components')));

registerApi(app);
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log('chats is listening on port ' + port + '!');
});

var io = require('socket.io').listen(server);
//var signCookie = cookieParser(config.cookieSecret);
// io.set('authorization', function(handshakeData, accept) {
//     signCookie(handshakeData, {}, function(err) {
//         if (err) {
//             accept(err, false);
//         } else {
//             sessionStore.get(handshakeData.signedCookies['connect.sid'], function(err, session) {
//                 if (err) {
//                     accept(err.message, false);
//                 } else {
//                     handshakeData.session = session;
//                     if (session&&session.userId) {
//                         console.log('logined');
//                         accept(null, true);
//                     } else {
//                         console.log('no logined');
//                         accept('No login!');
//                     }
//                 }
//             });
//         }
//     });
// });
var messages = [];
var numUsers = 0;
io.sockets.on('connection', function(socket) {
    socket.on('addUser', function(username) {
        socket.username = username;
        ++numUsers;
        //发送除自己以外的客户端
        socket.broadcast.emit('userJoin', {
            username: username,
            numUsers: numUsers
        });
    });
    socket.on('createMessage', function(message) {
        //messages.push(message);
        //发送所有客户端
        io.sockets.emit('messageAdded', message);
    });
    socket.on('removeUser',userLeave);
    socket.on('disconnect',userLeave);
    function userLeave(){
        if(!socket.username){
            return;
        }
        numUsers && --numUsers;
        socket.broadcast.emit('userLeave',{
            username:socket.username,
            numUsers:numUsers
        });
    }
});

module.exports = app;
