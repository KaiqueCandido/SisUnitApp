var app = angular.module('app')

app.controller('loginDesenvolvedorController', function($scope, $state, $http, loginService){	
	
	$scope.autenticacao = function () {  	
    $state.go('homeDesenvolvedor');   
  };  	 

  $scope.goLogin = function () {    
    $state.go('login');
  };

  iniciarJquery();

});