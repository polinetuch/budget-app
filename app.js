var budgetController = (function() {
    var x = 99;

    var add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(b) {
            console.log(add(b));
        }
    }
})();

var UIController = (function() {

})();

var dataModule = (function() {

})();