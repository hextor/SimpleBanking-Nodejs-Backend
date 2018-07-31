// TODO: Make ajax calls for withdraw, deposit and transfer
function withdraw(){
  var  account_ = $("#selectWithdrawAccount").val();
  var amount_ = $("#withdrawAmount").val();
  console.log(account_ + " " + amount_);

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
}
