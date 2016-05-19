angular.module('finder.profile', [])

.controller('ProfileController', function($scope, $window, $state, Profiledata) {
    $scope.getProfile = function() {
        Profiledata.get()
        .then(function(data) {
            console.log('user back', data.data.locations)
            $scope.user = data.data
        });
    }

    $scope.logout = function() {
        $window.localStorage.removeItem('token');
        $state.go('trucks');
    }

    $scope.getProfile();
});