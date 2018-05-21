var app = angular.module("app");

app.service("LoginService", function($http, configValue, $rootScope){
	var _doLogin = function(login){
		return $http.post(configValue.baseUrl + '/login', login);
	};
	return {
		doLogin : _doLogin
	}
});