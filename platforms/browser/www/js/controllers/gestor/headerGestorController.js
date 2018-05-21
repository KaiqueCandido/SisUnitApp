var app = angular.module('app')
app.controller('headerGestorController', function($scope, $state){	

	$scope.homeGestor = function () {  			
		$state.go('homeGestor');
	}; 

	$scope.gerenciarVeiculos = function () {			
		$state.go('gestorGerenciarVeiculos');					
	};
	
	$scope.gerenciarMotoristas = function () {			
		$state.go('gestorGerenciarMotoristas');					
	};

	$scope.gerenciarPassageiros = function () {			
		$state.go('gestorGerenciarPassageiros');					
	};

	$scope.gerenciarPontosDeParada = function () {			
		$state.go('gestorGerenciarPontosDeParada');					
	};

	$scope.gerenciarRotas = function () {			
		$state.go('gestorGerenciarRotas');					
	};

	$scope.sair = function () {			
		$state.go('login');					
	};

	iniciarJquery();

})