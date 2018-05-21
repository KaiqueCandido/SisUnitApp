app = angular.module('app');
app.service('gestorService', function($http, $state, $rootScope, configValue) {	

	this.salvar = function(gestor) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/gestor', gestor);
	};

	this.excluir = function(gestor) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/gestor/remove', gestor);
	};

	this.ativar = function(gestor) {
		$rootScope.pageLoading = true;
		gestor.statusDoCadastro = 'ATIVO';		
		return $http.put(configValue.baseUrl + '/gestor', gestor);
	};
	
	this.atualizar = function(gestor) {
		$rootScope.pageLoading = true;
		return $http.put(configValue.baseUrl + '/gestor', gestor);
	};

	this.pesquisar = function(gestor) {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/gestor', gestor);
	};
	
	this.listar = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/gestor');
	};

});