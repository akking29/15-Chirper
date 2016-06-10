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
			
		vm.addChirp = postsService.postChirp().then(
		function(response){
			toastr.success('"' + response.data.text + '" chirped!')

		})	
	}
})();