honeydew.directive('fesBindRepeat', ['FesInterface', '$compile', function(FesInterface, $compile)
{
    return {
        restrict: 'A',
        priority: 1002,
        compile: function(element, attrs ) {
            var repeatOn = attrs.ngRepeat;
            var splittedRepeat = attrs.ngRepeat.split(' ');
            var variable = splittedRepeat[2];

            var children = FesInterface.getLayout(variable, 'WITHCHILDS').children;
            attrs.ngRepeat = splittedRepeat[0] + " " + splittedRepeat[1] + " " + JSON.stringify(children);
            return {
                post: function (scope, element, attrs) {

                }
            }

        }
    }
}])
