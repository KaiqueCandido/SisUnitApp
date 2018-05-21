var app = angular.module('app')
app.controller('headerMotoristaController', function($scope, $state){	

	$scope.homeMotorista = function () {  			
		$state.go('homeMotorista');
	}; 

	$scope.gerenciarRotas = function () {			
		$state.go('motoristaGerenciarRotas');					
	};

	$scope.sair = function () {			
		$state.go('login');					
	};

	iniciarJquery();

})