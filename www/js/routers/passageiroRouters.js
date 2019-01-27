/* eslint-disable no-undef */
var app = angular.module('app');

app.config(function($stateProvider) {        

    $stateProvider
    .state('homePassageiro', {
        cache: false,
        url: '/homePassageiro',
        views: {
            'header':{
                templateUrl: 'pages/passageiro/headerPassageiro.html',
                controller: 'headerPassageiroController'
            },
            'content':{
                templateUrl: 'pages/passageiro/home.html',
                controller: 'homePassageiroController'
            },
            'footer':{
                templateUrl: 'pages/footer.html' 
            }
        },        
    });		

});