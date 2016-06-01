'use strict';

angular.module('truck.service',[])

.factory('Truckdata', function($http, $location, $window) {
	
	var getTrucks = function(longitude, latitude) {
    console.log('long', longitude, latitude)
    return $http({
      method: 'POST',
      url: '/findTrucks',
      data: { longitude: longitude, latitude: latitude } 
		})
		.then(function(resp){
       return resp.data;
    })
  }

  var getTruck = function(id, longitude, latitude) {
    return $http.post('/findTruck', {id: id, longitude: longitude, latitude: latitude});
  }

  var searchTruck = function(truck) {
    return $http.get('/search', { headers: {name: truck} });
  }
 
  return {
    getTrucks: getTrucks,
    getTruck: getTruck,
    searchTruck: searchTruck
  }

})