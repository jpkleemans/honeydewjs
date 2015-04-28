honeydew.directive('fesBind', ['FesInterface', function(FesInterface)
{
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            var variable = attrs.ngModel;
            var fesvariable = FesInterface.getVariable(variable);

            scope[variable] = fesvariable.getValue(1);
            scope.$watch(variable, function(newvalue, oldvalue) {
                if(newvalue != oldvalue)
                {
                    var dependencies = fesvariable.setValue(1, newvalue);
                    var length = dependencies.length;
                    for(var i=0; i<length; i++)
                    {
                        if(angular.isDefined(scope[dependencies[i]]))
                        {
                            scope[dependencies[i]] = FesInterface.getVariable(dependencies[i]).getValue(1);
                        }
                    }
                }
                /*

                */
            });
        }
    }
}])
