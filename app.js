// Budget Controller
var budgetController = (function() {

})();

// UI Controller
var UIController = (function() {
    var DOMString = {
        inputType: '.add__type',
        inputValue: '.add__value',
        inputDescription: '.add__description',
        addButton: '.add__btn'
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
    var DOM = UICtrl.getDOMString();

    var controlAddItem = function() {
        var input = UICtrl.getInput();
        console.log(input)
        // get the field input data - add__type
        // add item to the budget controller
        // add new item to user interface
        // calculate the budget 
        // display the budget on UI
    }

    document.querySelector(DOM.addButton).addEventListener('click', controlAddItem);

    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event === 13) {
            controlAddItem();
        }
    });
})(budgetController, UIController);