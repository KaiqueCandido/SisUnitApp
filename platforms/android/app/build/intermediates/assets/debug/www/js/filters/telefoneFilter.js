var app = angular.module('app');
app.filter('telefoneFilter', function(){
	return function(telefone){
		if(typeof telefone != 'undefined'){
			if(telefone.length > 0){
				telefone = '(' + telefone.substring(0,1) + telefone.substring(1);
			}
			if(telefone.length > 2){
				telefone = telefone.substring(0,3) + ')' + telefone.substring(3);
			}
			if(telefone.length > 7){
				telefone = telefone.substring(0,8) + '-' + telefone.substring(8);
			}
			if(telefone.length > 13){
				telefone = telefone.replace('-','');
				telefone = telefone.substring(0,9) + '-' + telefone.substring(9,13);
			}
			return telefone;
		}
	};
});