angular.module("uiTelefoneDirective", [])

.directive("uiTelefone", function ($filter) {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            var _formatTelefone = function (telefone) {  
                telefone = telefone.replace(/[^0-9]+/g, "");
                if(telefone.length > 0){
                    telefone = '(' + telefone.substring(0,1) + telefone.substring(1);
                }
                if(telefone.length > 2){
                    telefone = telefone.substring(0,3) + ')' + telefone.substring(3);
                }
                if(telefone.length > 7){
                    telefone = telefone.substring(0,8) + '-' + telefone.substring(8);
                }
                if(telefone.length > 13){
                    telefone = telefone.replace('-','');
                    telefone = telefone.substring(0,9) + '-' + telefone.substring(9,13);
                }
                
                return telefone;
            };
            
            element.bind("keyup", function () {
                ctrl.$setViewValue(_formatTelefone(ctrl.$viewValue));
                ctrl.$render();
            });
            
            ctrl.$parsers.push(function (value) {
                value = value.replace('(', '');
                    value = value.replace(')', '');
                    value = value.replace('-', '');
                return value;
            });

            ctrl.$formatters.push(function (value) {
                return $filter("telefoneFilter")(value);
            });
            
        }
    };
});
