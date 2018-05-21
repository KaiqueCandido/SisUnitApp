app = angular.module('app');
app.service('pontoDeParadaService', function($http, $state, $rootScope, configValue) {					
	
	this.salvar = function(pontoDeParada) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/pontodeparada', pontoDeParada);
	};

	this.excluir = function(pontodeparada) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/pontodeparada/remove/' +  pontodeparada.id);
	};

	this.atualizar = function(pontoDeParada) {
		$rootScope.pageLoading = true;
		return $http.put(configValue.baseUrl + '/pontodeparada', pontoDeParada);
	};

	this.pesquisarPorId = function(idPontoDeParada) {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/pontodeparada/' + idPontoDeParada);
	};

	this.listar = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/pontodeparada');
	};

	this.inativar = function(pontodeparada) {
		$rootScope.pageLoading = true;
		pontodeparada.statusDoCadastro = 'INATIVO';
		return $http.put(configValue.baseUrl + '/pontodeparada', pontodeparada);
	};
	
	this.ativar = function(pontodeparada) {
		$rootScope.pageLoading = true;
		pontodeparada.statusDoCadastro = 'ATIVO';		
		return $http.put(configValue.baseUrl + '/pontodeparada', pontodeparada);
	};
});