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
        allItem: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        }
    }
})();

// UI Controller
var UIController = (function() {
    var DOMString = {
        inputType: '.add__type',
        inputValue: '.add__value',
        inputDescription: '.add__description',
        inputButton: '.add__btn'
    };
        return {
            getInput: function() {
                return {
                    type: document.querySelector(DOMString.inputType).value,
                    value: document.querySelector(DOMString.inputValue).value,
                    description: document.querySelector(DOMString.inputDescription).value,
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
    }

    var controlAddItem = function() {
        var input = UICtrl.getInput();
        // get the field input data - add__type
        // add item to the budget controller
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