var Fes;
(function (Fes) {
    var Column = (function () {
        function Column(key) {
            if (typeof key !== "number") {
                throw new TypeError("key must be number");
            }
            if (key < 1 || key > 12) {
                throw new RangeError("key must be between 1 and 12");
            }
            this.key = key;
        }
        return Column;
    })();
    Fes.Column = Column;
})(Fes || (Fes = {}));
/// <reference path="../src/Column.ts" />
var Fes;
(function (Fes) {
    var ColumnRepository = (function () {
        function ColumnRepository() {
        }
        ColumnRepository.prototype.findAll = function () {
            return this.columns;
        };
        ColumnRepository.prototype.findByKey = function (key) {
            var i = this.columns.length;
            while (i--) {
                if (this.columns[i].key === key) {
                    return this.columns[i];
                }
            }
            throw new RangeError("column does not exist");
        };
        return ColumnRepository;
    })();
    Fes.ColumnRepository = ColumnRepository;
})(Fes || (Fes = {}));
/// <reference path="../src/Column.ts" />
var Fes;
(function (Fes) {
    var Variable = (function () {
        function Variable(key) {
            this.key = key;
            this.children = [];
            this.attributes = {};
            this.observers = [];
        }
        Variable.prototype.setAttributes = function (column, attributes) {
            for (var attribute in attributes) {
                if (attributes.hasOwnProperty(attribute)) {
                    if (!this.attributes.hasOwnProperty(column.key.toString())) {
                        this.attributes[column.key] = {};
                    }
                    this.attributes[column.key][attribute] = attributes[attribute];
                }
            }
            var i = this.observers.length;
            while (i--) {
                this.observers[i]();
            }
        };
        Variable.prototype.getAttributes = function (column) {
            return this.attributes[column.key];
        };
        Variable.prototype.getChildren = function () {
            return this.children;
        };
        Variable.prototype.observe = function (callback) {
            this.observers.push(callback);
        };
        return Variable;
    })();
    Fes.Variable = Variable;
})(Fes || (Fes = {}));
/// <reference path="../src/Variable.ts" />
var Fes;
(function (Fes) {
    var VariableRepository = (function () {
        function VariableRepository() {
        }
        VariableRepository.prototype.findByKey = function (key) {
            var found = this.find(key, this.variables);
            if (found === null) {
                throw new RangeError("variable does not exist");
            }
            return found;
        };
        VariableRepository.prototype.find = function (key, array) {
            var i = array.length;
            while (i--) {
                if (array[i].key === key) {
                    return array[i];
                }
                if (array[i].children.length > 0) {
                    var found = this.find(key, array[i].children);
                    if (found === null) {
                        continue;
                    }
                    return found;
                }
            }
            return null;
        };
        return VariableRepository;
    })();
    Fes.VariableRepository = VariableRepository;
})(Fes || (Fes = {}));
/// <reference path="../src/Column.ts" />
var Fes;
(function (Fes) {
    var ColumnRepository = (function () {
        function ColumnRepository() {
        }
        ColumnRepository.prototype.findAll = function () {
            return this.columns;
        };
        ColumnRepository.prototype.findByKey = function (key) {
            var i = this.columns.length;
            while (i--) {
                if (this.columns[i].key === key) {
                    return this.columns[i];
                }
            }
            throw new RangeError("column does not exist");
        };
        return ColumnRepository;
    })();
    Fes.ColumnRepository = ColumnRepository;
})(Fes || (Fes = {}));
/// <reference path="../src/Column.ts" />
var Fes;
(function (Fes) {
    var Variable = (function () {
        function Variable(key) {
            this.key = key;
            this.children = [];
            this.attributes = {};
            this.observers = [];
        }
        Variable.prototype.setAttributes = function (column, attributes) {
            for (var attribute in attributes) {
                if (attributes.hasOwnProperty(attribute)) {
                    if (!this.attributes.hasOwnProperty(column.key.toString())) {
                        this.attributes[column.key] = {};
                    }
                    this.attributes[column.key][attribute] = attributes[attribute];
                }
            }
            var i = this.observers.length;
            while (i--) {
                this.observers[i]();
            }
        };
        Variable.prototype.getAttributes = function (column) {
            return this.attributes[column.key];
        };
        Variable.prototype.getChildren = function () {
            return this.children;
        };
        Variable.prototype.observe = function (callback) {
            this.observers.push(callback);
        };
        return Variable;
    })();
    Fes.Variable = Variable;
})(Fes || (Fes = {}));
/// <reference path="../src/Variable.ts" />
var Fes;
(function (Fes) {
    var VariableRepository = (function () {
        function VariableRepository() {
        }
        VariableRepository.prototype.findByKey = function (key) {
            var found = this.find(key, this.variables);
            if (found === null) {
                throw new RangeError("variable does not exist");
            }
            return found;
        };
        VariableRepository.prototype.find = function (key, array) {
            var i = array.length;
            while (i--) {
                if (array[i].key === key) {
                    return array[i];
                }
                if (array[i].children.length > 0) {
                    var found = this.find(key, array[i].children);
                    if (found === null) {
                        continue;
                    }
                    return found;
                }
            }
            return null;
        };
        return VariableRepository;
    })();
    Fes.VariableRepository = VariableRepository;
})(Fes || (Fes = {}));
