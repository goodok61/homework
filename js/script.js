'use strict'
/*
1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных 
расходов за месяц
2) Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за 
месяц (Доходы минус расходы)
3) Объявить переменную accumulatedMonth и присвоить ей результат вызова
функции getAccumulatedMonth
4) Объявить функцию getTargetMonth. Подсчитывает за какой период будет 
достигнута цель, зная результат месячного накопления (accumulatedMonth) и возвращает 
результат
5) Удалить из кода переменную budgetMonth
6) budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
7) Почистить консоль логи и добавить недостающие, должны остаться:
 - вызовы функции showTypeOf
 - Расходы за месяц вызов getExpensesMonth
 - Вывод возможных расходов в виде массива (addExpenses)
 - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
 - Бюджет на день (budgetDay)
 - вызов функции getStatusIncome
*/


let money = +prompt('Ваш месячный доход?'),
income = 'фриланс',
deposit = confirm('Есть ли у вас депозит в банке?'),
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
nameExpenses = addExpenses.split(', '),
countExpenses = nameExpenses.length,

/* Думал что доработал, а оказалось сделал не совсем верно
под коменнтом сделаю то что требовалось от предидущего задания чтобы выполнить пункт 1 */
/*for (let i = 0; i < countExpenses; i++) { 
  window['expenses' + i] = prompt('Введите обязательную статью расходов?', nameExpenses[i]);
  window['amount' + i] = prompt('Во сколько это обойдётся?');
  budgetMonth += Number(window['amount' + i]);

};*/
let expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?'),
  mission = 1e5,
  period = 11;


const getExpensesMonth = function(a, b){
  return a + b;
}

const getAccumulatedMonth = function (a, b){
  return a - b;
}

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

const getTargetMonth = function(a, b){
  return Math.ceil(a / b); 
} 

 let budgetDay = Math.floor(accumulatedMonth / 30);

let showTypeOf = function(data) {
  console.log(typeof(data));
}

const getStatusIncome = function(a){
  if (a > 1200) {
    console.log('У вас высокий уровень дохода');
  } else if ((a <= 1200) && (a >= 600)) {
    console.log('У вас средний уровень дохода');
  } else if ((a < 600) && (a >= 0)){
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else {
    console.log('Что то пошло не так');
  }
}

// выводы
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц ' + getExpensesMonth(amount1, amount2));
console.log(nameExpenses);
console.log('Цель будет достигнута за: ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');
console.log('Бюджет на день: ' + budgetDay);
getStatusIncome(budgetDay);