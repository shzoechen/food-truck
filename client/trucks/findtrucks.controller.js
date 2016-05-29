angular.module('finder.trucks', ['uiGmapgoogle-maps'])

.controller('FindtrucksController', function ($scope, $location, Truckdata, $state) {
  var longitude;
  var latitude;
  $scope.isLoggedIn = localStorage.getItem('token') ? true : false;

  $scope.logout = function() {
    localStorage.removeItem('token');
    $state.reload();
  }


$scope.hiddenDiv = false;


  function showMap(dataArray) {
    for(var i = 0;i<dataArray.length;i++){
      var temp = {};
      temp.id = dataArray[i]._id;
      temp.latitude = dataArray[i].currentLatitude;
      temp.longitude = dataArray[i].currentLongitude;
      temp.title = dataArray[i].name;
      $scope.Markers.push(temp);
    }

  }

  $scope.map = {
    center: {
      latitude: 34.052235,
      longitude: -118.243683
    },
    zoom: 7
  };

  $scope.options = {
    scrollwheel: true
  };

  $scope.Markers = [];

  $scope.circles = [
    {
      id: 1,
      center: {
        latitude: 34.052235,
        longitude: -118.243683
      },
      radius: 3000,
      stroke: {
        color: '#08B21F',
        weight: 0.9,
        opacity: 0.9
      },
      fill: {
        color: '#6fcff0',
        opacity: 0.3
      },
      geodesic: true, // defaults--- false
      clickable: false, // defaults -- true
      visible: false, // defaults -true
      control: {}
    }
  ];

  $scope.getTrucks = function() {
	  getLocation(Truckdata.getTrucks);
  };

  function getLocation(cb) {
    navigator.geolocation.getCurrentPosition(function(position){
    	latitude = position.coords.latitude;
    	longitude = position.coords.longitude;
      localStorage.setItem('coordinates', [longitude, latitude]);
      console.log('get coordinates', latitude, longitude);
      cb(longitude, latitude)
      .then(function(resp){
          $scope.trucks = resp;
          console.log('trucks', $scope.trucks)
          $scope.map.center.longitude = longitude;
          $scope.map.center.latitude = latitude;
          $scope.map.zoom = 12;
          $scope.circles[0].center.latitude = latitude;
          $scope.circles[0].center.longitude = longitude;
          $scope.circles[0].visible = true;
          showMap(resp);
			});
    });
	};
	// function showHours(array){
	// 	$scope.hours = '';
	// 	$scope.address = '';
	// 	$scope.day = '';
	// 	for(var i =0; i<array.length; i++){
	// 		for(var key in array[i]){
	// 			if(key==="address"){
	// 				$scope.address = array[i][key]
	// 			}
	// 			if( key === "hours"){
	// 				for(var key2 in array[i][key]){
	// 					if(key2 = "1"){
	// 						$scope.day = "Monday";
	// 						if(array[i][key][key2]){
	// 							$scope.hours = array[i][key][key2][0]+"am"+ " to " +(array[i][key][key2][1]-12) +"pm"
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	};
	// };

  // $scope.searchTruck = function() {
  //   console.log('in searchTruck')
  //   Truckdata.getTruck($scope.truckName)
  //   .then(function(truck) {
  //     $scope.trucks = [];
  //     $scope.trucks.push(truck);
  //   });
  // }

	$scope.getLocation = getLocation;
	// $scope.showHours = showHours;

  $scope.getTrucks();
});