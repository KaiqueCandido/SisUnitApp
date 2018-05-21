var app = angular.module('app');
app.controller('motoristasController', function ($scope, $rootScope, $state, enumService, motoristaService, estadoService, cidadeService, cepService, validatorService) {
	$scope.selecionado = true;
	$scope.motoristaSelecionadoInativo = true;
	$scope.motoristaSelecionado = {};
	$scope.motoristas = [];			
	$scope.statusDasEntidades = 'ATIVO';
	$scope.motorista = {};
	$scope.motorista.documentosPessoais = {};
	$scope.motorista.contato = {};
	$scope.motorista.endereco = {};
	$scope.motorista.endereco.estado = {};
	$scope.motorista.endereco.cidade = {};
	$scope.motorista.contas = [] ;
	$scope.objectValidateVo = {};
	
	$scope.contaMotorista = {};

	// Enums
	$scope.sexos = [];
	$scope.tiposDeZona = [];

	$scope.estados = [];
	$scope.permissoes = [];

	$scope.carregarMotoristas = function () {
		motoristaService.listar().then(function sucess(response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.motoristas = [];			
				$scope.motoristas = response.data;			
			} else {
				Materialize.toast('Não foi encontrado registros de motorista', 5000, 'rounded toasts-warning');
			}
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os motorista', 5000, 'rounded toasts-error');
			
		});
	}
	
	$scope.prepararDados = function () {
		$scope.carregarSexosEnums();
		$scope.carregarEstados();
		$scope.carregarTiposDeZonaEnums();		
		$scope.atualizarSelects();
		Materialize.updateTextFields();
	};

	$scope.carregarSexosEnums = function () {
		enumService.sexos().then(function sucess(response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.sexos = response.data;			
			} else {
				Materialize.toast('Não foi encontrado os sexos', 5000, 'rounded toasts-warning');
			}
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os sexos', 5000, 'rounded toasts-error');			
		});		
	};

	$('#sexo').change(function(){
		$scope.motorista.sexo = $(this).val();		
	});
	
	$scope.carregarEstados = function () {
		estadoService.listar().then(function sucess(response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.estados = response.data;			
			} else {
				Materialize.toast('Não foi encontrado os sexos', 5000, 'rounded toasts-warning');
			}
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os sexos', 5000, 'rounded toasts-error');			
		});		
	};

	$('#estado').change(function(){
		$scope.motorista.documentosPessoais.estadoDeEmissaoDoRg = angular.fromJson($(this).val());				
	});

	$scope.carregarTiposDeZonaEnums = function () {
		enumService.tiposDeZona().then(function sucess(response) {
			$rootScope.pageLoading = false;
			if(response.data.length > 0) {
				$scope.tiposDeZona = response.data;			
			} else {
				Materialize.toast('Não foi encontrado os tipos de zona', 5000, 'rounded toasts-warning');
			}
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel carregar os tipos de zona', 5000, 'rounded toasts-error');			
		});		
	};

	$('#tipoDeZona').change(function(){
		$scope.motorista.endereco.tipoDeZona = $(this).val();
	});		

	$scope.salvarMotorista = function () {		
		motoristaService.salvar($scope.motorista).then(function sucess(response) {
			$rootScope.pageLoading = false;
			Materialize.toast('Motorista cadastrado com sucesso', 5000, 'rounded toasts-sucess');
			delete $scope.motorista;
			$scope.carregarMotoristas();
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel cadastrar o motorista', 5000, 'rounded toasts-error');
		});
	};

	$scope.confirmarAtualizacaoDeMotorista = function () {	
		$('#modalConfirmacaoEdicaoDeMotorista').modal('open'); 
	};

	$scope.editarMotorista = function () {	
		motoristaService.atualizar($scope.motoristaSelecionado).then(function sucess(response) {
			$rootScope.pageLoading = false;
			Materialize.toast('Motorista atualizado com sucesso', 5000, 'rounded toasts-sucess');
			delete $scope.motoristaSelecionado;
			$scope.carregarMotoristas();
			$('#modalConfirmacaoEdicaoDeMotorista').modal('close'); 
			$('#modalEditarMotorista').modal('close'); 
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel atualizar o motorista', 5000, 'rounded toasts-error');
		});
	};

	$scope.inativarMotorista = function () {	
		motoristaService.inativar($scope.motoristaSelecionado).then(function sucess(response) {
			$rootScope.pageLoading = false;
			Materialize.toast('O status do motorista foi modificado para INATIVO', 5000, 'rounded toasts-sucess');
			delete $scope.motoristaSelecionado;
			$scope.carregarMotoristas();
			$('#modalConfirmacaoExclusaoDeMotorista').modal('close'); 
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel atualizar o motorista', 5000, 'rounded toasts-error');
		});
	};

	$scope.ativarMotorista = function () {	
		motoristaService.ativar($scope.motoristaSelecionado).then(function sucess(response) {
			$rootScope.pageLoading = false;
			Materialize.toast('O status do motorista foi modificado para ATIVO', 5000, 'rounded toasts-sucess');
			delete $scope.motoristaSelecionado;
			$scope.carregarMotoristas();
			$('#modalConfirmacaoAtivacaoDeMotorista').modal('close'); 
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('Não foi possivel ativar o motorista', 5000, 'rounded toasts-error');
		});
	};

	$scope.validateCadastroRg = function (value) {			
		$scope.objectValidateVo.id = 0;
		$scope.objectValidateVo.value = value;
		validatorService.validateRg($scope.objectValidateVo).then(function sucess(response) {
			$rootScope.pageLoading = false;
		}, function error(response) {
			$rootScope.pageLoading = false;
			if (response.status === 406) {
				$scope.motorista.documentosPessoais.rg = '';
				Materialize.toast('Esse RG já consta em nossa base de dados', 5000, 'rounded toasts-warning');
			} else {
				Materialize.toast('Não foi possivel se comunicar com o servidor', 5000, 'rounded toasts-error');				
			}
		});
	};

	$scope.validateEdicaoRg = function (value) {		
		$scope.objectValidateVo.id = $scope.motoristaSelecionado.id;
		$scope.objectValidateVo.value = value;			
		validatorService.validateRg($scope.objectValidateVo).then(function sucess(response) {
			$rootScope.pageLoading = false;
		}, function error(response) {
			$rootScope.pageLoading = false;
			if (response.status === 406) {
				$scope.motoristaSelecionado.documentosPessoais.rg = '';
				Materialize.toast('O RG informado já consta em nossa base de dados', 5000, 'rounded toasts-warning');
			} else {
				Materialize.toast('Não foi possivel se comunicar com o servidor', 5000, 'rounded toasts-error');				
			}
		});		
	};

	$scope.validateCadastroCpf = function (value) {			
		$scope.objectValidateVo.id = 0;
		$scope.objectValidateVo.value = value;
		validatorService.validateCpf($scope.objectValidateVo).then(function sucess(response) {
			$rootScope.pageLoading = false;
		}, function error(response) {
			$rootScope.pageLoading = false;
			if (response.status === 406) {
				$scope.motorista.documentosPessoais.cpf = '';
				Materialize.toast('Esse CPF já consta em nossa base de dados', 5000, 'rounded toasts-warning');
			} else {
				Materialize.toast('Não foi possivel se comunicar com o servidor', 5000, 'rounded toasts-error');				
			}
		});
	};

	$scope.validateEdicaoCpf = function (value) {		
		$scope.objectValidateVo.id = $scope.motoristaSelecionado.id;
		$scope.objectValidateVo.value = value;			
		validatorService.validateCpf($scope.objectValidateVo).then(function sucess(response) {
			$rootScope.pageLoading = false;
		}, function error(response) {
			$rootScope.pageLoading = false;
			if (response.status === 406) {
				$scope.motoristaSelecionado.documentosPessoais.Cpf = '';
				Materialize.toast('O CPF informado já consta em nossa base de dados', 5000, 'rounded toasts-warning');
			} else {
				Materialize.toast('Não foi possivel se comunicar com o servidor', 5000, 'rounded toasts-error');				
			}
		});		
	};

	$scope.validateCadastroEmail = function (value) {			
		$scope.objectValidateVo.id = 0;
		$scope.objectValidateVo.value = value;
		validatorService.validateEmail($scope.objectValidateVo).then(function sucess(response) {
			$rootScope.pageLoading = false;
		}, function error(response) {
			$rootScope.pageLoading = false;
			if (response.status === 406) {
				$scope.motorista.contato.email = '';
				Materialize.toast('Esse Email já consta em nossa base de dados', 5000, 'rounded toasts-warning');
			} else {
				Materialize.toast('Não foi possivel se comunicar com o servidor', 5000, 'rounded toasts-error');				
			}
		});
	};

	$scope.validateEdicaoEmail = function (value) {		
		$scope.objectValidateVo.id = $scope.motoristaSelecionado.id;
		$scope.objectValidateVo.value = value;			
		validatorService.validateEmail($scope.objectValidateVo).then(function sucess(response) {
			$rootScope.pageLoading = false;
		}, function error(response) {
			$rootScope.pageLoading = false;
			if (response.status === 406) {
				$scope.motoristaSelecionado.contato.email = '';
				Materialize.toast('O Email informado já consta em nossa base de dados', 5000, 'rounded toasts-warning');
			} else {
				Materialize.toast('Não foi possivel se comunicar com o servidor', 5000, 'rounded toasts-error');				
			}
		});		
	};

	$scope.validateCadastroLogin = function (value) {			
		$scope.objectValidateVo.id = 0;
		$scope.objectValidateVo.value = value;
		validatorService.validateLogin($scope.objectValidateVo).then(function sucess(response) {
			$rootScope.pageLoading = false;
		}, function error(response) {
			$rootScope.pageLoading = false;
			if (response.status === 406) {
				$scope.motoristaSelecionado.conta.login = '';
				Materialize.toast('Esse Login já consta em nossa base de dados', 5000, 'rounded toasts-warning');
			} else {
				Materialize.toast('Não foi possivel se comunicar com o servidor', 5000, 'rounded toasts-error');				
			}
		});
	};

	$scope.validateEdicaoLogin = function (value) {		
		$scope.objectValidateVo.id = $scope.motoristaSelecionado.id;
		$scope.objectValidateVo.value = value;			
		validatorService.validateLogin($scope.objectValidateVo).then(function sucess(response) {
			$rootScope.pageLoading = false;
		}, function error(response) {
			$rootScope.pageLoading = false;
			if (response.status === 406) {
				$scope.motoristaSelecionado.conta.login = '';
				Materialize.toast('O Login informado já consta em nossa base de dados', 5000, 'rounded toasts-warning');
			} else {
				Materialize.toast('Não foi possivel se comunicar com o servidor', 5000, 'rounded toasts-error');				
			}
		});		
	};

	$scope.pesquisaEstadoECidade = function (cep) {
		cepService.buscarEstadoECidade(cep).then(function sucess(response) {			
			if(typeof response.data.erro === 'undefined') {				
				cidadeService.pesquisarPorCodIbge(response.data.ibge).then(function sucess(response) {
					$rootScope.pageLoading = false;	
					$scope.motorista.endereco.cidade = response.data;					
				}, function error() {
					$rootScope.pageLoading = false;
					Materialize.toast('Não foi possivel encontrar a cidade para o cep informado', 5000, 'rounded toasts-error');
				});

				$scope.estados.forEach(function (estado) {
					if(estado.uf === response.data.uf){						
						$scope.motorista.endereco.estado = estado;								
					}
				});
				Materialize.updateTextFields();
			} else {				
				$rootScope.pageLoading = false;	
				Materialize.toast('O cep informado não existe na base de dados!', 5000, 'rounded toasts-error');
				delete $scope.motorista.endereco.estado;
				delete $scope.motorista.endereco.cidade;			
			};			
		}, function error() {
			$rootScope.pageLoading = false;
			Materialize.toast('O cep informado é invalido!', 5000, 'rounded toasts-error');
			delete $scope.motorista.endereco.estado;
			delete $scope.motorista.endereco.cidade;			
		});	
};

$scope.selecionaMotorista = function(motorista) {
	if(motorista.selecionado === 'grey') {
		motorista.selecionado = 'none';
		$scope.selecionado = true;
		$scope.motoristaSelecionadoInativo = true;
	} else {
		if (motorista.conta.statusDoCadastro === 'ATIVO'){
			$scope.limpaSelecoes();
			motorista.selecionado = 'grey';
			$scope.selecionado = false;			
			$scope.motoristaSelecionado = motorista;
		} else {
			$scope.limpaSelecoes();
			motorista.selecionado = 'grey';
			$scope.motoristaSelecionado = motorista;
			$scope.motoristaSelecionadoInativo = false;
		}
	}
};

$scope.alternaStatusDasEntidades = function(){
	$scope.statusDasEntidades === 'ATIVO' ? $scope.statusDasEntidades = 'INATIVO' : $scope.statusDasEntidades = 'ATIVO';
	$scope.selecionado = true;
	$scope.motoristaSelecionadoInativo = true;
	$scope.limpaSelecoes();
}

$scope.limpaSelecoes = function(){
	$scope.motoristas.forEach(function(motorista){
		motorista.selecionado = 'none';
	});
};	

$scope.atualizarSelects = function(){
	setTimeout(function (){
		$('select').material_select();
	}, 500);
};

$scope.carregarMotoristas();
iniciarJquery();
});