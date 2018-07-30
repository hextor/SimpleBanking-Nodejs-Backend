//TODO:=================
// - add checking and savings balance
// - deposit/withdraw money into the proper account
//======================
var account = {
  //User
  name : "test",
  pin : "0000",
  accNum : "BoC1234",
  //Accounts
  checkingAcc1 : 400,
  savingsAcc1 : 3200,
  savingsAcc2 : 1200,
  //Transactions
  transactionNum : {
    0 : "173",
    1 : "174",
    2 : "175",
    3 : "176",
    4 : "177"
  },
  transactionName : {
    0 : "Lenscrafters",
    1 : "Amazon Online Purchases",
    2 : "Starbucks",
    3 : "Starbucks",
    4 : "Starbucks"
  },
  transactionAmount :{
    0 : 100,
    1 : 35.23,
    2 : 8.11,
    3 : 3.23,
    4 : 3.23
  }
}

// $("some identifier") is the jquery way to start accessing elements in the html page.
// the # just means we are grabbing an id element from the html
// use the dot-operator to access any function jquery has
// in this case .val() returns the value of the id element
function withdraw(){
  var acc = $("#selectWithdrawAccount").val();
  var value = $("#withdrawAmount").val();
  // console.log(account[acc] + " " + acc);
  account[acc] = parseFloat(account[acc] - value);
}

function deposit(){
  var acc = $("#selectDepositAccount").val();
  var value = $("#depositAmount").val();
  account[acc] = parseFloat(account[acc] + value);
}

// there's an 'onclick' attribute in the tab for check Balances
// so anytime someone clicks on that tab this function will load
// when we give val() and argument, we are populating the field with some data
// .toFixed(#) is javascript, just means numbers after the decimal (but it breaks randomly..)
function getBalance(){
  $("#checkCheckingAccount1").val("$" + parseFloat(account.checkingAcc1));
  $("#checkSavingsAccount1").val("$" + parseFloat(account.savingsAcc1));
  $("#checkSavingsAccount2").val("$" + parseFloat(account.savingsAcc2));
}

function transfer(){
  var pullAcc = $("#selectPullAccount").val();
  var pushAcc = $("#selectPushAccount").val();
  var value = parseInt($("#transferAmount").val());

  account[pullAcc] = parseFloat(account[pullAcc] - value);
  account[pushAcc] = parseFloat(account[pushAcc] + value);
}
