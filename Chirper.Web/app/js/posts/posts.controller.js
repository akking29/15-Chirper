(function() {
	'use strict';

	angular
	  .module('app')
	  .controller('PostsController', PostsController);

	PostsController.$inject = ['$state', '$log', 'postsService'];

	function PostsController($state, $log, postsService) {
		var vm = this;
		//content
		postsService.getChirps().then(
			function(response){
				console.log(response.data);
			});
			
	}
})();