"use strict";
/*
1) Привязать контекст вызова функции start к appData
2) +  В нашем объекте везде использовать this как ссылку на объект appData (где это возможно)
3) +  Проверить работу кнопок плюс и input-range (исправить если что-то не работает)
4) Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать, после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить, на которую навешиваем событие и выполнение метода reset
Метод reset должен всю программу возвращать в исходное состояние
*/
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

function isEmpty(str) {
  if (str.trim() == "") {
    return true;
  }
  return false;
}

let start = document.getElementById("start"),
  plusIncome = document.getElementsByTagName("button")[0],
  plusExpenses = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetDayValue = document.querySelector(".budget_day-value"),
  budgetMonthValue = document.querySelector(".budget_month-value"),
  expensesMonthValue = document.querySelector(".expenses_month-value"),
  additionalIncomeValue = document.querySelector(".additional_income-value"),
  additionalExpensesValue = document.querySelector(
    ".additional_expenses-value"
  ),
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

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  start: function() {
    console.log(this);
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
  showResult: function() {
    // console.log(this);
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener("input", function() {
      incomePeriodValue.value = this.calcSavedMoney();
    });
  },
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector(".expenses-title").value = "";
    cloneExpensesItem.querySelector(".expenses-amount").value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      plusExpenses.style.display = "none";
    }
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector(".income-title").value = "";
    cloneIncomeItem.querySelector(".income-amount").value = "";
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      plusIncome.style.display = "none";
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = +cashIncome;
      }
    });
  },
  getAddExpenses: function() {
    this.addExpenses = [];
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    this.addIncome = [];
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function() {
    let a = 0;
    for (const key in this.expenses) {
      a += this.expenses[key];
    }
    this.expensesMonth = +a;
  },
  getIncomeSum: function() {
    let a = 0;
    for (const key in this.income) {
      a += this.income[key];
    }
    this.incomeMonth = +a;
  },
  getPeriod: function() {
    periodAmount.textContent = periodSelect.value;
  },
  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },

  getTargetMonth: function() {
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function() {
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
  },
  result: function() {
    console.log("Наша программа включает в себя данные: ");
    for (const key in appData) {
      console.log(key + " " + appData[key]);
    }
  },
  getInfoDeposit: function() {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt("Какой годовой процент?", 10);
      } while (!isNumber(+this.percentDeposit));
      do {
        this.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(+this.moneyDeposit));
    }
  },
  calcSavedMoney: function() {
    return this.budgetMonth * periodSelect.value;
  },
  consoleExpenses: function() {
    const b = this.addExpenses.map(
      item => item[0].toUpperCase() + item.slice(1)
    );
  },
  endProgramm: function() {
    console.log("ok");
    let leftSide = document.querySelector(".data"),
      leftInputs = leftSide.querySelectorAll("input[type=text]");
    leftInputs.forEach(function(item) {
      item.disabled = true;
    });
    start.textContent = "Сбросить";
    start.removeEventListener("click", appData.start);
    start.addEventListener("click", appData.resetProgramm);
    plusExpenses.style.display = "none";
    plusIncome.style.display = "none";
    console.log(this);
  },
  resetProgramm: function() {
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
    allTextInput.forEach(function(item) {
      item.value = "";
    });
    leftInputs.forEach(function(item) {
      item.disabled = false;
    });
    checkSalaryAmount();
    start.removeEventListener("click", appData.resetProgramm);
    start.addEventListener("click", appData.start);
    plusExpenses.style.display = "block";
    plusIncome.style.display = "block";
    console.log(this);
  }
};

function checkSalaryAmount() {
  start.disabled = true;
  if (salaryAmount.value.length != 0) {
    start.disabled = false;
  }
}
checkSalaryAmount();

salaryAmount.addEventListener("change", checkSalaryAmount);
start.addEventListener("click", appData.start.bind(appData));
plusIncome.addEventListener("click", appData.addIncomeBlock);
plusExpenses.addEventListener("click", appData.addExpensesBlock);
periodSelect.addEventListener("input", appData.getPeriod);
