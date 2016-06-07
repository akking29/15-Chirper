(function() {
	'use strict';

	angular
	  .module('app')
	  .factory('postsService', postsService);

	postsService.$inject = ['$http', '$q', '$log', 'apiUrl'];

	function postsService($http, $q, $log, apiUrl) {

		var service = {

			getChirps: getChirps,
			postChirps: postChirps,
			deleteChirps: deleteChirps,
			editChirps: editChirps

		};

		return service;
		//content

		function getChirps(){
			var defer = $q.defer();
			$http({
				method:'GET',
				url: apiUrl + '/posts'
			})
			.then(
                   function(response) {
                       if (typeof response.data === 'object') {
                           defer.resolve(response);
                           toastr.success('We have stuff to do!');
                       } else {
                           defer.reject(response);
                           toastr.warning('no top spots found <br/>' + response.config.url);
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
	}

})();