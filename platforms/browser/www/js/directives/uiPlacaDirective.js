angular.module("uiPlacaDirective", [])
.directive("uiPlaca", function ($filter) {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            var _formatPlaca = function (placa) {     
                if(typeof placa != 'undefined'){           
                    if(placa.length < 4){
                        placa = placa.replace(/[^a-zA-z]+/g, "");
                    }
                    if(placa.length > 2){                                        
                        placa = placa.substring(0,3) + '-' + placa.substring(4,8).replace(/[^0-9]+/g, "");
                    }
                    return placa;
                }
            };

            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatPlaca(ctrl.$viewValue));
                ctrl.$render();
            });

            ctrl.$parsers.push(function (value) {
                value = value.replace('-','');
                return value;
            });

            ctrl.$formatters.push(function (value) {
                return $filter("placaFilter")(value);
            });
        }
    };
});
