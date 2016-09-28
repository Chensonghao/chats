var app = require('./chats.main');
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
    var key = 'chatsRecords';
    return {
        get: function(name) {
            try {
                var data = window.localStorage.getItem(key);
                if (data) {
                    var records = JSON.parse(data);
                    return records[name];
                }
                return [];
            } catch (e) {
                console.log('not support localStorage!');
                return [];
            }
        },
        set: function(name,msg) {
            try {
                var data = window.localStorage.getItem(key);
                var obj = data ? JSON.parse(data) : {};
                var records = obj[name] || [];
                records.push(msg);
                obj[name] = records;
                window.localStorage.setItem(key,JSON.stringify(obj));
            } catch (e) {
                console.log('not support localStorage!');
            }
        }
    }
}
