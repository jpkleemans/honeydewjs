honeydew.directive('fesBind', ['FesInterface', '$compile', function(FesInterface, $compile) {


    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            var variable = attrs.fesBind;
            element.attr('ng-model', variable);
            element.removeAttr("fes-bind");
            $compile(element)(scope);
            var fesvariable = FesInterface.getVariable(variable);
            scope.$root[variable] = fesvariable.getValue(1);
            scope.$watch(variable, function (newvalue, oldvalue) {
                if (newvalue != oldvalue) {
                    var dependencies = fesvariable.setValue(1, newvalue);
                    var length = dependencies.length;
                    for (var i = 0; i < length; i++) {
                        if (angular.isDefined(scope.$root[dependencies[i]])) {
                            //scope.$root[dependencies[i]] = FesInterface.getVariable(dependencies[i]).getValue(1);
                        }
                    }
                }
            })
        }
    }
}]);