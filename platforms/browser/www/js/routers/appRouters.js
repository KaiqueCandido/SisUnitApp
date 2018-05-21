var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');      
    
    $stateProvider
                
        .state('login', {
            cache: false,
            url: '/login',
            views : {
                'content':{
                    templateUrl: 'pages/login.html',
                    controller: 'loginController'
                }
            }            
        })

        .state('loginDesenvolvedor', {
            cache: false,
            url: '/loginDesenvolvedor',
            views : {
                'content':{
                    templateUrl: 'pages/desenvolvedor/login.html',
                    controller: 'loginDesenvolvedorController'
                }
            }            
        })                

        .state('notFound', {
            cache: false,
            url: '/notFound',
            views : {
                'content':{
                    templateUrl: 'pages/404.html',
                    controller: 'notFoundController'
                }
            }            
        });                
});