angular.module("uiCpfDirective", [])

.directive("uiCpf", function ($filter) {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            var _formatCpf = function (cpf) {  
                cpf = cpf.replace(/[^0-9]+/g, "");
                if(cpf.length > 2){
                    cpf = cpf.substring(0,3) + '.' + cpf.substring(3);
                }
                if(cpf.length > 6){
                    cpf = cpf.substring(0,7) + '.' + cpf.substring(7);
                }
                if(cpf.length > 10){
                    cpf = cpf.substring(0,11) + '-' + cpf.substring(11,13);
                }

                return cpf;
            };
            
            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatCpf(ctrl.$viewValue));
                ctrl.$render();
            });
            
            ctrl.$parsers.push(function (value) {
                value = value.replace('.', '');
                value = value.replace('.', '');
                value = value.replace('-', '');
                return value;
            });

            ctrl.$formatters.push(function (value) {
                return $filter("cpfFilter")(value);
            });
            
        }
    };
});
