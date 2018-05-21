var app = angular.module('app')

app.controller('headerDesenvolvedorController', function($scope, $state){		

	$scope.inicio = function () {  			
		$state.go('homeDesenvolvedor');
	}; 

	$scope.gerenciarGestores = function () {  			
		$state.go('desenvolvedorGerenciarGestores');
	}; 

	$scope.gerenciarTrocarSenha = function () {  			
		$state.go('desenvolvedorGerenciarTrocaSenha');
	}; 

	$scope.logout = function () {  			
		$state.go('loginDesenvolvedor');
	}; 
	

	iniciarJquery();

});