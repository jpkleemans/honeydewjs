honeydew.controller('TestController', function ($scope) {

    //var maxDepth = 5;
    //
    //var getChildren = function (depth) {
    //    var result = [];
    //
    //    if (depth <= maxDepth) {
    //        var array = new Array(5);
    //
    //        var i = array.length;
    //        while (i--) {
    //            result.push({
    //                key: 'item' + i,
    //                children: getChildren(depth + 1)
    //            });
    //        }
    //    }
    //
    //    return result;
    //};

    var getItems = function () {
        var result = [];

        var array = new Array(60);

        var i = array.length;
        while (i--) {
            var columns = new Array(16);
            var cols = [];

            var j = columns.length;
            while (j--) {
                cols.push('col' + j);
            }

            result.push(cols);
        }

        return result;
    };

    $scope.items = getItems();

    $scope.add = function () {
        $scope.items.push('test');
    }

});