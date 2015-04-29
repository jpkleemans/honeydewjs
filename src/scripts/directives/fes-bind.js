honeydew.directive('fesBind', ['FesInterface', '$compile', function(FesInterface, $compile) {


    return {
        restrict: 'A',
        terminal: true,
        priority: 1001,
        compile: function (element, attrs) {
            var variable = attrs.fesBind;
            element.attr('ng-model', variable);
            element.removeAttr("fes-bind");
            return {
                post: function(scope, element, attrs) {
                    $compile(element)(scope);
                    var res, fesvariable;
                    res = scope.$eval(variable)
                    if(angular.isDefined(res))
                    {
                        fesvariable = FesInterface.getVariable(res);
                    } else {
                        fesvariable = FesInterface.getVariable(variable);
                    }
                    scope[variable] = fesvariable.getValue(1);
                    scope.$watch(variable, function (newvalue, oldvalue) {
                        if (newvalue != oldvalue) {
                            var dependencies = fesvariable.setValue(1, newvalue);
                            var length = dependencies.length;
                            for (var i = 0; i < length; i++) {
                                if (angular.isDefined(scope[dependencies[i]])) {
                                    scope[dependencies[i]] = FesInterface.getVariable(dependencies[i]).getValue(1);
                                }
                            }
                        }
                    });
                }
            };
        }
    }
}]);