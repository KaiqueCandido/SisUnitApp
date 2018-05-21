angular.module("uiHoraDirective", [])
 
.directive("uiHora", function ($filter) {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            var _formatHora = function (hora) {                
                hora = hora.replace(/[^0-9]+/g, "");
                if(hora.length > 2){
                    hora = hora.substring(0,2) + ':' + hora.substring(2, 4);
                }
                return hora;
            };
 
            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatHora(ctrl.$viewValue));
                ctrl.$render();
            });
 
            ctrl.$parsers.push(function (value) {                
                return value;
            });

            ctrl.$formatters.push(function (value) {
                return value;
            });
 
        }
    };
});
