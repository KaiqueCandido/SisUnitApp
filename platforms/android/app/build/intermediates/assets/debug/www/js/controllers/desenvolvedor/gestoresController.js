var app = angular.module('app')
app.controller('gestoresController', function($scope, $rootScope, $state, gestorService){
	$scope.selecionado = true;
	$scope.gestorSelecionado = {};	
	$scope.gestorSelecionadoInativo = true;	
	$scope.gestores = [{nome:'-', contato:{telefoneCelular:'-', email:'-'}, statusDoCadastro:'-'}];	
	$scope.gestor = {};
	$scope.statusDasEntidades = '-';	

	/*Listar gestores do banco*/
	$scope.listarGestores = function() {
		gestorService.listar().then(function sucess(response) {		
			if (response.data.length > 0){
				$scope.statusDasEntidades = 'ATIVO';
				$rootScope.pageLoading = false;
				$scope.gestores = response.data;
			} else {
				Materialize.toast('Não foi possivel encontrar registros!', 5000, 'rounded toasts-warning');
				$rootScope.pageLoading = false;
			}				
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os gestores. Por favor, tente novamente mais tarde!', 5000, 'rounded toasts-warning');
		});
	};

	$scope.selecionaGestor = function(gestor) {
		if(gestor.selecionado === 'grey') {
			gestor.selecionado = 'none';
			$scope.selecionado = true;
			$scope.gestorSelecionadoInativo = true;
		} else {
			if (gestor.statusDoCadastro === 'ATIVO') {
				$scope.limpaSelecoes();
				gestor.selecionado = 'grey';
				$scope.selecionado = false;			
				$scope.gestorSelecionado = gestor;
			} else {
				$scope.limpaSelecoes();
				gestor.selecionado = 'grey';
				$scope.gestorSelecionado = gestor;
				$scope.gestorSelecionadoInativo = false;
			}			
		}
	};	

	$scope.limpaSelecoes = function(){
		$scope.gestores.forEach(function(gestor){
			gestor.selecionado = 'none';
		});
	};	

	$scope.listarGestores();
	iniciarJquery();

});