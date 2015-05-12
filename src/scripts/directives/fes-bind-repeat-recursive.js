honeydew.directive('fesBindRepeatRecursive', ['VariableRepository', '$compile', '$templateCache', function (Variables, $compile, $templateCache) {
    return {
        restrict: 'A',
        priority: 1002,
        compile: function (element, attrs) {
            //HTML van de ng-repeat wordt in een template gestopt met de meegegeven naam.
            $templateCache.put(attrs.fesBindRepeatRecursive, element[0].innerHTML);
            var repeatOn = attrs.ngRepeat;
            var splittedRepeat = attrs.ngRepeat.split(' in ');
            var variable = splittedRepeat[1];
            var result = [];

            function getChildrenRecursive(child) {
                var myChildren = child.getChildren();
                if (myChildren.length > 0) {
                    var rs = [];
                    for (var i = 0; i < myChildren.length; i++) {
                        rs.push({
                            name: myChildren[i].key,
                            children: getChildrenRecursive(myChildren[i])
                        })
                    }
                    return rs;
                } else {
                    return [];
                }
            }

            var children = Variables.findByKey(variable).getChildren();
            for (var i = 0; i < children.length; i++) {
                result.push({
                    name: children[i].key,
                    children: getChildrenRecursive(children[i])
                });
            }
            attrs.ngRepeat = splittedRepeat[0] + " in " + JSON.stringify(result);
        }
    }
}])
