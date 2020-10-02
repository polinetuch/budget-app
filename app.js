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

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        }
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
        expenseContainer: '.expense__list'
    };
        return {
            getInput: function() {
                return {
                    type: document.querySelector(DOMString.inputType).value,
                    value: document.querySelector(DOMString.inputValue).value,
                    description: document.querySelector(DOMString.inputDescription).value,
                }
            },

            addListItem: function(obj, type) {
                var html, newHtml;
                // Create HTML string with placeholder text
                if (type === 'inc'){
                    element = DOMString.incomeContainer;
                    html = `<div class="item clearfix" id="income-%id%">
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
                    html = `<div class="item clearfix" id="expense-%id%">
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
    }

    var controlAddItem = function() {
        var input, newItem;
        input = UICtrl.getInput();

        // get the field input data - add__type
        newItem = budgetController.addItem(input.type, input.description, input.value);

        // add item to the budget controller
        UIController.addListItem(newItem, input.type);

        // add new item to user interface
        // calculate the budget 
        // display the budget on UI
    };

    return {
        init: function() {
            console.log("App starting");
            setUpEventListeners();
        }
    }
})(budgetController, UIController);

appController.init();