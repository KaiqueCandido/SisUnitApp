var app = angular.module('app');
app.filter('cepFilter', function(){
	return function(cep){
		if(typeof cep != 'undefined'){
			if(cep.length > 5){
				cep = cep.substring(0,5) + '-' + cep.substring(5, 8);
			}	
			return cep;
		}
	};
});