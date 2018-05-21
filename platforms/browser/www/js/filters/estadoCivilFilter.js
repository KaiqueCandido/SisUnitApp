var app = angular.module('app');
app.filter('estadoCivilFilter', function(){
	return function(estadoCivil){
		if(typeof estadoCivil != 'undefined'){
			if(estadoCivil === 'CASADO'){
				return 'Casado';
			} else if (estadoCivil === 'SOLTEIRO'){
				return 'Soteiro';
			} else if (estadoCivil === 'VIUVO'){
				return 'Viúvo';
			} else{
				return 'Divorciado';
			} 	
		}
	};
});