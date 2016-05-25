angular.module('finder.editProfile', [])

.controller('EditProfileController', function($scope, $window, $state, Profiledata) {
	// AWS configuration
	AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});
  AWS.config.region = 'us-east-1';
  var bucket = new AWS.S3({params: {Bucket: 'greenfieldproject'}});

	$scope.isLoggedIn = localStorage.getItem('token') ? true : false;

	$scope.submitProfile = function(){
		var data = {};
				data.name = $scope.name;
				data.cuisine = $scope.cuisine;
				data.locations = $scope.locations;

	  var file = $scope.myFile;
	  var prefix = Date.now();
	  if(file) {
	    var params = {Key: prefix+file.name, ContentType: file.type, Body: file};
	      bucket.upload(params, function(err, path) {
	        if(err)  console.log(err)
	        data.image = path.Location;
	      	Profiledata.submitProfile(data)
	      			.then(function() {
	      				$state.go('profile');
	      			});
	      });
	  } else {
	    		data.image = 'https://s3.amazonaws.com/perlproject/default.jpg';
	    		Profiledata.submitProfile(data)
	    				.then(function() {
	    					$state.go('profile');
	    				});
	  }
	};

  $scope.logout = function() {
    localStorage.removeItem('token');
    $state.go('trucks');
  }

	$scope.cuisineTypes = ['Chinese', 'American'];
	$scope.timeList = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', ''];
	$scope.addLocation = false;
	$scope.locations = [];

	$scope.editLocation = function(){
		$scope.addLocation = false;
		loc = {
			address: $scope.location.address,
			hours: {
				"1": [$scope.hours.start1, $scope.hours.end1],
				"2": [$scope.hours.start2, $scope.hours.end2],
				"3": [$scope.hours.start3, $scope.hours.end3],
				"4": [$scope.hours.start4, $scope.hours.end4],
				"5": [$scope.hours.start5, $scope.hours.end5],
				"6": [$scope.hours.start6, $scope.hours.end6],
				"0": [$scope.hours.start0, $scope.hours.end0],

			}
		};
		console.log('loc', loc)
		$scope.locations.push(loc);
		$scope.location = {};
		$scope.hours = {};
	}

	// $scope.submitProfile = function(){
	// 	var data = {};
	// 	data.name = $scope.name;
	// 	data.cuisine = $scope.cuisine;
	// 	data.locations = $scope.locations;
	// 	Profiledata.submitProfile(data)
	// 	.then(function() {
	// 		$state.go('profile');
	// 	});
	// }
})

.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);