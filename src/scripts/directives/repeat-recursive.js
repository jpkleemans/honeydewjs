honeydew.directive('repeatRecursive', [
    'VariableRepository',
    '$templateCache',
    function (Variables, $templateCache) {
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

            attrs.ngRepeat = splittedRepeat[0] + ' in ' + JSON.stringify(children);


        };

        return {
            restrict: 'A',
            priority: 1001,
            compile: compile
        }
    }]);
