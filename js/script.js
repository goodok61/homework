'use strict'
/*
+   1) Функцию showTypeof и вызов функции удаляем
+   2) В объект appData добавить свойство budget которое будет принимать значение money
+   3) В объект appData добавить свойства budgetDay, budgetMonth и expensesMonth, изначально равные нулю
+   4) Функции getExpensesMonth, getAccumulatedMonth, getTargetMonth, getStatusIncome - сделать методами объекта AppData
+   5) После этого поправить весь проект, чтобы он работал, а именно
    Везде где вызывались наши функции поправить обращение через объект, например
    let expensesMonth = appData.getExpensesMonth();

Не переходить к следующим пунктам, пока не выполнишь предыдущие.
Программа на данном этапе должна работать.

+   6) Сразу после объекта выполните вызов appData.asking();
+   7) Перенести цикл из метода getExpensesMonth в метод asking, и переписать цикл таким образом чтобы результат записывался в объект appData.expenses
    в формате:
      expenses: {
        “ответ на первый вопрос”: “ответ на второй вопрос”,
        “ответ на первый вопрос”: “ответ на второй вопрос”
      }
    временные условия которые мы писали
    if (i === 0) {
      expenses1 = prompt('Введите обязательную статью расходов?', 'Кварплата');
    } else {
      expenses2 = prompt('Введите обязательную статью расходов?', 'Бензин');
    }
    уже не нужны, вопрос задается каждый цикл
    Обратите внимание Если на вопрос "Введите обязательную статью расходов?"
    ответить 2 раза одинаково, значения свойства просто будут перезаписаны, для проверки отвечайте всегда по разному.(очень частая ошибка)
    Проследите чтобы тип данных значения свойств были числом!
      Пример результата:
      expenses: {
        “Квартплата”: 5000,
        “Детский сад”: 2000
      }
+   8) Переписать метод getExpensesMonth: с помощью цикла считаем сумму всех обязательных расходов и сохраняем результат в свойство expensesMonth нашего объекта
    для того, чтобы посчитать сумму используйте цикл
    for in
+   9) getAccumulatedMonth переименовать в getBudget.Этот метод будет высчитывать значения свойств budgetMonth и budgetDay, чтобы вычислить значения используем только свойства       объекта(никаких внешних переменных)
+   10) В методах getTargetMonth и getStatusIncome исправить переменные, все значения получаем от нашего объекта appData
+   11) Вызвать все необходимые методы после объекта, чтобы корректно считались все данные(порядок очень важен).
+   12) В консоль вывести:
      —Расходы за месяц
      — За какой период будет достигнута цель(в месяцах)
      — Уровень дохода
    Все остальное почистить в программе у нас всего две переменных money и appData
    И две функции start и возможно isNumber
13) Используя цикл
for in для объекта(appData), вывести в консоль сообщение "Наша программа включает в себя данные: "(вывести все свойства и значения)
*/
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};
let money,
  start = function () {
    do {
      money = prompt('Ваш месячный доход?', 50000);
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
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'qwe, asd, zxc');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let expensesName = prompt('Введите обязательную статью расходов?');
      let expensesAmount = +prompt('Во сколько это обойдется?');
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
  }


}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log("Расходы за месяц составляют: " + appData.expensesMonth);
appData.getTargetMonth();
appData.getStatusIncome();
appData.result();