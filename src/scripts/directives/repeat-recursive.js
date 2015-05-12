honeydew.directive('repeatRecursive', [
    'VariableRepository',
    '$compile',
    '$templateCache',
    function (Variables, $compile, $templateCache) {
        /**
         * Construct the DOM
         *
         * @param element
         * @param attrs
         */
        var compile = function (element, attrs) {
            $templateCache.put(attrs.repeatRecursive, element[0].innerHTML);

            var splittedRepeat = attrs.ngRepeat.split(' in ');
            var variable = splittedRepeat[1];

            var children = Variables.findByKey(variable).getChildren();

            var result = getChildrenRecursive(children);

            attrs.ngRepeat = splittedRepeat[0] + ' in ' + JSON.stringify(result);
        };

        /**
         * Get recursive array of children
         *
         * @param child
         * @returns {Array}
         */
        var getChildrenRecursive = function (children) {
            var result = [];

            var i = 0;
            var length = children.length;
            while (i < length) {
                result.push({
                    key: children[i].key,
                    children: getChildrenRecursive(children[i].getChildren())
                });
                i++
            }

            return result;
        };

        return {
            restrict: 'A',
            priority: 1002,
            compile: compile
        }
    }]);
