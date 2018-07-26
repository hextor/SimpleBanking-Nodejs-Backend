var account = {
  name : "test",
  accNum : "BoC1234"
  balance : 0,
}

function deposit(int value){
  account.balance += value;
}

function withdraw(int value){
  account.balance -= value;
}

function getBalance(){
  return account.balance;
}
