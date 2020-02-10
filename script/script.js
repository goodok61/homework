'use strict';
/*
1) +  Переписать метод getIncome аналогично getExpenses
2) +  Создать метод addIncomeBlock аналогичный addExpensesBlock
3) +  Округлить вывод дневного бюджета
4) +  Число под полоской (input type range) должно меняться в зависимости от позиции range, используем событие input.
5) +  Добавить обработчик события внутри метода showResult, который будет отслеживать период и сразу менять значение в поле “Накопления за период” (После нажатия кнопки рассчитать, если меняем ползунок в range, “Накопления за период” меняются динамически аналогично 4-ому пункту)
6) +  Запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой, проверку поля Месячный доход в методе Start убрать.
7) Реализовать так, чтобы инпуты добавлялись пустые без value при добавлении новых полей в обязательных расходах и дополнительных доходах
8) Поля с placeholder="Наименование" разрешить ввод только русских букв пробелов и знаков препинания
9) Поля с placeholder="Сумма" разрешить ввод только цифр
*/
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

function isEmpty(str) {
  if (str.trim() == ''){
    return true;
  }
  return false;
}

  
let start = document.getElementById('start'),
  plusIncome = document.getElementsByTagName('button')[0],
  plusExpenses = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),

  salaryAmount = document.querySelector('.salary-amount'),
  incomeItems = document.querySelectorAll('.income-items'),
  incomeTitle = document.querySelector('.income-title'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');


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
  start: function () {

    appData.budget = +salaryAmount.value;
    appData.getPeriod();
    appData.getExpenses();
    appData.getIncome();
    appData.getIncomeSum();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    // console.log("Расходы за месяц составляют: " + appData.expensesMonth);
    appData.getTargetMonth();
    appData.getStatusIncome();
    //appData.result();
    appData.getInfoDeposit();
    appData.consoleExpenses();


    appData.showResult();
  },
  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener('input', appData.start);
  },
  addExpensesBlock: function (){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3){
      plusExpenses.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      plusIncome.style.display = 'none';
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== ''){
      appData.expenses[itemExpenses] = +cashExpenses;
      }
    })
  },
  getIncome: function(){
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    })

/*
    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome,
        cashIncome;
      do {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      }
      while (isEmpty(itemIncome));
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      }
      while (!isNumber(cashIncome));
      appData.income[itemIncome] = +cashIncome;
    };
*/

    /*for(let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }*/
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    })
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function () {
    let a = 0;
    for (const key in appData.expenses) {
      a += appData.expenses[key];
    }
    appData.expensesMonth = +a;
  },
  getIncomeSum: function() {
    let a = 0;
    for (const key in appData.income) {
      a += appData.income[key];
    }
    appData.incomeMonth = +a;
  },
  getPeriod: function(){
    periodAmount.textContent = periodSelect.value;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
  },
  getStatusIncome: function () {
    {
      if (appData.budgetDay > 1200) {
        console.log('У вас высокий уровень дохода');
      } else if ((appData.budgetDay <= 1200) && (appData.budgetDay >= 600)) {
        console.log('У вас средний уровень дохода');
      } else if ((appData.budgetDay < 600) && (appData.budgetDay >= 0)) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
      } else {
        console.log('Что то пошло не так');
      }
    };
  },
  result: function () {
    console.log('Наша программа включает в себя данные: ');
    for (const key in appData) {
      console.log(key + " " + appData[key]);
    }
  },
  getInfoDeposit: function(){
    if (appData.deposit){
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(+appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(+appData.moneyDeposit));
    }
  },
  calcSavedMoney: function(){
    return appData.budgetMonth * periodSelect.value;
  },
  consoleExpenses: function(){
    const b = appData.addExpenses.map(item => item[0].toUpperCase() + item.slice(1));
    console.log(b.join(', '));
  }
}

function checkSalaryAmount(){
  start.disabled = true;
  if (salaryAmount.value.length != 0) {
      start.disabled = false;
  }
}
checkSalaryAmount();

salaryAmount.addEventListener('change', checkSalaryAmount);
start.addEventListener('click', appData.start);
plusIncome.addEventListener('click', appData.addIncomeBlock);
plusExpenses.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('change', appData.getPeriod);