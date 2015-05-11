honeydew.directive('fesBind', ['ColumnRepository', 'VariableRepository', '$compile', function (ColumnRepo, VariableRepo, $compile) {


    return {
        restrict: 'A',

        link: function (scope, element, attrs) {
            var variable = attrs.fesBind;

            //ng-model wordt toegevoegd zodat de value gesynct wordt over de gehele view.
            element.attr('ng-model', variable);
            element.removeAttr("fes-bind");

            //element wordt gecomiled op de rootscope. Hierdoor wordt het ng-model actief.
            $compile(element)(scope.$root);

            console.log(variable);
            var fesvariable = VariableRepo.findByKey(variable);
            var column = ColumnRepo.findByKey(1);

            scope.$root[variable] = fesvariable.getAttributes(column).value;
            scope.$root.$watch(variable, function (newvalue, oldvalue) {
                if (newvalue != oldvalue) {
                    var dependencies = fesvariable.setAttributes(column, {value: newvalue});
                    var length = dependencies.length;
                    for (var i = 0; i < length; i++) {
                        if (angular.isDefined(scope.$root[dependencies[i]])) {
                            scope.$root[dependencies[i]] = VariableRepo.findByKey(dependencies[i]).getAttributes(column).value;
                        }
                    }
                }
            })
        }
    }
}]);