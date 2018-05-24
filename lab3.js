const connect = require('connect');
const url = require('url');

const app = connect();

//I think this is more interesting solution but I also wrote and comented the
//solution that you asked in the lab

function calculate(req, res, next) {
  const queryString = url.parse(req.url, true).query;

  const { x, y } =  queryString;

  const operatorURL = url.parse(req.url, true).pathname;
  var reply = '';

  switch (operatorURL) {
  case '/add':
    var num = parseFloat(x) + parseFloat(y);
    reply = ` ${x} + ${y} = ${num}`;
    break;
  case '/subtract':
    var num = parseFloat(x) - parseFloat(y);
    reply = ` ${x} - ${y} = ${num}`;
    break;
  case '/multiply':
    var num = parseFloat(x) * parseFloat(y);
    reply = ` ${x} * ${y} = ${num}`;
    break;
  case '/divide':
    if (y != 0) {
      var num = parseFloat(x) / parseFloat(y);
      reply = ` ${x} / ${y} = ${num}`;
    } else {
      reply = 'Never divide by 0';
    }
    break;
  default:
    reply = `You entered the invalid method: ${operatorURL}`;
  }

  res.end(reply);
}

function fallback(req, res, next) {
  res.end('What?');
  res.end();
}

app.use('/', calculate);
app.use(fallback);

app.listen(3000);

//Lab solution

// function add(req, res, next) {
//   const queryString = url.parse(req.url, true).query;
//
//   const { x, y } = queryString;
//
//   const result = parseFloat(x) + parseFloat(y);
//
//   res.end(`${x} + ${y} = ${result}`);
// }
//
// function subtract(req, res, next) {
//   const queryString = url.parse(req.url, true).query;
//
//   const { x, y } = queryString;
//
//   const result = parseFloat(x) - parseFloat(y);
//
//   res.end(`${x} - ${y} = ${result}`);
// }
//
// function multiply(req, res, next) {
//   const queryString = url.parse(req.url, true).query;
//
//   const { x, y } = queryString;
//
//   const result = parseFloat(x) * parseFloat(y);
//
//   res.end(`${x} * ${y} = ${result}`);
// }
//
// function divide(req, res, next) {
//   const queryString = url.parse(req.url, true).query;
//
//   const { x, y } = queryString;
//
//   if (y != 0) {
//     const result = parseFloat(x) / parseFloat(y);
//   } else {
//     const result = 0;
//   }
//
//   res.end(`
//     ${x} / ${y} = ${result}
//     `);
// }
//
// function fallback(req, res, next) {
//   const operatorURL = url.parse(req.url, true).pathname;
//   res.end(`You entered the invalid method: ${operatorURL}`);
//   res.end();
// }
//
// app.use('/add', add);
// app.use('/subtract', subtract);
// app.use('/multiply', multiply);
// app.use('/divide', divide);
// app.use(fallback);
//
// app.listen(3000);
