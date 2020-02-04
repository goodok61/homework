
/*
1) Переписать функцию start циклом do while
2) Добавить проверку что введённые данные являются числом, которые мы получаем на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth
3) Если getTargetMonth возвращает нам отрицательное значение, то вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”
*/
let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
  income = 'фриланс',
  deposit = confirm('Есть ли у вас депозит в банке?'),
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  nameExpenses = addExpenses.split(', '),
  countExpenses = nameExpenses.length;

let start = function(){
  do {
    money = +prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();
console.log(money);

let expenses = [];

let getExpensesMonth = function(){
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
  
    do {
      a = prompt('Во сколько это обойдется?')
    }
    while (!isNumber(a));

    sum += +a;
  }
  return sum;
};

let expensesAmount = getExpensesMonth();

let mission = 1e5,
  period = 11;


let getAccumulatedMonth = function (a, b){
  return a - b;
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

const getTargetMonth = function(a, b){
  return Math.ceil(a / b); 
};

let budgetDay = Math.floor(accumulatedMonth / 30);

let showTypeOf = function(data) {
  console.log(typeof(data));
};

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
};

// выводы
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц ' + expensesAmount);
console.log(nameExpenses);
if ((getTargetMonth(mission, accumulatedMonth)) <= 0) {
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за: ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');
};

console.log('Бюджет на день: ' + budgetDay);
getStatusIncome(budgetDay);