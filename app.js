// Budget Controller
var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' and 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push item into the data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },

        deleteItem: function(type, id) {
            var ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function() {
            // Calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // Calculate the budget: income - expense
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function() {
            console.log(data)
        }
    }
})();

// UI Controller
var UIController = (function() {
    var DOMString = {
        inputType: '.add__type',
        inputValue: '.add__value',
        inputDescription: '.add__description',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };
        return {
            getInput: function() {
                return {
                    type: document.querySelector(DOMString.inputType).value,
                    description: document.querySelector(DOMString.inputDescription).value,
                    value: parseFloat(document.querySelector(DOMString.inputValue).value),
                }
            },

            addListItem: function(obj, type) {
                var html, newHtml, element;
                // Create HTML string with placeholder text
                if (type === 'inc'){
                    element = DOMString.incomeContainer;
                    html = `<div class="item clearfix" id="inc-%id%">
                                <div class="item__description">%description%</div>
                                    <div class="right clearfix">
                                        <div class="item__value">%value%</div>
                                        <div class="item__delete">
                                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                    </div>
                                </div>
                            </div>`;
                } else if (type === 'exp') {
                    element = DOMString.expenseContainer;
                    html = `<div class="item clearfix" id="exp-%id%">
                                <div class="item__description">%description%</div>
                                <div class="right clearfix">
                                    <div class="item__value">%value%</div>
                                    <div class="item__percentage">21%</div>
                                    <div class="item__delete">
                                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                    </div>
                                </div>
                            </div>`;
                };

                // Replace the placeholder text with some actual data
                newHtml = html.replace('%id%', obj.id);
                newHtml = newHtml.replace('%description%', obj.description);
                newHtml = newHtml.replace('%value%', obj.value)

                // Insert HTML into the DOM
                document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            },

            // Delete Item from UI
            deleteListItem: function(selectorID) {
                var element = document.getElementById(selectorID);
                element.parentNode.removeChild(element);
            },

            // empty input fields
            clearInputFields: function() {
                var fields, fieldsArr;

                fields = document.querySelectorAll(DOMString.inputDescription + ', ' + DOMString.inputValue)
                fieldsArr = Array.prototype.slice.call(fields);
                fieldsArr.forEach(function(current, index, array) {
                    current.value = "";
                });

                fieldsArr[0].focus();
            },

            displayBudget: function(obj) {
                document.querySelector(DOMString.budgetLabel).textContent = obj.budget;
                document.querySelector(DOMString.incomeLabel).textContent = obj.totalInc;
                document.querySelector(DOMString.expenseLabel).textContent = obj.totalExp;
                
                if (obj.percentage > 0) {
                    document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + '%';
                } else {
                    document.querySelector(DOMString.percentageLabel).textContent = ' ';

                }
            },

               getDOMString: function() {
                return DOMString;
            }
        }
})();

// Global App Controller
var appController = (function(budgetCtrl, UICtrl) {
    var setUpEventListeners = function() {
        var DOM = UICtrl.getDOMString();
        document.querySelector(DOM.inputButton).addEventListener('click', controlAddItem);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event === 13) {
                controlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function() {
        // Calculate the budget
        budgetController.calculateBudget();

        // Return the budget
        var budget = budgetController.getBudget();
 
        // Display the budget on the UI
        UIController.displayBudget(budget);
    }

    var controlAddItem = function() {
        var input, newItem;

        // Get input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // get the field input data - add__type
            newItem = budgetController.addItem(input.type, input.description, input.value);
    
            // Add item to the budget controller
            UIController.addListItem(newItem, input.type);
    
            // Clear input value fields
            UIController.clearInputFields();
    
            // Calculate and Update budget
            updateBudget();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID; 
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id    
        if (itemID) {
            splitID = itemID.split('-')
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. delete the item from the data structure
            budgetController.deleteItem(type, ID)
            // 2. delete the item from the user interface
            UIController.deleteListItem(itemID)
            // 3. update and show the new budget
            updateBudget();
        }
    };

    return {
        init: function() {
            console.log("App starting");
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setUpEventListeners();
        }
    }
})(budgetController, UIController);

appController.init();