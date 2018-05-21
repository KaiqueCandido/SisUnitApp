var app = angular.module("app", [
	"ui.router",
	"uiDateDirective",
	"uiPlacaDirective",
	"uiCepDirective",
	"uiCpfDirective",
	"uiTelefoneDirective",
	"uiHoraDirective"
]);

var appDeviceReady = {
    
    initialize: function() {    	
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {    	
        var permissions = cordova.plugins.permissions;

        permissions.requestPermission(permissions.ACCESS_FINE_LOCATION, function (response) {
            console.log(response)
        });
        permissions.requestPermission(permissions.ACCESS_COARSE_LOCATION, function (response) {
            console.log(response)
        });
        permissions.requestPermission(permissions.INTERNET, function (response) {
            console.log(response)
        });

        // permissions.checkPermission(list, function(status){
        //     if (status.hasPermission) {
        //         alert("Yes :D ");
        //     }
        //     else {
        //         permissions.requestPermission(list, function (status) {
        //             alert('sucess' + status);
        //         }, function (status) {
        //             alert('error' + status);
        //         });
        //     }
        // });

                
    },
   
    onPause: function (){
        alert('onPause');
    },

    onResume: function (){
        alert('onResume');
    },

    onMenuKeyDown: function (){
        alert('onMenuKeyDown');
    },

    onBackKeyDown: function () {
        alert('onBackKeyDown');
    },

    onVolumeDownKeyDown: function () {
        alert('onVolumeDownKeyDown');
    },

    onVolumeUpKeyDown: function () {
        alert('onVolumeUpKeyDown');
    }

};

appDeviceReady.initialize();