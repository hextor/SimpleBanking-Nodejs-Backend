//TODO:=================
// - add checking and savings balance
// - deposit/withdraw money into the proper account
//======================
var account = {
  name : "test",
  accNum : "BoC1234",
  balance : 400
}

function deposit(){
  account.balance += value;
}

// $("some identifier") is the jquery way to start accessing elements in the html page.
// the # just means we are grabbing an id element from the html
// use the dot-operator to access any function jquery has
// in this case .val() returns the value of the id element
function withdraw(){
  var value = $("#withdrawAmount").val();
  account.balance -= value;

}

// there's an 'onclick' attribute in the tab for check Balances
// so anytime someone clicks on that tab this function will load
// when we give val() and argument, we are populating the field with some data
function getBalance(){
  $("#checkingAccount1").val(account.balance);
}
