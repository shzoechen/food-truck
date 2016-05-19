angular.module('finder.editProfile', [])

.controller('EditProfileController', function($scope, $window, $state, Profiledata) {
	$scope.cuisineTypes = ['Chinese', 'American'];
	$scope.timeList = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', ''];
	$scope.addLocation = false;
	$scope.locations = [];

	$scope.editLocation = function(){
		$scope.addLocation = false;
		loc = {
			address: $scope.location.address,
			hours: {
				"1": [$scope.start1, $scope.end1],
				"2": [$scope.start2, $scope.end2],
				"3": [$scope.start3, $scope.end3],
				"4": [$scope.start4, $scope.end4],
				"5": [$scope.start5, $scope.end5],
				"6": [$scope.start6, $scope.end6],
				"0": [$scope.start0, $scope.end0],

			}
		};
		$scope.locations.push(loc);
	}

	$scope.submitProfile = function(){
		var data = {};
		data.name = $scope.name;
		data.cuisine = $scope.cuisine;
		data.locations = $scope.locations;
		Profiledata.submitProfile(data)
		.then(function() {
			$state.go('profile');
		});
	}
});