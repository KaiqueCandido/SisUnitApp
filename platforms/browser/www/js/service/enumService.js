app = angular.module('app');
app.service('enumService', function($http, $rootScope, configValue) {					
	
	this.diasDaSemana = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/enum/diasdasemana');
	};
	
	this.sexos = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/enum/sexos');
	};

	this.statusDosCadastros = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/enum/statusdocadastro');
	};

	this.tiposDeZona = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/enum/tipodezona');
	};

	this.turnos = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/enum/turno');
	};

});