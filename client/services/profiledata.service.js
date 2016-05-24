angular.module('profile.service',[])

.factory('Profiledata', function($http) {

    var get = function () {
        return $http.get('/profile');
    };

    var post = function (user) {
        return $http.post('/profile', user);
    };

    var submitProfile = function(data) {
        return $http.post('/editProfile', data);
    }


    return {
        get: get,
        post: post,
        submitProfile: submitProfile
    };
});