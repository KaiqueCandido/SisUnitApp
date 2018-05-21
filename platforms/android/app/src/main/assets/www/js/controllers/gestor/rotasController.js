var app = angular.module('app');
app.controller('rotasController', function ($scope, $rootScope, $state, rotaService, enumService, pontoDeParadaService, veiculoService, motoristaService) {
	$scope.selecionada = true;
	$scope.rotaSelecionadaInativa = true;
	$scope.rotaSelecionada = {};
	$scope.rotas = [];
	$scope.statusDasEntidades = 'ATIVO';
	$scope.rota = {};
	$scope.rota.cronograma = {};

	$scope.diasDaSemana = [];
	$scope.turnos = [];

	$scope.pontosDeParada = [];
	$scope.pontosDeParadaSelecionados = [];
	$scope.motoristas = [];
	$scope.veiculos = [];

	$scope.pontosParaDesenharARotaEditar = [];
	$scope.pontosDeParadaSelecionadosEditar = [];

	var mapNovaRota;
	var mapEditarRota;

	$scope.carregarRotas = function () {
		rotaService.listar().then(function sucess(response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.rotas = response.data;				
			} else {
				Materialize.toast('Não foi encontrado registros de rotas', 5000, 'rounded toasts-warning');
			}
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar as rotas', 5000, 'rounded toasts-error');
		});
	};

	$scope.prepararDadosParaCadastro = function () {
		$scope.carregarMotoristas();
		$scope.carregarVeiculos();
		$scope.carregarDiasDaSemana();
		$scope.carregarTurnos();
		$scope.carregarPontosDeParada();
		$scope.atualizarSelects();
		$scope.inicializarMapaNovaRota();		
	};

	$scope.prepararDadosParaEdicao = function () {
		$scope.carregarMotoristas();
		$scope.carregarVeiculos();
		$scope.carregarDiasDaSemana();
		$scope.carregarTurnos();
		$scope.carregarPontosDeParada();
		$scope.atualizarSelects();
		Materialize.updateTextFields();
		$scope.inicializarMapaEditarRota();		
	};

	$scope.prepararDadosParaVisualizacao = function () {
		$scope.inicializarMapaVisualizarRota();		
	};
	
	$scope.inicializarMapaVisualizarRota = function () {
		if ($scope.rotaSelecionada.pontosDeParada.length > 1) {
			setTimeout(function (){
				var myLatlng = new google.maps.LatLng($scope.rotaSelecionada.pontosDeParada[0].latitude, $scope.rotaSelecionada.pontosDeParada[0].longitude);
				var mapOptions = {
					center: myLatlng,
					zoom: 13
				};

				var mapVisualizarRota = new google.maps.Map(document.getElementById("mapVisualizarRota"), mapOptions);

				var directionsDisplay = new google.maps.DirectionsRenderer;
				var directionsService = new google.maps.DirectionsService;
				directionsDisplay.setMap(mapVisualizarRota);

				var origemRota = new google.maps.LatLng($scope.rotaSelecionada.pontosDeParada[0].latitude, $scope.rotaSelecionada.pontosDeParada[0].longitude);
				var fimRota = new google.maps.LatLng($scope.rotaSelecionada.pontosDeParada[$scope.rotaSelecionada.pontosDeParada.length-1].latitude, $scope.rotaSelecionada.pontosDeParada[$scope.rotaSelecionada.pontosDeParada.length-1].longitude);

				$scope.pontosParaDesenharARota = [];
				$scope.rotaSelecionada.pontosDeParada.forEach(function(currentValue) {
					$scope.pontosParaDesenharARota.push({location: new google.maps.LatLng(currentValue.latitude,currentValue.longitude), stopover: true});
				});

				directionsService.route({
					origin: origemRota,
					destination: fimRota,
					travelMode: google.maps.TravelMode.DRIVING,
					waypoints: $scope.pontosParaDesenharARota,
					optimizeWaypoints: true
				}, function(response, status) {
					if (status == 'OK') {
						directionsDisplay.setDirections(response);
					} else {
						window.alert('Directions request failed due to ' + status);
					}
				});		
			}, 500);	
		} else {
			Materialize.toast('Essa rota não possui pontos de parada para carregar o mapa!', 5000, 'rounded toasts-warning');
		};		
	};

	$scope.inicializarMapaEditarRota = function () {
		if($scope.rotaSelecionada.pontosDeParada.length > 1) {
			setTimeout(function (){
				var myLatlng = new google.maps.LatLng($scope.rotaSelecionada.pontosDeParada[0].latitude, $scope.rotaSelecionada.pontosDeParada[0].longitude);
				var mapOptions = {
					center: myLatlng,
					zoom: 13
				};

				mapEditarRota = new google.maps.Map(document.getElementById("mapEditarRota"), mapOptions);

				var infowindow = new google.maps.InfoWindow({
					maxWidth: 250
				});

				$scope.pontosDeParada.forEach(function(pontoDeParada){
					var marker = new google.maps.Marker({
						position:new google.maps.LatLng(pontoDeParada.latitude, pontoDeParada.longitude),
						map:mapEditarRota
					});

					marker.setAttribution({source:pontoDeParada.id.toString()});
					$scope.rotaSelecionada.pontosDeParada.forEach(function (currentValue) {
						if (pontoDeParada.id === currentValue.id){
							marker.setIcon("resourcers/ponto_selecionado.png");							
						};
					});

					marker.addListener('click', function(event){
						if(typeof marker.getIcon() === 'undefined' || marker.getIcon() === null) {
							marker.setIcon("resourcers/ponto_selecionado.png");
							addPontoSelecionadoEditar(marker.getAttribution().source);
						} else {
							marker.setIcon(null);
							removePontoSelecionadoEditar(marker.getAttribution().source);
						}
					});
					marker.addListener('mousemove', function(){
						var conteudoMarker ='<div><p><strong>Ponto de parada: </strong>' + pontoDeParada.descricao + '</p>';
						infowindow.setContent(conteudoMarker);
						infowindow.open(mapEditarRota, this);
					});
					marker.addListener('mouseout', function(){
						infowindow.close();
					});

				});

				desenharRotaAoSelecionarOsPontosDeParadaEditar();
			}, 500);
		} else {
			Materialize.toast('Essa rota não possui pontos de parada para carregar o mapa!', 5000, 'rounded toasts-warning');
		}
	};

	addPontoSelecionadoEditar = function(id){
      $scope.pontosDeParada.forEach(function(currentValue){
        if (currentValue.id === parseInt(id)){
          $scope.rotaSelecionada.pontosDeParada.push(currentValue);
          desenharRotaAoSelecionarOsPontosDeParadaEditar();
        }
      });
      console.log($scope.rotaSelecionada.pontosDeParada);
	};		

	removePontoSelecionadoEditar = function(id) {
      $scope.rotaSelecionada.pontosDeParada = $scope.rotaSelecionada.pontosDeParada.filter(function (pontoDeParada) {
        if (pontoDeParada.id != parseInt(id)) return pontoDeParada;
      });
      console.log($scope.rotaSelecionada.pontosDeParada);
      desenharRotaAoSelecionarOsPontosDeParadaEditar();
	};

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
    desenharRotaAoSelecionarOsPontosDeParadaEditar = function() {
    	if ($scope.rotaSelecionada.pontosDeParada.length > 1){
    		directionsDisplay.setMap(mapEditarRota);
    		directionsDisplay.setOptions( { suppressMarkers: true } );
    		var origemRota = new google.maps.LatLng($scope.rotaSelecionada.pontosDeParada[0].latitude, $scope.rotaSelecionada.pontosDeParada[0].longitude);
    		var fimRota = new google.maps.LatLng($scope.rotaSelecionada.pontosDeParada[$scope.rotaSelecionada.pontosDeParada.length-1].latitude, $scope.rotaSelecionada.pontosDeParada[$scope.rotaSelecionada.pontosDeParada.length-1].longitude);

    		$scope.pontosParaDesenharARotaEditar = [];
    		$scope.rotaSelecionada.pontosDeParada.forEach(function(currentValue) {
    			$scope.pontosParaDesenharARotaEditar.push({location: new google.maps.LatLng(currentValue.latitude,currentValue.longitude), stopover: true});
    		});

    		directionsService.route({
    			origin: origemRota,
    			destination: fimRota,
    			travelMode: google.maps.TravelMode.DRIVING,
    			waypoints: $scope.pontosParaDesenharARotaEditar,
    			optimizeWaypoints: true
    		}, function(response, status) {
    			if (status == 'OK') {
    				directionsDisplay.setDirections(response);
    			} else {
    				window.alert('Directions request failed due to ' + status);
    			}
    		});
    	} else if ($scope.rotaSelecionada.pontosDeParada.length < 1){
    		directionsDisplay.setMap(null);
    	}
	};

	$scope.inicializarMapaNovaRota = function () {
		navigator.geolocation.getCurrentPosition( function (position) {
			var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var mapOptions = {
				center: myLatlng,
				zoom: 13
			};

			mapNovaRota = new google.maps.Map(document.getElementById("mapNovaRota"), mapOptions);

			var infowindow = new google.maps.InfoWindow({
				maxWidth: 250
			});

			$scope.pontosDeParada.forEach(function(pontoDeParada){
				var marker = new google.maps.Marker({
					position:new google.maps.LatLng(pontoDeParada.latitude, pontoDeParada.longitude),
					map:mapNovaRota
				});

				marker.setAttribution({source:pontoDeParada.id.toString()});

				marker.addListener('click', function(event){
					if(typeof marker.getIcon() === 'undefined' || marker.getIcon() === null) {
						marker.setIcon("resourcers/ponto_selecionado.png");
						addPontoSelecionado(marker.getAttribution().source);
					} else {
						marker.setIcon(null);
						removePontoSelecionado(marker.getAttribution().source);
					}
				});
				marker.addListener('mousemove', function(){
					var conteudoMarker ='<div><p><strong>Ponto de parada: </strong>' + pontoDeParada.descricao + '</p>';
					infowindow.setContent(conteudoMarker);
					infowindow.open(mapNovaRota, this);
				});
				marker.addListener('mouseout', function(){
					infowindow.close();
				});
			});
		});
	};

	addPontoSelecionado = function(id){
      $scope.pontosDeParada.forEach(function(currentValue){
        if (currentValue.id === parseInt(id)){
          $scope.pontosDeParadaSelecionados.push(currentValue);
          desenharRotaAoSelecionarOsPontosDeParada();
        }
      });
	};		

	removePontoSelecionado = function(id) {
      $scope.pontosDeParadaSelecionados = $scope.pontosDeParadaSelecionados.filter(function (pontoDeParada) {
        if (pontoDeParada.id != parseInt(id)) return pontoDeParada;
      });
      desenharRotaAoSelecionarOsPontosDeParada();
	}

	var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    desenharRotaAoSelecionarOsPontosDeParada = function() {
      if ($scope.pontosDeParadaSelecionados.length > 1){
      	directionsDisplay.setMap(null);
        directionsDisplay.setMap(mapNovaRota);
        directionsDisplay.setOptions( { suppressMarkers: true } );
        var origemRota = new google.maps.LatLng($scope.pontosDeParadaSelecionados[0].latitude, $scope.pontosDeParadaSelecionados[0].longitude);
        var fimRota = new google.maps.LatLng($scope.pontosDeParadaSelecionados[$scope.pontosDeParadaSelecionados.length-1].latitude, $scope.pontosDeParadaSelecionados[$scope.pontosDeParadaSelecionados.length-1].longitude);

        $scope.pontosParaDesenharARota = [];
        $scope.pontosDeParadaSelecionados.forEach(function(currentValue) {
          $scope.pontosParaDesenharARota.push({location: new google.maps.LatLng(currentValue.latitude,currentValue.longitude), stopover: true});
        });

        directionsService.route({
          origin: origemRota,
          destination: fimRota,
          travelMode: google.maps.TravelMode.DRIVING,
          waypoints: $scope.pontosParaDesenharARota,
          optimizeWaypoints: true
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      } else if ($scope.pontosDeParadaSelecionados.length < 1){
        directionsDisplay.setMap(null);
      }
	}

	$scope.carregarMotoristas = function () {
		motoristaService.listar().then(function sucess (response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.motoristas = response.data;				
			} else {
				Materialize.toast('Não foi encontrado registros de motoristas', 5000, 'rounded toasts-warning');
			}
		}, function error () {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os motoristas', 5000, 'rounded toasts-warning');			
		});
	};

	$('#motoristas').change(function () {
		$scope.rota.motorista = angular.fromJson($(this).val());
	});
	
	$('#motoristasEdicao').change(function () {
		var auxInt = parseInt($(this).val());
		$scope.motoristas.forEach(function (currentValue) {
			if (currentValue.id === auxInt){
				$scope.rotaSelecionada.motorista = currentValue;
			}
		})
	});

	$scope.carregarVeiculos = function () {
		veiculoService.listar().then(function sucess (response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.veiculos = response.data;				
			} else {
				Materialize.toast('Não foi encontrado registros de veiculos', 5000, 'rounded toasts-warning');
			}
		}, function error () {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os veiculos', 5000, 'rounded toasts-warning');			
		});
	};

	$('#veiculos').change(function () {
		$scope.rota.veiculo = angular.fromJson($(this).val());
	});

	$('#veiculosEdicao').change(function () {
		var auxInt = parseInt($(this).val());
		$scope.veiculos.forEach(function (currentValue) {
			if (currentValue.id === auxInt){
				$scope.rotaSelecionada.veiculo = currentValue;
			}
		})
		console.log($scope.rotaSelecionada);
	});

	$scope.carregarDiasDaSemana = function () {
		enumService.diasDaSemana().then(function sucess (response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.diasDaSemana = response.data;				
			} else {
				Materialize.toast('Não foi encontrado registros de dias da semana', 5000, 'rounded toasts-warning');
			}
		}, function error () {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os dias da semana', 5000, 'rounded toasts-warning');			
		});
	};

	$('#diaDaSemana').change(function () {
		$scope.rota.cronograma.diaDaSemana = $(this).val();
	});

	$('#diaDaSemanaEdicao').change(function () {
		$scope.rotaSelecionada.cronograma.diaDaSemana = $(this).val();
	});

	$scope.carregarTurnos = function () {
		enumService.turnos().then(function sucess (response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.turnos = response.data;				
			} else {
				Materialize.toast('Não foi encontrado registros de turnos', 5000, 'rounded toasts-warning');
			}
		}, function error () {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os turnos', 5000, 'rounded toasts-warning');			
		});
	};

	$('#turno').change(function () {
		$scope.rota.cronograma.turno = $(this).val();
	});

	$('#turnoEdicao').change(function () {
		$scope.rotaSelecionada.cronograma.turno = $(this).val();
	});

	$scope.carregarPontosDeParada = function () {
		pontoDeParadaService.listar().then(function sucess (response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.pontosDeParada = response.data;				
			} else {
				Materialize.toast('Não foi encontrado registros de pontos de parada', 5000, 'rounded toasts-warning');
			}
		}, function error () {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os pontos de parada', 5000, 'rounded toasts-warning');			
		});
	};

	$scope.salvarRota = function () {
		if($scope.pontosDeParadaSelecionados.length > 1){
			$scope.rota.pontosDeParada = $scope.pontosDeParadaSelecionados;
			rotaService.salvar($scope.rota).then(function sucess(response) {
				$rootScope.pageLoading = false;
				Materialize.toast('Rota salva com sucesso', 5000, 'rounded toasts-sucess');
				$scope.carregarRotas();
				delete $scope.rota;
			}, function error() {
				$rootScope.pageLoading = false;
				Materialize.toast('Não foi possivel salvar a rota, por favor tente novamente!', 5000, 'rounded toasts-error');
			});			
		} else {
			Materialize.toast('Selecione no minimo dois pontos de parada', 5000, 'rounded toasts-warning');						
		}
	};

	$scope.confirmarEdicaoDeRota = function () {
		$('#modalConfirmacaoEdicaoDeRota').modal('open');	
	};

	$scope.editarRota = function () {
		if($scope.rotaSelecionada.pontosDeParada.length > 1){
			rotaService.atualizar($scope.rotaSelecionada).then(function sucess(response) {
				$rootScope.pageLoading = false;
				Materialize.toast('Rota atualizada com sucesso', 5000, 'rounded toasts-sucess');
				$scope.carregarRotas();
				delete $scope.rotaSelecionada;
				$('#modalConfirmacaoEdicaoDeRota').modal('close');
				$('#modalEditarRota').modal('close');
			}, function error() {
				$rootScope.pageLoading = false;
				Materialize.toast('Não foi possivel atualizar a rota, por favor tente novamente!', 5000, 'rounded toasts-error');
			});			
		} else {
			Materialize.toast('É nescessario no minimo dois pontos de parada', 5000, 'rounded toasts-warning');						
		}
	};

	$scope.excluirRota = function () {		
		rotaService.inativar($scope.rotaSelecionada).then(function sucess(response) {
			$rootScope.pageLoading = false;
			Materialize.toast('O status da rota foi alterado para INATIVO ', 5000, 'rounded toasts-sucess');
			$scope.carregarRotas();
			delete $scope.rotaSelecionada;
			$('#modalConfirmacaoExclusaoDeRota').modal('close');
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel excluir a rota, por favor tente novamente!', 5000, 'rounded toasts-error');
		});			
		
	};

	$scope.ativarRota = function () {		
		rotaService.ativar($scope.rotaSelecionada).then(function sucess(response) {
			$rootScope.pageLoading = false;
			Materialize.toast('O status da rota foi alterado para ATIVO ', 5000, 'rounded toasts-sucess');
			$scope.carregarRotas();
			delete $scope.rotaSelecionada;
			$('#modalConfirmacaoAtivacaoDeRota').modal('close');
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel ativar a rota, por favor tente novamente!', 5000, 'rounded toasts-error');
		});			
		
	};

	$scope.selecionaRota = function(rota) {
		if(rota.selecionada === 'grey') {
			rota.selecionada = 'none';
			$scope.selecionada = true;
			$scope.rotaSelecionadaInativa = true;
		} else {
			if (rota.statusDoCadastro === 'ATIVO'){
				$scope.limpaSelecoes();
				rota.selecionada = 'grey';
				$scope.selecionada = false;			
				$scope.rotaSelecionada = rota;
			} else {
				$scope.limpaSelecoes();
				rota.selecionada = 'grey';
				$scope.rotaSelecionada = rota;
				$scope.rotaSelecionadaInativa = false;
			}
		}
	};


	$scope.alternaStatusDasEntidades = function(){
		$scope.statusDasEntidades === 'ATIVO' ? $scope.statusDasEntidades = 'INATIVO' : $scope.statusDasEntidades = 'ATIVO';
		$scope.selecionada = true;
		$scope.rotaSelecionadaInativa = true;
		$scope.limpaSelecoes();
	};

	$scope.limpaSelecoes = function(){
		$scope.rotas.forEach(function(rota){
			rota.selecionada = 'none';
		});
	};	

	$scope.atualizarSelects = function(){
		setTimeout(function (){
			$('select').material_select();
		}, 500);
	};

	$scope.carregarRotas();
	iniciarJquery();
});