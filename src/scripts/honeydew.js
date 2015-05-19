var honeydew = angular.module('honeydew', ['QuickList']);

honeydew.constant('ColumnRepository', new Fes.DummyColumnRepository());
honeydew.constant('VariableRepository', new Fes.DummyVariableRepository());