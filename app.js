// Budget Controller
var budgetController = (function() {

})();

// UI Controller
var UIController = (function(description, value) {
        return {
            getInput: function() {
                // type will be - or +
                var type = document.querySelector('.add__type').value;
                var value = document.querySelector('.add__value').value;
                var description = document.querySelector('.add__description');
            }
        }
})();

// Global App Controller
var appController = (function(budgetCtrl, UICtrl) {

    var controlAddItem = function() {
        // get the field input data - add__type
        // add item to the budget controller
        // add new item to user interface
        // calculate the budget 
        // display the budget on UI
    }

    document.querySelector('.add__btn').addEventListener('click', controlAddItem);

    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event === 13) {
            controlAddItem();
        }
    });
})(budgetController, UIController);