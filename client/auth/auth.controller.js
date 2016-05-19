angular.module('finder.auth', ['ngMaterial'])

.controller('AuthController', function ($scope, $window, $location, Auth) {

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        console.log("token in signin", token.data.token);
        $window.localStorage.setItem('token', token.data.token);
        $location.path('/profile');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        console.log("token in signup", token.data)
        $window.localStorage.setItem('token', token.data.token);
        $location.path('/profile');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});