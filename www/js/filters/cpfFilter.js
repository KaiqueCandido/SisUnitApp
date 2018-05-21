var app = angular.module('app');
app.filter('cpfFilter', function(){
	return function(cpf){
		if(typeof cpf != 'undefined'){
			if(cpf.length > 2){
				cpf = cpf.substring(0,3) + '.' + cpf.substring(3);
			}
			if(cpf.length > 6){
				cpf = cpf.substring(0,7) + '.' + cpf.substring(7);
			}
			if(cpf.length > 10){
				cpf = cpf.substring(0,11) + '-' + cpf.substring(11,13);
			}

			return cpf;
		}
	};
});