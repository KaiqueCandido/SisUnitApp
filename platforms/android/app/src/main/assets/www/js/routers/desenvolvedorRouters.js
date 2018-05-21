var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {        

    $stateProvider

    .state('homeDesenvolvedor', {
        cache: false,
        url: '/homeDesenvolvedor',
        views: {
            'header':{
                templateUrl: 'pages/desenvolvedor/header.html',
                controller: 'headerDesenvolvedorController'
            },
            'content':{
                templateUrl: 'pages/desenvolvedor/home.html',
                controller: 'mainDesenvolvedorController'
            }            
        }    
    })

    .state('desenvolvedorGerenciarGestores', {
        cache: false,
        url: '/desenvolvedorGerenciarGestores',
        views: {
            'header':{
                templateUrl: 'pages/desenvolvedor/header.html',
                controller: 'headerDesenvolvedorController'
            },
            'content':{
                templateUrl: 'pages/desenvolvedor/gestores.html',
                controller: 'gestoresController'
            }            
        }    
    });		

});