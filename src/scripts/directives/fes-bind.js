honeydew.directive('fesBind', [
    '$compile',
    'ColumnRepository',
    'VariableRepository',
    function ($compile, Columns, Variables) {
        /**
         * Construct the DOM
         *
         * @param scope
         * @param element
         * @param attrs
         */
        var link = function (scope, element, attrs) {
            var variable = attrs.fesBind;

            if (typeof scope.$root[variable] === 'undefined') {
                initVariable(variable, scope.$root);
            }

            setAttributes(variable, scope.$root[variable], element);

            element.removeAttr('fes-bind');

            // compile element to activate bindings
            $compile(element)(scope.$root);
        };

        /**
         * Initialize variable
         *
         * @param name
         * @param scope
         */
        var initVariable = function (name, scope) {
            var variable = Variables.findByKey(name);
            var column = Columns.findByKey(1);

            var initialAttrs = variable.getAttributes(column);
            scope[variable.key] = initialAttrs;

            // Listen for user changes
            scope.$watch(variable.key, function (newAttrs) {
                variable.setAttributes(column, newAttrs);
            }, true);

            // Listen for model changes
            variable.observe(function (newAttrs) {
                if (scope[variable.key] !== newAttrs) {
                    scope[variable.key] = newAttrs;
                }
            });
        };

        /**
         * Set html-attributes
         *
         * @param variable
         * @param attrs
         * @param element
         */
        var setAttributes = function (variable, attrs, element) {
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    element.attr('ng-attr-' + attr, '{{' + variable + '.' + attr + '}}');
                }
            }

            // Additional attribute to sync the value with ng-model
            element.attr('ng-model', variable + '.value');
        };

        return {
            restrict: 'A',
            link: link
        }
    }
]);