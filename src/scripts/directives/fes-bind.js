honeydew.directive('fesBind', ['FesInterface', '$compile', function(FesInterface, $compile) {


    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            var variable = attrs.fesBind;

            //ng-model wordt toegevoegd zodat de value gesynct wordt over de gehele view.
            element.attr('ng-model', variable);
            element.removeAttr("fes-bind");

            //element wordt gecomiled op de rootscope. Hierdoor wordt het ng-model actief.
            $compile(element)(scope.$root);

            var fesvariable = FesInterface.getVariable(variable);
            scope.$root[variable] = fesvariable.getValue(1);
            scope.$root.$watch(variable, function (newvalue, oldvalue) {
                if (newvalue != oldvalue) {
                    var dependencies = fesvariable.setValue(1, newvalue);
                    var length = dependencies.length;
                    for (var i = 0; i < length; i++) {
                        if (angular.isDefined(scope.$root[dependencies[i]])) {
                            scope.$root[dependencies[i]] = FesInterface.getVariable(dependencies[i]).getValue(1);
                        }
                    }
                }
            })
        }
    }
}]);