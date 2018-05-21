var app = angular.module('app')
app.controller('homeMotoristaController', function($scope, $rootScope, $state){			

	$rootScope.menuAtual = 'Inicio';

	iniciarJquery();	

})
