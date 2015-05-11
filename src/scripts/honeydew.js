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

var VariableRepository = new Fes.VariableRepository();
VariableRepository.variables = [variable1, variable2, variable3];

honeydew.constant('ColumnRepository', ColumnRepository);
honeydew.constant('VariableRepository', VariableRepository);