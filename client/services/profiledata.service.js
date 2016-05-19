angular.module('profile.service',[])

.factory('Profiledata', function($http) {

    var get = function () {
        return $http({
            method: 'GET',
            url: '/profile',
        });
    };

    var post = function (user) {
        return $http({
            method: 'POST',
            url: '/profile',
            data: user
        });
    };

    var submitProfile = function(data) {
        console.log('data in service',data)
        return $http.post('/editProfile', data);
    }


    return {
        get: get,
        post: post,
        submitProfile: submitProfile
    };
});