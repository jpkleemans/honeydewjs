/**
 * FESInterface V0.2 changes since 0.1 Layout returns and Object instead of Array Added setValue method in variable object returning changed variables. Column parameter works now for the get
 * and setValue Extended getLayout with required parameter indicating if returning value should include children.
 */
function FESInterface()
{
    var layouts = {};
    var variables = {};
    var layoutsInput = {
    'ROOT' : {
        children : ['BALANCE', 'CREDIT', 'DEBT']
    },
    'BALANCE' : {
        children: ['TOTAL', 'CHILD1', 'CHILD2']
    },
    'CREDIT' : {
        children: ['INCOME']
    },
    'DEBT' : {
        children: ['INVESTMENT']
    },
    'TOTAL' : {},
    'CHILD1' : {},
    'CHILD2' : {},
    'INCOME' : {},
    'INVESTMENT' : {}
};

    function parseLayoutsRecursive(parent)
    {
        for (layout in parent)
        {
            var variable = {
                id : layout,
                displayType : 'input',
                values : [ 1, 2, 3 ]
            };
            variable.getValue = createGetValue(variable);
            variable.setValue = createSetValue(variable);
            variables[layout] = variable;
            layouts[layout] = parent[layout];
            if (parent[layout].children != undefined)
            {
                parseLayoutsRecursive(parent[layout].children);
            }
        }
    }
    function createGetValue(variable)
    {
        return function(column)
        {
            return variable.values[column];
        }
    }
    function createSetValue(variable)
    {
        return function(column, value)
        {
            variable.values[column] = value;
            var changedVariables = [];
            for (changedVarName in variables)
            {
                changedVariables.push(changedVarName);
            }
            return changedVariables;
        }
    }
    parseLayoutsRecursive(layoutsInput);
    // API functions:
    this.getVariable = function(id)
    {
        return variables[id];
    }
    this.getLayouts = function()
    {
        return layouts;
    }
    this.getLayout = function(id, type)
    {
        if (type == 'WITHCHILDS')
        {
            return layouts[id];
        }
        else if (type == 'NOCHILD')
        {
            // there is only an empty object to return
            return {};
        }
        else
        {
            throw Error('Either WITHCHILDS or NOCHILD');
        }
    }
}
function Columns()
{
    var columns = {
        month : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    };
    // API functions:
    this.getAll = function()
    {
        return columns.month;
    }
}