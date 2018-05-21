app = angular.module('app');
app.service('veiculoService', function($http, $rootScope, configValue) {	

	this.salvar = function(veiculo) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/veiculo', veiculo);
	};

	this.excluir = function(veiculo) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/veiculo/remove', veiculo);
	};
	
	this.ativar = function(veiculo) {
		$rootScope.pageLoading = true;
		veiculo.statusDoCadastro = 'ATIVO';		
		return $http.put(configValue.baseUrl + '/veiculo', veiculo);
	};
	
	this.atualizar = function(veiculo) {
		$rootScope.pageLoading = true;
		return $http.put(configValue.baseUrl + '/veiculo', veiculo);
	};

	this.pesquisarPorId = function(idVeiculo) {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/veiculo/' + idVeiculo);
	};
	
	this.listar = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/veiculo');
	};

});