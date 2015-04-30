honeydew.directive('fesBindRepeatRecursive', ['FesInterface', '$compile', function(FesInterface, $compile)
{
    return {
        restrict: 'A',
        priority: 1002,
        link: function(scope, element, attrs ) {
            var repeatOn = attrs.ngRepeat;
            var splittedRepeat = attrs.ngRepeat.split(' in ');
            var variable = splittedRepeat[1];
            var result = [];

            function getChildrenRecursive(child)
            {
                var myChildren = FesInterface.getLayout(child, 'WITHCHILDS');
                if(angular.isDefined(myChildren.children))
                {
                    var rs = [];
                    for(var i=0; i<myChildren.children.length; i++)
                    {
                        rs.push({
                            name : myChildren.children[i],
                            children : getChildrenRecursive(myChildren.children[i])
                        })
                    }
                    return rs;
                } else {
                    return [];
                }
            }

            var children = FesInterface.getLayout(variable, 'WITHCHILDS').children;
            for(var i=0; i<children.length; i++)
            {
                result.push({
                    name : children[i],
                    children : getChildrenRecursive(children[i])
                });
            }
            scope[variable] = result;
        }
    }
}])
