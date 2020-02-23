"use strict";
/*
1) Переписать наше приложение в ООП стиле, создать Класс (в старом формате использовать es6 не нужно)
2) Создать новый метод в классе, например eventsListeners.
3) Перенести все действия, которые остались за классом внутрь него.
*/
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

function isEmpty(str) {
  if (str.trim() == "") {
    return true;
  }
  return false;
}

let start = document.getElementById("start"),
  reset = document.getElementById('cancel'),
  plusIncome = document.getElementsByTagName("button")[0],
  plusExpenses = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetDayValue = document.querySelector(".budget_day-value"),
  budgetMonthValue = document.querySelector(".budget_month-value"),
  expensesMonthValue = document.querySelector(".expenses_month-value"),
  additionalIncomeValue = document.querySelector(".additional_income-value"),
  additionalExpensesValue = document.querySelector(".additional_expenses-value"),
  incomePeriodValue = document.querySelector(".income_period-value"),
  targetMonthValue = document.querySelector(".target_month-value"),
  salaryAmount = document.querySelector(".salary-amount"),
  incomeItems = document.querySelectorAll(".income-items"),
  incomeTitle = document.querySelector(".income-title"),
  incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelector(".expenses-title"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount");



const AppData = function () {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
  // console.log(this);
  
};

AppData.prototype.start = function () {
  // console.log(this);
  this.budget = +salaryAmount.value;
  this.getPeriod();
  this.getExpenses();
  this.getIncome();
  this.getIncomeSum();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  // console.log("Расходы за месяц составляют: " + appData.expensesMonth);
  this.getTargetMonth();
  this.getStatusIncome();
  //appData.result();
  this.getInfoDeposit();
  this.consoleExpenses();
  
  this.showResult();
  this.endProgramm();
},
AppData.prototype.showResult = function () {
  // console.log(this);
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.floor(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(", ");
  additionalIncomeValue.value = this.addIncome.join(", ");
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcSavedMoney();
  periodSelect.addEventListener("input", function () {
    incomePeriodValue.value = _this.calcSavedMoney();
  });
};
AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelector(".expenses-title").value = "";
  cloneExpensesItem.querySelector(".expenses-amount").value = "";
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    plusExpenses.style.display = "none";
  }
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector(".income-title").value = "";
  cloneIncomeItem.querySelector(".income-amount").value = "";
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    plusIncome.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashIncome !== "") {
      _this.income[itemIncome] = +cashIncome;
    }
  });
};
AppData.prototype.getAddExpenses = function () {
  
  const _this = this;
  this.addExpenses = [];
  let addExpenses = additionalExpensesItem.value.split(",");
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  const _this = this;
  this.addIncome = [];  
  additionalIncomeItem.forEach(function (item) {    
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  let a = 0;
  for (const key in this.expenses) {
    a += this.expenses[key];
  }
  this.expensesMonth = +a;
};
AppData.prototype.getIncomeSum = function () {
  let a = 0;
  for (const key in this.income) {
    a += this.income[key];
  }
  this.incomeMonth = +a;
};
AppData.prototype.getPeriod = function () {
  
  periodAmount.textContent = periodSelect.value;
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
  {
    if (this.budgetDay > 1200) {
      console.log("У вас высокий уровень дохода");
    } else if (this.budgetDay <= 1200 && this.budgetDay >= 600) {
      console.log("У вас средний уровень дохода");
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      console.log("К сожалению у вас уровень дохода ниже среднего");
    } else {
      console.log("Что то пошло не так");
    }
  }
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt("Какой годовой процент?", 10);
    } while (!isNumber(+this.percentDeposit));
    do {
      this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
    } while (!isNumber(+this.moneyDeposit));
  }
};
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.consoleExpenses = function () {
  const b = this.addExpenses.map(
    item => item[0].toUpperCase() + item.slice(1)
    );
  };
  AppData.prototype.endProgramm = function () {
    // console.log("ok");
    let leftSide = document.querySelector(".data"),
    leftInputs = leftSide.querySelectorAll("input[type=text]");
    leftInputs.forEach(function (item) {
      item.disabled = true;
    });
    start.style.display = 'none';
    reset.style.display = 'block';
    // start.textContent = "Сбросить";
    // start.removeEventListener("click", this.start);
    // start.addEventListener("click", this.resetProgramm);
    plusExpenses.style.display = "none";
    plusIncome.style.display = "none";
    // console.log(this);
  };
  AppData.prototype.resetProgramm = function () {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    periodSelect.value = 1;
    periodAmount.textContent = 1;
    start.textContent = "Рассчитать";
    let leftSide = document.querySelector(".data"),
    leftInputs = leftSide.querySelectorAll("input[type=text]"),
    allTextInput = document.querySelectorAll("input[type=text]");
    allTextInput.forEach(function (item) {
      item.value = "";
    });
    leftInputs.forEach(function (item) {
      item.disabled = false;
    });
    checkSalaryAmount();
    // start.removeEventListener("click", this.resetProgramm);
    // start.addEventListener("click", this.start);
    start.style.display = "block";
    reset.style.display = "none";
    plusExpenses.style.display = "block";
    plusIncome.style.display = "block";
    // console.log(this);
  };
  
  AppData.prototype.eventlisteners = function () {
    // console.log(this.start);
    salaryAmount.addEventListener("change", checkSalaryAmount);
    start.addEventListener("click", this.start.bind(appData));
    reset.addEventListener("click", this.resetProgramm);
    plusIncome.addEventListener("click", this.addIncomeBlock);
    plusExpenses.addEventListener("click", this.addExpensesBlock);
    periodSelect.addEventListener("input", this.getPeriod);
  }
  
  const appData = new AppData();
  AppData.prototype.eventlisteners();
  
  // console.log(appData);
  
  
  function checkSalaryAmount() {
    start.disabled = true;
    if (salaryAmount.value.length != 0) {
      start.disabled = false;
    }
  }
  checkSalaryAmount();