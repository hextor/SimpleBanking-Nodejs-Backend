//DISPLAY DONE!

// As soon as the html page is loaded launch modal (doesn't wait for images i think)
$( document ).ready(function() {
  $("#modal-login").modal('show');
});

// In the start of the display tabs, theres an 'onclick' attribute with the function
// changeMessage(event)
// 'event' is an inherit property for the html page
// Since we clicked on a tab it will pass a MouseClick event.
// Within that mouse click, there are other properties
// The one we want to focus on is target, since it will return the tag that was associated with the button click
// So we take the text element and display that on the big screen
// Uncomment the code if you want to see what gets returned, you can see it in the browser console
// #messageBox is an id for a <p> tag, so we need to use text to change the value.
function changeMessage(e){
  //console.log(e);
  //console.log(e.target);
  $("#messageBox").text(e.target.text);
}

function viewSelect(records){
  for(var i = 0; i < records.length; i++){
    if(i == 0){
      $("#selectWithdrawAccount").append(
        "<option value='"+records[i].CUST_ACCT_NO+"'>Checking</option>"
      );
      $("#selectDepositAccount").append(
        "<option value='"+records[i].CUST_ACCT_NO+"'>Checking</option>"
      );
      $("#selectPullAccount").append(
        "<option value='"+records[i].CUST_ACCT_NO+"'>Checking</option>"
      );
      $("#selectPushAccount").append(
        "<option value='"+records[i].CUST_ACCT_NO+"'>Checking</option>"
      );
    }
    else{
      $("#selectWithdrawAccount").append(
        "<option value='"+records[i].CUST_ACCT_NO+"'>Savings "+ i +"</option>"
      );
      $("#selectDepositAccount").append(
        "<option value='"+records[i].CUST_ACCT_NO+"'>Savings "+ i +"</option>"
      );
      $("#selectPullAccount").append(
        "<option value='"+records[i].CUST_ACCT_NO+"'>Savings "+ i +"</option>"
      );
      $("#selectPushAccount").append(
        "<option value='"+records[i].CUST_ACCT_NO+"'>Savings "+ i +"</option>"
      );
    }
  }
}
function viewHistory(history){
  for(var i = history.length - 1; i > -1; i--){
    $("#historyList").append(
    "<div class='row'>" +
    "<div class='col-md-2'>" + history[i].CUST_ACCT_NO + "</div>" +
    "<div class='col-md-4'>" + history[i].TRANS_NAME + "</div>" +
    "<div class='col-md-3'>" + history[i].TRANS_DATE + "</div>" +
    "<div class='col-md-3'>" + history[i].AMOUNT + "$</div>" +
    "</div><hr/>"
    );
  }
}

function viewBalance(records){
  for(var i = 0; i < records.length; i++){
    if(i == 0){
      $("#viewBalance").append(
      "<div class='row text-center'>" +
      "<p class='lead col-lg-4'>Checking</p>" +
      "<p class='lead col-lg-4'>" + records[i].CUST_ACCT_NO + "</p>" +
      "<p class='lead col-lg-4'>$" + records[i].BALANCE + "</p>" +
      "</div><hr/>"
      );
    }
    else{
      $("#viewBalance").append(
      "<div class='row text-center'>" +
      "<p class='lead col-lg-4'> Savings "+ i + " </p>" +
      "<p class='lead col-lg-4'>" + records[i].CUST_ACCT_NO + "</p>" +
      "<p class='lead col-lg-4'>$" + records[i].BALANCE + "</p>" +
      "</div><hr/>"
      );
    }
  }
}

function getInfo(){
  var user = $("#loginUsername").val();
  var pass = $("#loginPassword").val();
  $.ajax({
    url: 'http://localhost:3000/login',
    type: 'GET',
    data: { username : user, password : pass},
    dataType: 'json',
    success: (res) => {
      console.log(res);
      console.log(res.records);

      viewSelect(res.records);
      viewHistory(res.history);
      viewBalance(res.records);

      $("#modal-login").modal("hide");
    }
  });
}
