app = angular.module('app');
app.service('cidadeService', function($http, $rootScope, configValue) {					

	this.pesquisarPorCodIbge = function(ibge) {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/cidade/codibge/' + ibge);
	};
	
	this.listar = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/cidade');
	};

	this.listarPorEstado = function(uf) {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/cidade/' + uf);
	};

});