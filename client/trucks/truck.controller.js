'use strict';

angular.module('finder.truck', ['finder.starRating'])

.controller('TruckController', function ($scope, $stateParams, Truckdata, $state) {
	// get truck info
	var coordinates = localStorage.getItem('coordinates').split(',');

	Truckdata.getTruck($stateParams.id, Number(coordinates[0]), Number(coordinates[1]))
	.then(function(data) {
		$scope.truck = data.data;
		console.log($scope.truck)
	})

	$scope.searchTruck = function() {
	  if($scope.search !== "") {
	    Truckdata.searchTruck($scope.search)
	    .then(function(truck) {
	      $state.go("truck", { id: truck.data.id });
	    });
	  }
	}
	

	//rating system
	$scope.rating = 5;
});