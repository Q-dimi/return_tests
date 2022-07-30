var type = require('./tests/type');
var value = require('./tests/value');
var regex = require('./tests/regex');
var greaterThan = require('./tests/greaterThan');
var lessThan = require('./tests/lessThan');
var inRange = require('./tests/inRange');
var isEvenOrOdd = require('./tests/isEvenOrOdd');
var isDivisibleBy = require('./tests/isDivisibleBy');
var isOfLength = require('./tests/isOfLength');
var lengthGreaterThan = require('./tests/lengthGreaterThan');
var lengthLessThan = require('./tests/lengthLessThan');
var primeOrNot = require('./tests/primeOrNot');
var logOf = require('./tests/logOf');

function suite(test, return_value, i, j) {
 return { 
  value: typeof(test.unit.must_be_value) === 'object' && test.unit.must_be_value !== null ? value(test, return_value, i, j) : 'PASSED',
  type: typeof(test.unit.must_be_type) === 'object' && test.unit.must_be_type !== null ? type(test, return_value, i, j) : 'PASSED',
  regex: typeof(test.unit.must_pass_regex) === 'object' && test.unit.must_pass_regex !== null ? regex(test, return_value, i, j) : 'PASSED',
  greaterThan: typeof(test.unit.must_be_greater_than) === 'object' && test.unit.must_be_greater_than !== null ? greaterThan(test, return_value, i, j) : 'PASSED',
  lessThan: typeof(test.unit.must_be_less_than) === 'object' && test.unit.must_be_less_than !== null ? lessThan(test, return_value, i, j) : 'PASSED',
  inRange: typeof(test.unit.must_be_in_range) === 'object' && test.unit.must_be_in_range !== null ? inRange(test, return_value, i, j) : 'PASSED',
  isEvenOrOdd: typeof(test.unit.must_be_even_or_odd) === 'object' && test.unit.must_be_even_or_odd !== null ? isEvenOrOdd(test, return_value, i, j) : 'PASSED',
  isDivisibleBy: typeof(test.unit.must_be_divisible_by) === 'object' && test.unit.must_be_divisible_by !== null ? isDivisibleBy(test, return_value, i, j) : 'PASSED',
  isOfLength: typeof(test.unit.must_be_length) === 'object' && test.unit.must_be_length !== null ? isOfLength(test, return_value, i, j) : 'PASSED',
  lengthGreaterThan: typeof(test.unit.must_be_greater_than_length) === 'object' && test.unit.must_be_greater_than_length !== null ? lengthGreaterThan(test, return_value, i, j) : 'PASSED',
  lengthLessThan: typeof(test.unit.must_be_less_than_length) === 'object' && test.unit.must_be_less_than_length !== null ? lengthLessThan(test, return_value, i, j) : 'PASSED',
  primeOrNot: typeof(test.unit.must_be_prime_or_not_prime) === 'object' && test.unit.must_be_prime_or_not_prime !== null ? primeOrNot(test, return_value, i, j) : 'PASSED',
  logOf: typeof(test.unit.must_be_log_of) === 'object' && test.unit.must_be_log_of !== null ? logOf(test, return_value, i, j) : 'PASSED'
 };
}

module.exports = suite;