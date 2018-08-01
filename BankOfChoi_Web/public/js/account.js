// TODO: Make ajax calls for withdraw, deposit and transfer
//DISPLAY DONE!
var usrname;
var usracct;
// As soon as the html page is loaded launch modal (doesn't wait for images i think)
//hide all warnings!
$( document ).ready(function() {
  $("#modal-warning").hide();
  $("#danger-transfer-account").hide();
  $("#danger-transfer-amount").hide();
  $("#danger-withdraw").hide();
  $("#danger-deposit").hide();
  $("#modal-login").modal('show');
});

function withdraw(){
  var  account_ = $("#selectWithdrawAccount").val();
  var amount_ = $("#withdrawAmount").val();
  // console.log(account_ + " " + amount_);
  if(amount_ < 0){
    $("#withdrawAmount").addClass("is-invalid");
    $("#danger-withdraw").show();
    return;
  }
  $("#depositAmount").removeClass("is-invalid");
  $("#danger-withdraw").hide();

  $.ajax({
    url: 'http://localhost:3000/api/withdraw',
    type: 'POST',
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ account : account_ , amount : amount_}),
    success: (res) => {
      console.log(res);
    }
  });

  updateView();
}

function deposit(){
  var  account_ = $("#selectDepositAccount").val();
  var amount_ = $("#depositAmount").val();
  // console.log(account_ + " " + amount_);
  if(amount_ < 0){
    $("#depositAmount").addClass("is-invalid");
    $("#danger-deposit").show();
    return;
  }
  $("#depositAmount").removeClass("is-invalid");
  $("#danger-deposit").hide();

  $.ajax({
    url: 'http://localhost:3000/api/deposit',
    type: 'POST',
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ account : account_ , amount : amount_}),
    success: (res) => {
      console.log(res);
      console.log(viewCallback());
    }
  });

  updateView();
}

function transfer(){
  var  account_from = $("#selectPullAccount").val();
  var  account_to = $("#selectPushAccount").val();

  if(account_from === account_to){
    $("#selectPushAccount").addClass("is-invalid");
    $("#danger-transfer-account").show();
    return;
  }
  $("#selectPushAccount").removeClass("is-invalid");
  $("#danger-transfer-account").hide();

  var amount_= $("#transferAmount").val();
  // console.log(account_from + " " + account_from + " " + amount_);
//TODO:I WAS IN THE MIDDLE OF FINISHING CHECKING IF THE TRANSFER CHECKS WORKED
//TODO: NEXT IS WARNINGS FOR WITHDRAW AND Transfer
//// TODO: THEN WE NEED TO MAKE BALANCE AND HISTORY PRETYYYYY
  if(amount_ < 0){
    $("#transferAmount").addClass("is-invalid");
    $("#danger-transfer-amount").show();
    return;
  }
  $("#transferAmount").removeClass("is-invalid");
  $("#danger-transfer-amount").hide();


  $.ajax({
    url: 'http://localhost:3000/api/transfer',
    type: 'POST',
    dataType : "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ accountFrom : account_from , accountTo : account_to, amount : amount_}),
    success: (res) => {
      console.log(res);
    }
  });
   updateView();
}

function updateView(){
  console.log(usrname +"--"+ usracct);
  $.ajax({
    url: 'http://localhost:3000/api/view',
    type: 'GET',
    data: { username : usrname, useraccount : usracct },
    dataType: 'json',
    contentType: "application/json",
    success: (res) => {
      console.log(res);
      viewSelect(res.records);
      viewHistory(res.history);
      viewBalance(res.records);
    }
  });
}
