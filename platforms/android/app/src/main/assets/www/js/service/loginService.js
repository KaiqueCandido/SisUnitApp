app = angular.module('app');
app.service('loginService', function($http, $state, $rootScope, configValue) {

	this.login = function(login) {
		$rootScope.pageLoading = true;
		return $http.post(configValue.baseUrl + '/login', login);
	}

	this.logout = function() {
		$state.go('login');
	}

});