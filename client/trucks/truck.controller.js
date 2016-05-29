'use strict';

angular.module('finder.truck', ['finder.starRating'])

.controller('TruckController', function ($scope, $stateParams, Truckdata) {
	// get truck info
	var coordinates = localStorage.getItem('coordinates').split(',');

	Truckdata.getTruck($stateParams.id, Number(coordinates[0]), Number(coordinates[1]))
	.then(function(data) {
		$scope.truck = data.data;
		console.log($scope.truck)
	})

	//rating system
	$scope.rating = 5;
});