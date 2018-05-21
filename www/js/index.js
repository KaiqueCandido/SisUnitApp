var app = {
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        cordova.plugins.backgroundMode.enable();
        setInterval(function(){ alert("backgroundMode.enable"); }, 3000);
    }
    
};

app.initialize();