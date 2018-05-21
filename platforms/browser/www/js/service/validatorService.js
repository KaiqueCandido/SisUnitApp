app = angular.module('app');
app.service('validatorService', function($http, $state, $rootScope, configValue) {					
	
	this.validateRg = function(objectValidateVo) {
		$rootScope.pageLoading = true;	
		return $http.post(configValue.baseUrl + '/validator' + '/rg', objectValidateVo);
	};

	this.validateCpf = function(objectValidateVo, idPessoa) {
		$rootScope.pageLoading = true;
		// objectValidateVo = angular.fromJson({"value":objectValidateVo});
		return $http.post(configValue.baseUrl + '/validator' + '/cpf', objectValidateVo);
	};

	this.validateEmail = function(objectValidateVo, idPessoa) {
		$rootScope.pageLoading = true;
		// objectValidateVo = angular.fromJson({"value":objectValidateVo});
		return $http.post(configValue.baseUrl + '/validator' + '/email', objectValidateVo);
	};

	this.validateLogin = function(objectValidateVo, idPessoa) {
		$rootScope.pageLoading = true;
		// objectValidateVo = angular.fromJson({"value":objectValidateVo});
		return $http.post(configValue.baseUrl + '/validator' + '/login', objectValidateVo);
	};

});