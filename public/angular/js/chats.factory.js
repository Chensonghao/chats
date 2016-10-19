var app = require('./chats.main');
var storage = require('../../common/utils/localStorage');
app.factory('chatsRecords', chatsRecords)
    .factory('socketService', socketService);

socketService.$inject = ['$rootScope'];

function socketService($rootScope) {
    var socket = io.connect('/');
    return {
        on: function(eventName, callback) {
            socket.removeListener(eventName);
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback && callback.apply(socket, args);
                });
            });
        }
    }
}

function chatsRecords() {
    return storage;
}
