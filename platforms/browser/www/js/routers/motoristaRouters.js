var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {        

    $stateProvider

    .state('homeMotorista', {
        cache: false,
        url: '/homeMotorista',
        views: {
            'header':{
                templateUrl: 'pages/motorista/headerMotorista.html',
                controller: 'headerMotoristaController'
            },
            'content':{
                templateUrl: 'pages/motorista/home.html',
                controller: 'homeMotoristaController'
            },
            'footer':{
                templateUrl: 'pages/footer.html' 
            }
        },        
    })

    .state("motoristaGerenciarRotas", {
        cache: false,
        url:"/motoristaGerenciarRotas",
        views:{                
            'header':{
                templateUrl: 'pages/motorista/headerMotorista.html',
                controller: 'headerMotoristaController'
            },
            'content':{
                templateUrl:"pages/motorista/rotas.html",
                controller:"motoristaRotasController"
            },   
            'footer':{
                templateUrl: 'pages/footer.html'
            }             
        }                               
    });		

});