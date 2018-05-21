var app = angular.module('app');
app.controller('veiculosController', function ($scope, $rootScope, $state, veiculoService, estadoService, cidadeService) {
	$scope.selecionado = true;
	$scope.veiculoSelecionadoInativo = true;
	$scope.veiculoSelecionado = {};
	$scope.veiculos = [];			
	$scope.statusDasEntidades = 'ATIVO';
	$scope.veiculo = {};
	$scope.veiculo.estado = {};
	$scope.veiculo.cidade = {};		
	
	$scope.estados = [];
	$scope.cidades = [];

	/*Listar veiculos do banco banco*/
	$scope.listarVeiculos = function() {		
		veiculoService.listar().then(function sucess(response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.statusDasEntidades = 'ATIVO';
				$scope.veiculos = response.data;		
			} else {				
				Materialize.toast('Nenhum registro encontrado!', 5000, 'rounded toasts-warning');
			}			
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Erro de comunicação com o servidor, por favor tente novamente!', 5000, 'rounded toasts-error');
		});
	};

	$scope.carregarDadosParaCadastro = function () {
		$scope.carregarEstados();		
		$scope.atualizarSelects();
	};

	$scope.carregarEstados = function () {
		estadoService.listar().then(function sucess(response) {			
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {					
				$scope.estados = response.data;					
			} else {				
				Materialize.toast('Não foi encontrado nenhum registros de estados!', 5000, 'rounded toasts-warning');
			}			
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Erro de comunicação com o servidor, por favor tente novamente!', 5000, 'rounded toasts-error');
		});
	};	

	$("#estado").change(function(){
		var estado = angular.fromJson($(this).val());
		$scope.veiculo.estado = estado;
		$scope.carregarCidadesPeloEstadoSelecionado(estado.uf);				
	});

	$("#cidade").change(function(){
		var cidade = angular.fromJson($(this).val());
		$scope.veiculo.cidade = cidade;		
	});	

	$scope.salvarVeiculo = function (veiculo) {
		veiculoService.salvar(veiculo).then(function sucess(response) {
			$rootScope.pageLoading = false;
			Materialize.toast('Veiculo salvo com sucesso', 5000, 'rounded toasts-sucess');
			$scope.listarVeiculos();
			delete $scope.veiculo;
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel salvar o veiculo, por favor tente novamente!', 5000, 'rounded toasts-error');
		});
	};

	$scope.editarVeiculo = function (veiculoSelecionado) {
		veiculoService.atualizar(veiculoSelecionado).then(function sucess(response) {
			$rootScope.pageLoading = false;
			Materialize.toast('Veiculo atualizado com sucesso', 5000, 'rounded toasts-sucess');
			$scope.listarVeiculos();
			delete $scope.veiculoSelecionado;
			$('#modalConfirmacaoAtualizacaoDeVeiculo').modal('close');    
			$('#modalEditarVeiculo').modal('close');    
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel atualizar o veiculo, por favor tente novamente!', 5000, 'rounded toasts-error');
		});
	};

	$scope.excluirVeiculo = function () {
		veiculoService.excluir($scope.veiculoSelecionado).then(function sucess(response) {
			$rootScope.pageLoading = false;
			Materialize.toast('O status do veiculo foi alterado para INATIVO ', 5000, 'rounded toasts-sucess');
			$scope.listarVeiculos();
			delete $scope.veiculoSelecionado;			
			$('#modalConfirmacaoExclusaoDeVeiculo').modal('close');    
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel excluir o veiculo, por favor tente novamente!', 5000, 'rounded toasts-error');
		});
	};

	$scope.ativarVeiculo = function () {
		veiculoService.ativar($scope.veiculoSelecionado).then(function sucess(response) {
			$rootScope.pageLoading = false;
			Materialize.toast('O status do veiculo foi alterado para ATIVO ', 5000, 'rounded toasts-sucess');
			$scope.listarVeiculos();
			delete $scope.veiculoSelecionado;	
			$scope.veiculoSelecionadoInativo = true;		
			$('#modalConfirmacaoAtivacaoDeVeiculo').modal('close');    
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel ativar o veiculo, por favor tente novamente!', 5000, 'rounded toasts-error');
		});
	};

	$scope.prepararEdicao = function () {
		Materialize.updateTextFields();
		$scope.carregarEstados();
		$scope.carregarCidadesPeloEstadoSelecionado($scope.veiculoSelecionado.estado.uf);
		$scope.atualizarSelects();
	};

	$('#estadoEditar').change(function(){
		var uf = $(this).val();		
		$scope.estados.forEach(function(estado){
			if(estado.uf === uf){
				$scope.veiculoSelecionado.estado = estado;
				$scope.carregarCidadesPeloEstadoSelecionado(estado.uf);
				$scope.atualizarSelects();
			}
		});
	});

	$scope.carregarCidadesPeloEstadoSelecionado = function (uf) {
		cidadeService.listarPorEstado(uf).then(function sucess(response) {
			if(response.data.length > 0) {
				$scope.cidades = response.data;
				$scope.atualizarSelects();
				$rootScope.pageLoading = false;
			} else {
				Materialize.toast('Não foi encontrado nenhuma cidade para o estado selecionado!', 5000, 'rounded toasts-warning');
				$rootScope.pageLoading = false;
			}
		}, function error() {
			Materialize.toast('Não foi possivel carregar as cidades, por favor tente novamente!', 5000, 'rounded toasts-warning');
			$rootScope.pageLoading = false;			
		});
	};

	$scope.alternaStatusDasEntidades = function(){
		$scope.statusDasEntidades === 'ATIVO' ? $scope.statusDasEntidades = 'INATIVO' : $scope.statusDasEntidades = 'ATIVO';
		$scope.selecionado = true;
		$scope.veiculoSelecionadoInativo = true;
		$scope.limpaSelecoes();
	}

	$scope.selecionaVeiculo = function(veiculo) {
		if(veiculo.selecionado === 'grey') {
			veiculo.selecionado = 'none';
			$scope.selecionado = true;
			$scope.veiculoSelecionadoInativo = true;
		} else {
			if (veiculo.statusDoCadastro === 'ATIVO'){
				$scope.limpaSelecoes();
				veiculo.selecionado = 'grey';
				$scope.selecionado = false;			
				$scope.veiculoSelecionado = veiculo;
			} else {
				$scope.limpaSelecoes();
				veiculo.selecionado = 'grey';
				$scope.veiculoSelecionado = veiculo;
				$scope.veiculoSelecionadoInativo = false;
			}
		}
	};

	$scope.limpaSelecoes = function(){
		$scope.veiculos.forEach(function(veiculo){
			veiculo.selecionado = 'none';
		});
	};	

	$scope.atualizarSelects = function(){
		setTimeout(function (){
			$('select').material_select();
		}, 500);
	};	

	iniciarJquery();
	$scope.listarVeiculos();

});