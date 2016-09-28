var angular = require('angular');
require('angular-route');
var app = angular.module('chatsApp', ['ngRoute'])
    .run(['$rootScope', '$http', '$location','socketService', function($rootScope, $http, $location,socketService) {
        $http({
            url: '/api/validate',
            method: 'GET'
        }).success(function(user) {
            $rootScope.me = user;
            $location.path('/')
        }).error(function(data) {
            $location.path('/login')
        });
        $rootScope.logout = function(){
            socketService.emit('removeUser');
            logout();
        };
        $rootScope.$on('logout', function(evt) {
            logout();
        });
        $rootScope.$on('login', function(evt, user) {
            $rootScope.me = user;
        });

        function logout() {
            $http.get('/api/logout').success(function() {
                $rootScope.me = null;
                $location.path('/login');
            });
        }
    }])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/view/room.html',
                controller: 'RoomCtrl',
            })
            .when('/login', {
                templateUrl: '/view/login.html',
                controller: 'LoginCtrl',
            })
            .otherwise({
                redirectTo: '/login'
            });
    }]);
module.exports = app;
