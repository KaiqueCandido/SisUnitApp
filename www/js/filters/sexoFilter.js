var app = angular.module('app');
app.filter('sexoFilter', function(){
	return function(sexo){
		if(typeof sexo != 'undefined'){
			if(sexo === 'MASCULINO'){
				return 'Masculino';
			} else if (sexo === 'FEMININO'){
				return 'Feminino';
			} else {
				return 'Outro';
			}	
		}
	};
});