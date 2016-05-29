'use strict';

angular.module('finder.profile', ['finder.starRating'])

.controller('ProfileController', function($scope, $window, $state, Profiledata) {
    $scope.isLoggedIn = localStorage.getItem('token') ? true : false;

    $scope.logout = function() {
    localStorage.removeItem('token');
    $state.go('trucks');
    }

    $scope.getProfile = function() {
        Profiledata.get()
        .then(function(data) {
            console.log('data in profile controller line 14', data.data)
            $scope.truck = data.data
        });
    }

    $scope.logout = function() {
        $window.localStorage.removeItem('token');
        $state.go('trucks');
    }
    
    //rating system
    $scope.rating = 5;

    $scope.getProfile();
});