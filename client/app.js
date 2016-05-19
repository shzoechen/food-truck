angular.module('finder', [
  'finder.auth',
  'finder.map',
  'finder.profile',
  'finder.editProfile',
  'finder.trucks',
  'finder.truck',
  'auth.service',
  'profile.service',
  'truck.service',
  'ui.router',
  'ngMdIcons'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider) {

    $urlRouterProvider.otherwise('/trucks');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('signin', {
            url: '/signin',
            templateUrl: 'auth/signin.html',
            controller: 'AuthController'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'auth/signup.html',
            controller: 'AuthController'
        })

        .state('profile', {
            url: '/profile',
            templateUrl: 'profile/profile.html',
            controller: 'ProfileController',
            authenticate: true

        })

        .state('trucks', {
            url: '/trucks',
            templateUrl: 'trucks/findtrucks.html',
            controller: 'FindtrucksController'
        })

        .state('truck', {
            url: '/truck/:username',
            templateUrl: 'trucks/truck.html',
            controller: 'TruckController'
        })

        .state('editProfile', {
            url: '/editProfile',
            templateUrl: 'profile/editProfile.html',
            controller: 'EditProfileController',
            authenticate: true
        });


    $mdThemingProvider.theme('default')
      .primaryPalette('orange')
      .accentPalette('pink');
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', ['$window', function($window) {
    console.log("in AttachTokens")
    var attach = {
      request: function(object) {
        var jwt = $window.localStorage.getItem('token');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  }])
  .run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams, error) {
      if (toState && toState.authenticate && !Auth.isAuth()) {
        evt.preventDefault();
        $state.go('signin');
      }
    });
}]);