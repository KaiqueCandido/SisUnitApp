app = angular.module('app');
app.service('passageiroService', function($http, $rootScope, configValue) {	

	this.salvar = function(passageiro) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/passageiro', passageiro);
	};

	this.excluir = function(passageiro) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/passageiro/remove', passageiro);
	};	
	
	this.atualizar = function(passageiro) {
		$rootScope.pageLoading = true;
		return $http.put(configValue.baseUrl + '/passageiro', passageiro);
	};

	this.pesquisarPorId = function(idpassageiro) {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/passageiro/' + idpassageiro);
	};
	
	this.listar = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/passageiro');
	};

	this.inativar = function(passageiro) {
		$rootScope.pageLoading = true;
		passageiro.conta.statusDoCadastro = 'INATIVO';
		return $http.put(configValue.baseUrl + '/passageiro', passageiro);
	};
	
	this.ativar = function(passageiro) {
		$rootScope.pageLoading = true;
		passageiro.conta.statusDoCadastro = 'ATIVO';		
		return $http.put(configValue.baseUrl + '/passageiro', passageiro);
	};

});