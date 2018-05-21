var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {        

    $stateProvider

    .state('homeGestor', {
        cache: false,
        url: '/homeGestor',
        views: {
            'header':{
                templateUrl: 'pages/gestor/headerGestor.html',
                controller: 'headerGestorController'
            },
            'content':{
                templateUrl: 'pages/gestor/home.html',
                controller: 'homeGestorController'
            },
            'footer':{
                templateUrl: 'pages/footer.html' 
            }
        },        
    })      

    .state("gestorGerenciarVeiculos", {
        cache: false,
        url:"/gestorGerenciarVeiculos",
        views:{                
            'header':{
                templateUrl: 'pages/gestor/headerGestor.html',
                controller: 'headerGestorController'
            },
            'content':{
                templateUrl:"pages/gestor/veiculos.html",
                controller:"veiculosController"
            },   
            'footer':{
                templateUrl: 'pages/footer.html'
            }             
        }                               
    })

    .state("gestorGerenciarMotoristas", {
        cache: false,
        url:"/gestorGerenciarMotoristas",
        views:{                
            'header':{
                templateUrl: 'pages/gestor/headerGestor.html',
                controller: 'headerGestorController'
            },
            'content':{
                templateUrl:"pages/gestor/motoristas.html",
                controller:"motoristasController"
            },   
            'footer':{
                templateUrl: 'pages/footer.html'
            }             
        }                               
    })

    .state("gestorGerenciarPassageiros", {
        cache: false,
        url:"/gestorGerenciarPassageiros",
        views:{                
            'header':{
                templateUrl: 'pages/gestor/headerGestor.html',
                controller: 'headerGestorController'
            },
            'content':{
                templateUrl:"pages/gestor/passageiros.html",
                controller:"passageirosController"
            },   
            'footer':{
                templateUrl: 'pages/footer.html'
            }             
        }                               
    })

    .state("gestorGerenciarPontosDeParada", {
        cache: false,
        url:"/gestorGerenciarPontosDeParada",
        views:{                
            'header':{
                templateUrl: 'pages/gestor/headerGestor.html',
                controller: 'headerGestorController'
            },
            'content':{
                templateUrl:"pages/gestor/pontosDeParada.html",
                controller:"pontosDeParadaController"
            },   
            'footer':{
                templateUrl: 'pages/footer.html'
            }             
        }                               
    })

    .state("gestorGerenciarRotas", {
        cache: false,
        url:"/gestorGerenciarRotas",
        views:{                
            'header':{
                templateUrl: 'pages/gestor/headerGestor.html',
                controller: 'headerGestorController'
            },
            'content':{
                templateUrl:"pages/gestor/rotas.html",
                controller:"rotasController"
            },   
            'footer':{
                templateUrl: 'pages/footer.html'
            }             
        }                               
    });		

});