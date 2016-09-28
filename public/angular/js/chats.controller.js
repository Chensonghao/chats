var app = require('./chats.main');
app.controller('RoomCtrl', RoomCtrl)
    .controller('MessageCreatorCtrl', MessageCreatorCtrl)
    .controller('LoginCtrl', LoginCtrl);

RoomCtrl.$inject = ['$scope', 'socketService', 'chatsRecords', '$location'];

function RoomCtrl($scope, socketService, chatsRecords, $location) {
    if (!$scope.me) {
        return $location.path('/login');
    }
    //读取本地聊天记录
    $scope.messages = chatsRecords.get($scope.me.email);
    socketService.emit('addUser', $scope.me.name);
    socketService.on('userJoin', function(data) {
        $scope.messages.push({
            message: data.username + '加入了聊天,当前在线人数' + data.numUsers,
            type: 'system'
        });
    });

    socketService.on('userLeave', function(data) {
        $scope.messages.push({
            message: data.username + '退出了聊天,当前在线人数' + data.numUsers,
            type: 'system'
        });
    });
    socketService.on('messageAdded', function(message) {
        $scope.messages.push(message);
        chatsRecords.set($scope.me.email,message);
    });
}

MessageCreatorCtrl.$inject = ['$scope', 'socketService'];

function MessageCreatorCtrl($scope, socketService) {
    $scope.newMessage = '';
    $scope.createMessage = function() {
        if ($scope.newMessage === '') {
            return;
        }
        socketService.emit('createMessage', {
            message: $scope.newMessage,
            creator: $scope.me,
            type: 'message'
        });
        $scope.newMessage = '';
    };
}

LoginCtrl.$inject = ['$scope', '$http', '$location'];

function LoginCtrl($scope, $http, $location) {
    $scope.$emit('logout');
    $scope.login = function() {
        $http.post('/api/login', {
            email: $scope.email
        }).success(function(user) {
            $scope.$emit('login', user);
            $location.path('/');
        }).error(function() {

        });
    }
}
