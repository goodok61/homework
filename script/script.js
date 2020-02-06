'use strict';
/*
Задание по проекту, получить каждый элемент в отдельную переменную:

Кнопку "Рассчитать"через id
Кнопки“ + ”(плюс) через Tag, каждую в своей переменной.
Чекбокс по id через querySelector
Поля для ввода возможных доходов(additional_income - item) при помощи querySelectorAll
Каждый элемент в правой части программы через класс, которые имеют в имени класса "-value", начиная с class = "budget_day-value"
и заканчивая class = "target_month-value" >
Оставшиеся поля через querySelector каждый в отдельную переменную: поля ввода(input) с левой стороны и не забудьте про range.
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

let money,
  start = function () {
    do {
      money = +prompt('Ваш месячный доход?', 50000);
    }
    while (!isNumber(+money));
  };

start();
let submit = document.getElementById('#start'),
  plusIncome = document.getElementsByTagName('button')[0],
  plusExpenses = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncome = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = documet.querySelector('.budget_day-value'),
  expensesMonthValue = documet.querySelector('.budget_day-value'),
  additionalIncomeValue = documet.querySelector('.budget_day-value'),
  additionalExpensesValue = documet.querySelector('.budget_day-value'),
  incomePeriodValue = documet.querySelector('.budget_day-value'),
  targetMonthValue = documet.querySelector('.budget_day-value'),

  salaryAmount = documet.querySelector('.salary-amount'),
  incomeTitle = documet.querySelector('.income-title'),
  incomeAmount = documet.querySelector('.income-amount'),
  expensesTitle = documet.querySelector('.expenses-title'),
  expensesAmount = documet.querySelector('.expenses-amount'),
  additionalExpensesItem = documet.querySelector('.additional_expenses-item'),
  depositBank = documet.querySelector('.deposit-bank'),
  depositAmount = documet.querySelector('.deposit-amount'),
  depositPercent = documet.querySelector('.deposit-percent'),
  targetAmount = documet.querySelector('.target-amount'),
  periodSelect = documet.querySelector('.period-select');
  
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {

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
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'qwe, asd, zxc');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {


      let expensesName,
        expensesAmount;
      do {
        expensesName = prompt('Введите обязательную статью расходов?');
      }
      while (isEmpty(expensesName));

      do {
        expensesAmount = +prompt('Во сколько это обойдется?');
      }
      while (!isNumber(expensesAmount));
      appData.expenses[expensesName] = expensesAmount;
    }
  },
  getExpensesMonth: function () {
    let a = 0;
    for (const key in appData.expenses) {
      a += appData.expenses[key];
    }
    appData.expensesMonth = a;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  getTargetMonth: function () {
    let x = Math.ceil(appData.mission / appData.budgetMonth);

    if (x <= 0) {
      console.log('Цель не будет достигнута');
    } else {
      console.log('Цель будет достигнута за: ' + x + ' месяцев');
    };
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
    return appData.budgetMonth * appData.period;
  },
  consoleExpenses: function(){
    const b = appData.addExpenses.map(item => item[0].toUpperCase() + item.slice(1));
    console.log(b.join(', '));
  }
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log("Расходы за месяц составляют: " + appData.expensesMonth);
appData.getTargetMonth();
appData.getStatusIncome();
//appData.result();
appData.getInfoDeposit();
appData.consoleExpenses();