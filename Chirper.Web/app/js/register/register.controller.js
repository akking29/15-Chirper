(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['authService', '$state', 'toastr'];

    function RegisterController(authService, $state, toastr) {
        var vm = this;
        //content

        vm.register = function() {
            authService.register(vm.registration)
                .then(
                    function(response) {
                        toastr.success('Registration successful');

                        $state.go('login');
                    },
                    function(error){
                    	toastr.error(error);
                    }
                );
        }
    }
})();
