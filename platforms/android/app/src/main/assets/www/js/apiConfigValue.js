var app = angular.module('app');
app.value("configValue", {
    baseUrl: "http://192.168.15.11:8080/SisUniT_Server/ws",
    //baseUrl: "http://localhost:8080/SisUniT_Server/ws",
    cepUrl: "https://viacep.com.br/ws/",
    mapKey: "AIzaSyDymWYcx2oPiianP1RVAaa_UDqoDhEJIXQ",
    mapsUrlApi: "https://www.google.com/maps/dir"
});