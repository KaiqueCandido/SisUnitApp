app = angular.module('app');
app.service('motoristaService', function($http, $rootScope, configValue) {	

	this.salvar = function(motorista) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/motorista', motorista);
	};

	this.excluir = function(motorista) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/motorista/remove', motorista);
	};	
	
	this.atualizar = function(motorista) {
		$rootScope.pageLoading = true;
		return $http.put(configValue.baseUrl + '/motorista', motorista);
	};

	this.pesquisarPorId = function(idmotorista) {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/motorista/' + idmotorista);
	};
	
	this.listar = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/motorista');
	};

	this.inativar = function(motorista) {
		$rootScope.pageLoading = true;
		motorista.conta.statusDoCadastro = 'INATIVO';
		return $http.put(configValue.baseUrl + '/motorista', motorista);
	};
	
	this.ativar = function(motorista) {
		$rootScope.pageLoading = true;
		motorista.conta.statusDoCadastro = 'ATIVO';		
		return $http.put(configValue.baseUrl + '/motorista', motorista);
	};

	this.enviarLocalizacaoAtual = function(localizacao) {
		var locationJson = localizacao;
		return $http.post(configValue.baseUrl + '/motorista/localizacaoAtual', locationJson);
	};
		
	this.enviarLocalizacaoA2 = function(latitude, longitude) {		
		return $http.get(configValue.baseUrl + '/motorista/localizacaoAtual/' + latitude + '/' + longitude);
	};
});