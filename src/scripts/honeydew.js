var honeydew = angular.module('honeydew', []);

var column1 = new Fes.Column(1);
var column2 = new Fes.Column(2);
var column3 = new Fes.Column(3);

var ColumnRepository = new Fes.ColumnRepository();
ColumnRepository.columns = [column1, column2, column3,];

var variable1 = new Fes.Variable("BALANCE");
variable1.setAttributes(column1, {value: 10});
variable1.children = [
    new Fes.Variable("CHILD1"),
    new Fes.Variable("CHILD2")
];
var variable2 = new Fes.Variable("CREDIT");
variable2.setAttributes(column1, {value: 20});
variable2.children = [
    new Fes.Variable("CHILD3"),
    new Fes.Variable("CHILD4"),
    new Fes.Variable("CHILD5")
];
var variable3 = new Fes.Variable("DEBT");
variable3.setAttributes(column1, {value: 30});
variable3.children = [
    new Fes.Variable("CHILD6")
];

var kind1 = new Fes.Variable("kind1");
kind1.setAttributes(column1, {value:10});

var kind2 = new Fes.Variable("kind2");
kind2.setAttributes(column1, {value:120});

var kind3 = new Fes.Variable("kind3");
kind3.setAttributes(column1, {value:112120});

var kind4 = new Fes.Variable("kind4");
kind4.setAttributes(column1, {value:1324230});

var kind5 = new Fes.Variable("kind5");
kind5.setAttributes(column1, {value:107665});

var kind6 = new Fes.Variable("kind6");
kind6.setAttributes(column1, {value:100987654321});

var testdata = new Fes.Variable("TESTDATA");
testdata.setAttributes(column1, {value: 45});
testdata.children = [
    kind1,
    kind2,
    kind3,
    kind4,
    kind5,
    kind6
];

//var testdata2 = new FES.Variable("TESTDATA2");
//testdata2.setAttributes(column1, {value: 300});
//testdata2.children = [];

var VariableRepository = new Fes.VariableRepository();
VariableRepository.variables = [variable1, variable2, variable3, testdata];

honeydew.constant('ColumnRepository', ColumnRepository);
honeydew.constant('VariableRepository', VariableRepository);