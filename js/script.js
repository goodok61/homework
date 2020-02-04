'use strict'
/*
1) Сделать проверку при получении данных:
   - наименование дополнительного источника заработка
   - сумма дополнительного заработка
   - ввод статьи обязательных расходов
   - годовой процент депозита
   - сумма депозита
Что значит проверка данных: где должен быть текст там только текст, где цифры только цифры!
Если проверку не прошло, то переспрашивать!
2) Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с большой буквы слова разделены запятой и пробелом
Пример (Интернет, Такси, Коммунальные расходы)
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
    while (!isNumber(money));
  };

start();

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

      appData.income[itemIncome] = cashIncome;
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
      while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
      while (!isNumber(appData.moneyDeposit));
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