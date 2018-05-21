app = angular.module('app');
app.service('estadoService', function($http, $state, $rootScope, configValue) {					
	
	this.listar = function() {
		$rootScope.pageLoading = true;
		return $http.get(configValue.baseUrl + '/estado');
	};

});