app = angular.module('app');
app.service('cepService', function($http, $state, $rootScope, configValue) {					
	
	this.buscarEstadoECidade = function(cep) {
		$rootScope.pageLoading = true;
		return $http.get(configValue.cepUrl + cep + '/json');
	};

});