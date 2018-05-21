var app = angular.module('app');
app.filter("placaFilter", function () {
	return function (placa) {
		if(typeof placa != 'undefined'){       
			return placa.substring(0,3) + '-' + placa.substring(3);					
		}
	};
});