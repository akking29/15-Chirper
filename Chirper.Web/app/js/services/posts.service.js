(function() {
	'use strict';

	angular
	  .module('app')
	  .factory('postsService', postsService);

	postsService.$inject = ['$http', '$q', '$log','toastr','$location','localStorageService', 'apiUrl'];

	function postsService($http, $q, $log, toastr, $location, localStorageService, apiUrl) {

		var service = {

			getChirps: getChirps,
			postChirp: postChirp
			
		};

		return service;
		//content

		function getChirps(){
			var defer = $q.defer();
			$http({
				method:'GET',
				url: apiUrl + 'posts'
			})
			.then(
                   function(response) {
                       if (typeof response.data === 'object') {
                           defer.resolve(response);
                           toastr.success('Chirps!');
                       } else {
                           defer.reject(response);
                           toastr.warning('no chirps :( <br/>' + response.config.url);
                       }
                   },
                   //failure
                   function(error) {
                       defer.reject(error);
                       $log.error(error);
                       toastr.error('error: '+ error.data + '<br/>status: ' + error.statusText);
                   });
           
           return defer.promise;

       
		}

		function postChirp(chirp){
			var defer = $q.defer();
			$http({
				method:'POST',
				url: apiUrl + 'posts',
				data: chirp
			})
			.then(
				function(response){
					if(typeof response.data === 'object'){
						defer.resolve(response);
					} else {
						defer.reject(response);
						toastr.warning('no chirp');
					}
					console.log(chirp);
				},
				function(error){
					defer.reject(error);
					$log.error(error);
					toastr.error('error: ' + error.data.exceptionMessage + '</br>status: ' + error.statusText);
				});
			return defer.promise;
				
		};
	}

})();