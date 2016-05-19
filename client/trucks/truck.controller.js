angular.module('finder.truck', [])

.controller('TruckController', function ($scope, $stateParams, $state) {
	console.log('.params', $state.params)
	console.log('in TruckController', $stateParams.username)
});