"use strict";
/*
1) Реализовать "Депозит" по практическому видеоуроку
2) Если пользователь выбрал вариант "Другой" в списке банков, показать скрытый блок "Процент"
3) При подсчете учитывать процент который ввел пользователь.
4) Если пользователь ввел не число или число вне диапазона от 0 до 100, то выведите ошибку в виде alert ("Введите корректное значение в поле проценты") и запретите нажатие кнопки "Расcчитать"*/
const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

// const isEmpty = str => (str.trim() === "");

const start = document.getElementById("start"),
  reset = document.getElementById('cancel'),
  plusIncome = document.getElementsByTagName("button")[0],
  plusExpenses = document.getElementsByTagName("button")[1],
  depositCheck = document.getElementById("deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetDayValue = document.querySelector(".budget_day-value"),
  budgetMonthValue = document.querySelector(".budget_month-value"),
  expensesMonthValue = document.querySelector(".expenses_month-value"),
  additionalIncomeValue = document.querySelector(".additional_income-value"),
  additionalExpensesValue = document.querySelector(".additional_expenses-value"),
  incomePeriodValue = document.querySelector(".income_period-value"),
  targetMonthValue = document.querySelector(".target_month-value"),
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelector(".expenses-title"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount");

let incomeItems = document.querySelectorAll(".income-items"),
  expensesItems = document.querySelectorAll(".expenses-items");


class AppData {
  constructor() {
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
  }
  start() {
    this.budget = +salaryAmount.value;
    this.getPeriod();
    this.getExpenses();
    this.getIncome();
    this.getIncomeSum();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.getTargetMonth();
    this.getStatusIncome();
    this.consoleExpenses();
    this.showResult();
    this.endProgramm();
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener(
      "input",
      () => (incomePeriodValue.value = this.calcSavedMoney())
    );
  }
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector(".expenses-title").value = "";
    cloneExpensesItem.querySelector(".expenses-amount").value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      plusExpenses.style.display = "none";
    }
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector(".income-title").value = "";
    cloneIncomeItem.querySelector(".income-amount").value = "";
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      plusIncome.style.display = "none";
    }
  }
  getExpenses() {
    expensesItems.forEach(item => {
      const itemExpenses = item.querySelector(".expenses-title").value;
      const cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  getIncome() {
    incomeItems.forEach(item => {
      const itemIncome = item.querySelector(".income-title").value;
      const cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = +cashIncome;
      }
    });
  }
  getAddExpenses() {
    this.addExpenses = [];
    const addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    this.addIncome = [];
    additionalIncomeItem.forEach(item => {
      const itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    let a = 0;
    for (const key in this.expenses) {
      a += this.expenses[key];
    }
    this.expensesMonth = +a;
  }
  getIncomeSum() {
    let a = 0;
    for (const key in this.income) {
      a += this.income[key];
    }
    this.incomeMonth = +a;
  }
  getPeriod() {
    periodAmount.textContent = periodSelect.value;
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    console.log(monthDeposit);

    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome() {
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
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
      console.log(this.percentDeposit);

    }
  }
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  }
  consoleExpenses() {
    const b = this.addExpenses.map(
      item => item[0].toUpperCase() + item.slice(1)
    );
  }
  endProgramm() {
    const leftInputs = document
      .querySelector(".data")
      .querySelectorAll("input[type=text]");
    leftInputs.forEach(item => {
      item.disabled = true;
    });
    start.style.display = "none";
    reset.style.display = "block";
    plusExpenses.style.display = "none";
    plusIncome.style.display = "none";
    depositCheck.disabled = true;
    depositBank.disabled = true;
  }
  resetProgramm() {
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
    const leftInputs = document
      .querySelector(".data")
      .querySelectorAll("input[type=text]"),
      allTextInput = document.querySelectorAll("input[type=text]");
    allTextInput.forEach(item => (item.value = ""));
    leftInputs.forEach(item => (item.disabled = false));
    checkSalaryAmount();
    start.style.display = "block";
    reset.style.display = "none";
    plusExpenses.style.display = "block";
    plusIncome.style.display = "block";
    depositCheck.checked = false;
    this.depositHandler();
    depositCheck.disabled = false;
    depositBank.disabled = false;
    depositPercent.style.display = "none";

    let incomeItemsArray = Array.prototype.slice.call(incomeItems);
    incomeItemsArray.forEach( (item, i) => {
      if (i > 0) {
        incomeItems[0].parentNode.removeChild(item);
      }
    });

    let expensesItemsArray = Array.prototype.slice.call(expensesItems);
    expensesItemsArray.forEach( (item, i) => {
      if (i > 0) {
        expensesItems[0].parentNode.removeChild(item);
      }
    });
  }

  chengePercent() {
    const valueSelect = this.value;
    console.log(valueSelect);

    const userPercent = () => {
      depositPercent.value = depositPercent.value;
      console.log(depositPercent.value);
      if (depositPercent.value < 0 || depositPercent.value >= 100) {
        alert("Введите корректное значение в поле проценты");
        depositPercent.value = "";
        start.disabled = true;
      } else {
        start.disabled = false;
      }
      return depositPercent.value;
    }

    if (valueSelect === "other") {
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';
      depositPercent.disabled = false;
      depositPercent.addEventListener("change", userPercent);
      console.log(userPercent());

    } else {
      depositPercent.value = valueSelect * 100;
      depositPercent.style.display = "none";
      depositPercent.removeEventListener("change", userPercent);
    }

    console.log(depositPercent.value);
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.chengePercent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositBank.value = "";
      depositAmount.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.chengePercent);
    }
  }
  eventListeners() {
    salaryAmount.addEventListener("input", checkSalaryAmount);
    depositCheck.addEventListener("change", this.depositHandler.bind(this));
    start.addEventListener("click", this.start.bind(this));
    reset.addEventListener("click", this.resetProgramm.bind(this));
    plusIncome.addEventListener("click", this.addIncomeBlock);
    plusExpenses.addEventListener("click", this.addExpensesBlock);
    periodSelect.addEventListener("input", this.getPeriod);

  }
};

const appData = new AppData();
appData.eventListeners();


function checkSalaryAmount() {
  start.disabled = true;
  if (salaryAmount.value.trim() !== '') {
    salaryAmount.value = salaryAmount.value.trim();
    start.disabled = false;
  }
}
checkSalaryAmount();