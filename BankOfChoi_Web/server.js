
const express = require('express');
const app = express(); // for the server
const moment = require('moment'); // makes time easier
const bodyParser = require('body-parser'); // makes parsing post request easier
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('BANK_OF_CHOI_DB.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the bank database.');
});

// looks for the folder named public and displays the file index.html by default
app.use(express.static('public'));

// calling all the data from database
app.get('/api/login', (req, res) =>{
  db.serialize( function(){
    // console.log(res);
    // console.log(req.query.username);
    //pulls acct, name, and checks for pin
  let query1 = 'SELECT ACCT_NO, NAME, PIN_NO FROM USERS WHERE NAME = "'+ req.query.username +'" AND PIN_NO = "'+ req.query.password +'";';
    //puts records in an array, each element being a list
    db.all(query1,  function(err, records){
    if (err) {
      console.error(err.message);
    }
    //checking password, if wrong it fails
    if( records[0] != undefined ){
      var name = records[0]['NAME'];
      var acct = records[0]['ACCT_NO'];
      infoCallback(name, acct);
    }
    else{
      failCallback();
    }
    });
  });

  function failCallback(){
    console.log("Reset everything and suck it up xd");
  }

  function infoCallback(name, acct){
    // console.log(name + " " + acct);
    //already have name and acct, just need each account and balance
    db.serialize(function(){
      //grabbing basic info first
      let query2 = 'select distinct CUST_ACCT_NO, BALANCE from USERS, ACCOUNTS, TRANSACTIONS  where USERS.NAME="'+ name +'" and ACCOUNTS.ACCOUNT='+ acct +';';
      db.all(query2, function (err, records){
        // console.log(records[1]);
        // console.log(records[1]['CUST_ACCT_NO']);
        // console.log(records[1]['BALANCE']);
        //now completing our callback to transaction
        transactionCallback(name, acct, records);
      });
    });
  }

  function transactionCallback(name, acct, records){
    // console.log(name+" "+acct +" "+ records[1]['CUST_ACCT_NO']);
    db.serialize(function(){
      let query3 = 'select CUST_ACCT_NO, TRANS_NAME, TRANS_DATE, AMOUNT from USERS, ACCOUNTS, TRANSACTIONS  where USERS.NAME="'+name+'" and ACCOUNTS.ACCOUNT='+acct+' and ACCOUNTS.CUST_ACCT_NO=TRANSACTIONS.ACCOUNT;';
      db.all(query3, function (err, history){
        // console.log(history);
        successfulCallback(name, acct, records, history);
      });
    });
  }

  function successfulCallback(name, acct, records, history){
    //returns it as a json list
    res.send({name, acct, records, history});
  }
});

app.post('/api/withdraw', (req, res) =>{
  var account_ = req.body.account;
  var amount_ = req.body.amount;
  var date = moment().format('LLL');  // July 31, 2018 12:51 AM
  // console.log(req);
   console.log(account_ + ' ' + amount_);
    db.serialize(function(){
      let query4 = 'UPDATE ACCOUNTS SET BALANCE = BALANCE - "' + amount_ + '" WHERE CUST_ACCT_NO = "' + account_+ '"; '+
        'INSERT INTO TRANSACTIONS (ACCOUNT, TRANS_NAME, TRANS_DATE, AMOUNT, FLAG) VALUES (\'' + account_+ '\', \'ATM_WITHDRAW\', \'' + date + '\', \'' + amount_+'\', \'0\');';
        console.log(query4);
      db.run(query4,  function(err, row){
        console.log(err);
        console.log(row);
      });
    });
});


app.listen(3000, () => console.log('Listening on port 3000'));


// select * from USERS, ACCOUNTS  where USERS.NAME="WonderWoman" and USERS.PIN_NO="1111" and ACCOUNTS.ACCOUNT=1111;
// this pulls basic info we can use
// select distinct ACCT_NO, NAME, CUST_ACCT_NO, BALANCE from USERS, ACCOUNTS, TRANSACTIONS  where USERS.NAME="WonderWoman" and ACCOUNTS.ACCOUNT=1111;
// this pulls transactions making sure it's from the same username
// select CUST_ACCT_NO, TRANS_NAME, TRANS_DATE, AMOUNT from USERS, ACCOUNTS, TRANSACTIONS  where USERS.NAME="WonderWoman" and ACCOUNTS.ACCOUNT=1111 and ACCOUNTS.CUST_ACCT_NO=TRANSACTIONS.ACCOUNT;
