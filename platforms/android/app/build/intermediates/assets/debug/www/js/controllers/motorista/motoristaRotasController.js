var app = angular.module('app')
app.controller('motoristaRotasController', function($scope, $rootScope, $state, $interval, rotaService, configValue, motoristaService){

	$rootScope.menuAtual = 'Rotas';

	$rootScope.usuarioLogado = {};
	$rootScope.usuarioLogado.id = 1;	

	$scope.rotas = [];

	$scope.carregarRotas = function () {
		rotaService.listarPorMotorista($rootScope.usuarioLogado.id).then(function sucess(response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.rotas = response.data;	
			} else {
				Materialize.toast('Não foi encontrado registros de rotas', 5000, 'rounded toasts-warning');
			}
		}, function error(response) {
			$rootScope.pageLoading = false;
			console.log(response);
			Materialize.toast('Não foi possivel carregar as rotas', 5000, 'rounded toasts-error');
		});
	};		

	$scope.iniciarRota = function (rota) {
		var pontosDeParada = rota.pontosDeParada;

		var origin = pontosDeParada[0].latitude + "," + pontosDeParada[0].longitude;
		var destination = pontosDeParada[pontosDeParada.length -1].latitude + "," + pontosDeParada[pontosDeParada.length -1].longitude;
		var waypoints = '';

		for (var i = 1; i < (pontosDeParada.length -1); i++) {
			waypoints = waypoints + pontosDeParada[i].latitude + "," + pontosDeParada[i].longitude;
			if ((i + 1) < (pontosDeParada.length -1)) {
				waypoints = waypoints + "|";
			}
		}		

		var link = configValue.mapsUrlApi + "/?api=1&origin=" + origin + "&destination=" + destination + "&travelmode=driving&waypoints=" + waypoints;

		// document.addEventListener('deviceready', enviarLocalizacaoAtual(pontosDeParada), false);
		
		navigator.geolocation.getCurrentPosition(function (position) {
			$scope.montaMotoristaLocalizacao(position.coords.latitude, position.coords.longitude, pontosDeParada);
			console.log($scope.motoristaLocalizacaoVO);
			motoristaService.enviarLocalizacaoAtual($scope.motoristaLocalizacaoVO)
			.then(function sucess(response) {
				console.log(response);
			}, function error(response) {
				console.log(response);
				Materialize.toast(response.data, 5000, 'rounded toasts-error');
			});
		});
		//window.location = link;
	}

	function enviarLocalizacaoAtual (pontosDeParada) {
		cordova.plugins.backgroundMode.enable();
		cordova.plugins.backgroundMode.on('activate', function() {
			cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
			setInterval(function () {
				navigator.geolocation.getCurrentPosition(function (position) {
					$scope.montaMotoristaLocalizacao(position.coords.latitude, position.coords.longitude, pontosDeParada);
					motoristaService.enviarLocalizacaoAtual($scope.motoristaLocalizacaoVO)
					.then(function sucess(response) {
						console.log(response);
					}, function error(response) {
						console.log(response);
						Materialize.toast(response.data, 5000, 'rounded toasts-error');
					});
				});
			}, 30000);
		});
	}

	// Metodo para montar o objeto 'MotoristaLocalizacaoVO'
	$scope.montaMotoristaLocalizacao = function (latitude, longitude, pontosDeParada) {
		$scope.motoristaLocalizacaoVO = {};
		$scope.motoristaLocalizacaoVO.idMotorista = $rootScope.usuarioLogado.id;
		$scope.motoristaLocalizacaoVO.latitude = latitude;
		$scope.motoristaLocalizacaoVO.longitude = longitude;
		$scope.motoristaLocalizacaoVO.pontosDeParada = pontosDeParada;
		return $scope.motoristaLocalizacaoVO;
	}

	$scope.carregarRotas();
	iniciarJquery();	

})