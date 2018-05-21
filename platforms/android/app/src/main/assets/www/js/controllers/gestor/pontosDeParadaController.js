var app = angular.module('app');
app.controller('pontosDeParadaController', function ($scope, $rootScope, $state, pontoDeParadaService) {
	$scope.selecionado = true;
	$scope.pontoDeParadaSelecionadoInativo = true;
	$scope.pontoDeParadaSelecionado = {};
	$scope.pontoDeParada = {};
	$scope.pontosDeParada = [];
	$scope.statusDasEntidades = 'ATIVO';

	$scope.carregarPontosDeParada = function () {
		pontoDeParadaService.listar().then(function sucess(response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.pontosDeParada = response.data;				
			} else {
				Materialize.toast('Não foi encontrado registros de pontos de parada', 5000, 'rounded toasts-warning');
			}
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os pontos de parada', 5000, 'rounded toasts-error');
		});
	};

	$scope.prepararDadosParaCadastro = function () {
		$scope.inicializarMapaNovoPontoDeParada();
	};

	$scope.prepararDadosParaVisualizacao = function () {
		$scope.inicializarMapaVisualizacaoPontoDeParada();
	};	

	$scope.prepararDadosParaEdicao = function () {
		Materialize.updateTextFields();
		$scope.inicializarMapaEdicaoPontoDeParada();
	};	

	$scope.inicializarMapaNovoPontoDeParada = function() {
		// setTimeout(function (){			
			navigator.geolocation.getCurrentPosition( function (position) {
				var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				var mapOptions = {
					center: myLatlng,
					zoom: 16
				};
				var map = new google.maps.Map(document.getElementById("mapNovoPonto"), mapOptions);
				var marker = new google.maps.Marker({position:myLatlng, map:map, draggable: true});

				$scope.pontoDeParada.latitude = myLatlng.lat();$scope.pontoDeParada.longitude = myLatlng.lng();
				marker.addListener('dragend', function(event){
					$scope.pontoDeParada.latitude = event.latLng.lat();
					$scope.pontoDeParada.longitude = event.latLng.lng();
				})
			});			
		// }, 500);
	};

$scope.inicializarMapaVisualizacaoPontoDeParada = function() {		
	setTimeout(function (){
		var myLatlng = new google.maps.LatLng($scope.pontoDeParadaSelecionado.latitude, $scope.pontoDeParadaSelecionado.longitude);
		var mapOptions = {
			center: myLatlng,
			zoom: 16
		};

		var map = new google.maps.Map(document.getElementById("mapVisualizacaoPonto"), mapOptions);
		var marker = new google.maps.Marker({position:myLatlng, map:map});

		var conteudoMarker = '<div align="center"><strong>Detalhes</strong></div><br/>'+
		'<div><p><strong>Descrição: </strong>' + $scope.pontoDeParadaSelecionado.descricao + '</p>';

		var infowindow = new google.maps.InfoWindow({
			content: conteudoMarker,
			maxWidth: 200
		});

		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});		
	}, 500);
};

$scope.inicializarMapaEdicaoPontoDeParada = function() {		
	setTimeout(function (){
		var myLatlng = new google.maps.LatLng($scope.pontoDeParadaSelecionado.latitude, $scope.pontoDeParadaSelecionado.longitude);
		var mapOptions = {
			center: myLatlng,
			zoom: 16
		};

		var map = new google.maps.Map(document.getElementById("mapEditarPonto"), mapOptions);			
		var marker = new google.maps.Marker({position:myLatlng, map:map, draggable: true});

		marker.addListener('dragend', function(event){				
			$scope.pontoDeParadaSelecionado.latitude = event.latLng.lat();
			$scope.pontoDeParadaSelecionado.longitude = event.latLng.lng();				
		})			
	}, 500);	
};


$scope.salvarPontoDeParada = function () {
	pontoDeParadaService.salvar($scope.pontoDeParada).then(function sucess(response) {
		$rootScope.pageLoading = false;
		Materialize.toast('Ponto de Parada cadastrado com sucesso', 5000, 'rounded toasts-sucess');
		$scope.pontoDeParada.descricao = '';
		$scope.carregarPontosDeParada();
	}, function error() {
		$rootScope.pageLoading = false;
		Materialize.toast('Não foi possivel cadastrar o ponto de parada', 5000, 'rounded toasts-error');
	});
};

$scope.confirmarEdicaoDePontoDeParada = function () {
	$('#modalConfirmacaoEdicaoDePontoDeParada').modal('open');	
};

$scope.editarPontoDeParada = function () {
	pontoDeParadaService.atualizar($scope.pontoDeParadaSelecionado).then(function sucess(response) {
		$rootScope.pageLoading = false;
		Materialize.toast('Ponto de parada atualizado com sucesso', 5000, 'rounded toasts-sucess');
		delete $scope.pontoDeParadaSelecionado;
		$scope.carregarPontosDeParada();
		$('#modalConfirmacaoEdicaoDePontoDeParada').modal('close');	
		$('#modalEditarPontoDeParada').modal('close');	
	}, function error() {
		$rootScope.pageLoading = false;
		Materialize.toast('Não foi possivel atualizar o ponto de parada', 5000, 'rounded toasts-error');
	});
};

$scope.excluirPontoDeParada = function () {
	pontoDeParadaService.inativar($scope.pontoDeParadaSelecionado).then(function sucess(response) {
		$rootScope.pageLoading = false;
		Materialize.toast('O status do ponto de parada foi alterado para INATIVO', 5000, 'rounded toasts-sucess');
		delete $scope.pontoDeParadaSelecionado;
		$scope.carregarPontosDeParada();
		$('#modalConfirmacaoExclusaoDePontoDeParada').modal('close');	
	}, function error() {
		$rootScope.pageLoading = false;
		Materialize.toast('Não foi possivel excluir o ponto de parada, por favor tente novamente!', 5000, 'rounded toasts-error');
	});
};

$scope.ativarPontoDeParada = function () {
	pontoDeParadaService.ativar($scope.pontoDeParadaSelecionado).then(function sucess(response) {
		$rootScope.pageLoading = false;
		Materialize.toast('O status do ponto de parada foi alterado para ATIVO', 5000, 'rounded toasts-sucess');
		delete $scope.pontoDeParadaSelecionado;
		$scope.carregarPontosDeParada();
		$('#modalConfirmacaoAtivacaoDePontoDeParada').modal('close');	
	}, function error() {
		$rootScope.pageLoading = false;
		Materialize.toast('Não foi possivel ativar o ponto de parada, por favor tente novamente!', 5000, 'rounded toasts-error');
	});
};

$scope.selecionaPontoDeParada = function(pontoDeParada) {
	if(pontoDeParada.selecionado === 'grey') {
		pontoDeParada.selecionado = 'none';
		$scope.selecionado = true;
		$scope.pontoDeParadaSelecionadoInativo = true;
	} else {
		if (pontoDeParada.statusDoCadastro === 'ATIVO'){
			$scope.limpaSelecoes();
			pontoDeParada.selecionado = 'grey';
			$scope.selecionado = false;			
			$scope.pontoDeParadaSelecionado = pontoDeParada;
		} else {
			$scope.limpaSelecoes();
			pontoDeParada.selecionado = 'grey';
			$scope.pontoDeParadaSelecionado = pontoDeParada;
			$scope.pontoDeParadaSelecionadoInativo = false;
		}
	}
};

$scope.alternaStatusDasEntidades = function(){
	$scope.statusDasEntidades === 'ATIVO' ? $scope.statusDasEntidades = 'INATIVO' : $scope.statusDasEntidades = 'ATIVO';
	$scope.selecionado = true;
	$scope.pontoDeParadaSelecionadoInativo = true;
	$scope.limpaSelecoes();
}

$scope.limpaSelecoes = function(){
	$scope.pontosDeParada.forEach(function(pontoDeParada){
		pontoDeParada.selecionado = 'none';
	});
};	

$scope.atualizarSelects = function(){
	setTimeout(function (){
		$('select').material_select();
	}, 500);
};

$scope.carregarPontosDeParada();
iniciarJquery();

});