var app = angular.module('app');
app.filter('tipoDeZonaFilter', function(){
	return function(tipoDeZona){
		if(typeof tipoDeZona != 'undefined'){
			if(tipoDeZona === 'URBANA'){
				return 'Urbana';
			} else {
				return 'Rural';
			}	
		}
	};
});