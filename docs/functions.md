# (DEPRECATED) Function reference

## Functions

Function | Description
---- | -----------
[financial.add(left, right)](functions.md#function-add) | Add two values, left + right.
[financial.divide(left, right)](functions.md#function-divide) | Divide two values, left / right.
[financial.equals(left, right)](functions.md#function-equals) | Check equality of two Financial.
[financial.fromFloat(value, fractionDigits)](functions.md#function-fromFloat) | Create Financial instance from value is float and fraction.
[financial.fromInt(value)](functions.md#function-fromInt) | Create Financial instance from integer.
[financial.gt(left, right)](functions.md#function-gt) | The greater than function returns true if the left operand is greater than the right operand (left > right).
[financial.gte(left, right)](functions.md#function-gte) | The greater than or equal function returns true if the left operand is greater than or equal to the right operand (left >= right).
[financial.isFinancial(probablyFinancal)](functions.md#function-isFinancial) | The method determines whether an object is an financial.
[financial.isZero(num)](functions.md#function-isZero) | Check whether a value as Financial is zero.
[financial.lt(left, right)](functions.md#function-lt) | The less than function returns true if the left operand is less than the right operand (left < right).
[financial.lte(left, right)](functions.md#function-lte) | The less than or equal function returns true if the left operand is less than or equal to the right operand (left <= right).
[financial.mod(left, right)](functions.md#function-mod) | Function returns only the remainder. (as similar operator %)
[financial.parse(value)](functions.md#function-parse) | Create Financial from string.
[financial.round(num, fraction)](functions.md#function-round) | Round a value towards the nearest integer.
[financial.subtract(left, right)](functions.md#function-subtract) | Subtract two values, left - right.
[financial.toFloat(num)](functions.md#function-toFloat) | Financial convert to float and return number.
[financial.toInt(num)](functions.md#function-toInt) | Financial convert to Int and return number.
[financial.toString(num)](functions.md#function-toString) | Financial convert to String and return string.
[financial.truncDown(num, fraction)](functions.md#function-truncDown) | Round a value down towards the nearest integer.
[financial.truncUp(num, fraction)](functions.md#function-truncUp) | Round a value up towards the nearest integer.
[financial.wrap(num)](functions.md#function-wrap) |  Create financial from Financial interface.


## Examples
You can see a lot of examples in unit tests. [Link to tests.](../test/Examples.test.ts)

### Function add
Add two values, left + right.
##### Syntax
```JAVASCRIPT
financial.add(left, right);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
left | Financial &#124; string | First value to add
right | Financial &#124; string | Second value to add
##### Returns
Type | Description
----|----
 Financial &#124; string | Sum of left and right
##### Examples

### Function divide
Divide two values, left / right.
##### Syntax
```JAVASCRIPT
financial.divide(left, right);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
left | Financial &#124; string | Numerator
right | Financial &#124; string | Denominator
##### Returns
Type | Description
----|----
Financial &#124; string | Quotient, left / right.
##### Example
[Link to unit test.](../test/example/divide.test.ts)
```JAVASCRIPT
const left = financial("500");
const right = financial("10");
const result = Financial.divide(left, right);    // return Financial
console.log(result.toString());                  // "50"
console.log(result.toFloat());                   // 50
```


[Link to unit test.](../test/example/add.test.ts)
```JAVASCRIPT
const left = financial.parse("200.3");
const right = financial.parse("600.5");
const result = financial.add(left, right); // return Financial
console.log(result.toString());            // "800.8"
console.log(result.toFloat());             // 800.8

financial.add("200.3", "600.5");           // return string "800.8"
```

### Function equals
Check equality of two Financial.
##### Syntax
```JAVASCRIPT
financial.equals(left, right);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
left | Financial &#124; string | First value to compare
right | Financial &#124; string | Second value to compare
##### Returns
Type | Description
----|----
 Financial &#124; string | Returns true when the compared values are equal, else returns false
##### Example
[Link to unit test.](../test/example/equals.test.ts)
```JAVASCRIPT
const left = financial.parse("200.3");
const right = financial.parse("600.5");
const result = financial.equals(left, right); // return boolean
console.log(result);                          // false

financial.equals("200.3", "600.5");           // false
```

### Function fromFloat
Create Financial instance from value is float and fraction.
##### Syntax
```JAVASCRIPT
financial.fromFloat(value, fractionDigits);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
value | number | Value to convert to instance Financial
fractionDigits | number | Decimal places
##### Returns
Type | Description
----|----
 Financial | Instance Financial
##### Example
[Link to unit test.](../test/example/fromFloat.test.ts)
```JAVASCRIPT
const value = 150.55;
const fraction = 2;
const simpleFinancial = financial.fromFloat(value, fraction);
console.log(simpleFinancial.toString());  // "150.55"
console.log(simpleFinancial.toFloat());   // 150.55
```

### Function fromInt
Create Financial instance from integer.
##### Syntax
```JAVASCRIPT
financial.fromInt(value: number);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
value | number | Value to convert to instance Financial
##### Returns
Type | Description
----|----
 Financial | Instance Financial
##### Example
[Link to unit test.](../test/example/fromInt.test.ts)
```JAVASCRIPT
const value = 42;
const simpleFinancial = Financial.fromInt(value);
console.log(simpleFinancial.toString());        // "42"
console.log(simpleFinancial.toInt());           // 42
```


### Function gt
The greater than operator returns true if the left operand is greater than the right operand (left > right)
##### Syntax
```JAVASCRIPT
financial.gt(left, right);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
left | Financial &#124; string | First value to compare
right | Financial &#124; string | Second value to compare
##### Returns
Type | Description
----|----
 boolean | The greater than function returns true if the left is greater than the right
##### Example
[Link to unit test.](../test/example/gt.test.ts)
```JAVASCRIPT
const left = financial("200.3");
const right = financial("600.5");
const result = financial.gt(left, right); // left > right = false
console.log(result);                      // false
```

### Function gte
The greater than or equal function returns true if the left operand is greater than or equal to the right operand (left >= right).
##### Syntax
```JAVASCRIPT
financial.gte(left, right);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
left | Financial &#124; string | First value to compare
right | Financial &#124; string | Second value to compare
##### Returns
Type | Description
----|----
 boolean | The greater than or equal function returns true if the left is greater than or equal to the right
##### Example
[Link to unit test.](../test/example/gte.test.ts)
```JAVASCRIPT
const left = financial("200.3");
const right = financial("600.5");
const result = financial.gte(left, right); // left >= right = false
console.log(result);                       // false
```

### Function isFinancial
The method determines whether an object is an Financial.
##### Syntax
```JAVASCRIPT
financial.isFinancial(probablyFinancal);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
probablyFinancal | any | value for check
##### Returns
Type | Description
----|----
 boolean | true if the value is Financial; otherwise, false.
##### Example
[Link to unit test.](../test/example/isFinancial.test.ts)
```JAVASCRIPT
const financialLike = { value: "5", fraction: 0 };
const financialFake = {};
const resultTrue = financial.isFinancial(financialLike);
const resultFalse = financial.isFinancial(financialFake);
console.log(resultTrue);  // true
console.log(resultFalse); // false
```

### Function isZero
Check whether a value as Financial is zero.
##### Syntax
```JAVASCRIPT
financial.isZero(num: Financial);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
num | Financial &#124; string | value need to check for zero
##### Returns
Type | Description
----|----
 boolean | true if the value is zero; otherwise, false.
##### Example
[Link to unit test.](../test/example/isZero.test.ts)
```JAVASCRIPT
const zero = { value: "0", fraction: 0 };
const isZero = financial.isZero(zero);
console.log(isZero);          // true
```

### Function lt
The less than function returns true if the left operand is less than the right operand (left < right).
##### Syntax
```JAVASCRIPT
financial.lt(left, right);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
left | Financial &#124; string | First value to compare
right | Financial &#124; string | Second value to compare
##### Returns
Type | Description
----|----
 boolean | The less than function returns true if the left operand is less than the right operand.
##### Example
[Link to unit test.](../test/example/lt.test.ts)
```JAVASCRIPT
const left = financial("200.3");
const right = financial("600.5");
const result = financial.lt(left, right); // left < right = true
console.log(result);                      // true
```

### Function lte
The less than or equal function returns true if the left operand is less than or equal to the right operand (left <= right).
##### Syntax
```JAVASCRIPT
financial.lte(left, right);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
left | Financial &#124; string | First value to compare
right | Financial &#124; string | Second value to compare
##### Returns
Type | Description
----|----
 boolean | The less than or equal function returns true if the left operand is less than or equal to the right operand.
##### Example
[Link to unit test.](../test/example/lte.test.ts)
```JAVASCRIPT
const left = financial("200.3");
const right = financial("600.5");
const result = financial.lte(left, right); // left <= right = true
console.log(result);                       // true
```

### Function mod
Function returns only the remainder (as similar operator %).
##### Syntax
```JAVASCRIPT
financial.mod(left, right);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
left | Financial &#124; string | Dividend
right | Financial &#124; string | Divisor
##### Returns
Type | Description
----|----
Financial &#124; string | Function returns only the remainder (as similar operator %).
##### Example
[Link to unit test.](../test/example/mod.test.ts)
```JAVASCRIPT
const left = financial.parse("8");
const right = financial.parse("3");
const result = financial.mod(left, right); // return Financial
console.log(result.toString());            // "2"
console.log(result.toFloat());             // 2
```

### Function multiply
Multiply two values, left * right.
##### Syntax
```JAVASCRIPT
financial.multiply(left, right);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
left | Financial &#124; string | First value to multiply
right | Financial &#124; string | Second value to multiply
##### Returns
Type | Description
----|----
Financial &#124; string | Multiplication of left and right.
##### Example
[Link to unit test.](../test/example/multiply.test.ts)
```JAVASCRIPT
const left = financial("10");
const right = financial("2");
const result = financial.multiply(left, right);  // return Financial
console.log(result.toString());                  // "20"
console.log(result.toFloat());                   // 20
```


### Function parse
Create Financial instance from String.
##### Syntax
```JAVASCRIPT
financial.parse(value);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
value | string | Value to convert to instance Financial
##### Returns
Type | Description
----|----
 Financial | Instance Financial
##### Example
[Link to unit test.](../test/example/parse.test.ts)
```JAVASCRIPT
const value = "101.5";
const simpleFinancial = Financial.parse(value);
console.log(simpleFinancial.toString());   // "101.5"
console.log(simpleFinancial.toFloat());    // 101.5
```

### Function round
Round a value towards the nearest integer.
##### Syntax
```JAVASCRIPT
financial.round(num, fraction);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
num | Financial &#124; string | Number to be rounded
fraction | number | Number of decimals
##### Returns
Type | Description
----|----
 Financial &#124; string | Rounded value
##### Example
[Link to unit test.](../test/example/round.test.ts)
```JAVASCRIPT
const num = financial.parse("100.126");
const fraction = 2;
const result = financial.round(num, fraction); // return Financial
console.log(result.toString());                // "100.13"
console.log(result.toFloat());                 // 100.13
```

### Function subtract
Subtract two values, left - right.
##### Syntax
```JAVASCRIPT
financial.subtract(left, right);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
left | Financial &#124; string | Initial value
right | Financial &#124; string | Value to subtract from left
##### Returns
Type | Description
----|----
 Financial &#124; string | Subtraction of left and right
##### Example
[Link to unit test.](../test/example/subtract.test.ts)
```JAVASCRIPT
const left = financial.parse("500");
const right = financial.parse("250");
const result = financial.subtract(left, right); // return Financial
console.log(result.toString());                 // "250"
console.log(result.toFloat());                  // 250
```

### Function toFloat
Financial convert to float and return number.
##### Syntax
```JAVASCRIPT
financial.toFloat(num);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
num | Financial | Financial
##### Returns
Type | Description
----|----
 number | Financial convert to float and return number.
##### Example
[Link to unit test.](../test/example/toFloat.test.ts)
```JAVASCRIPT
const num = financial.parse("100.12");
const result = financial.toFloat(num);   // return number
console.log(result);                     // 100.12
```

### Function toInt
Financial convert to Int and return number.
##### Syntax
```JAVASCRIPT
financial.toInt(num);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
num | Financial | Financial
##### Returns
Type | Description
----|----
 number | Financial convert to Int and return number.
##### Example
[Link to unit test.](../test/example/toInt.test.ts)
```JAVASCRIPT
const num = financial.parse("100.12");
const result = financial.toInt(num);   // return number
console.log(result);                   // 100
```

### Function toString
Financial convert to String and return string.
##### Syntax
```JAVASCRIPT
financial.toString(num);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
num | Financial | Financial
##### Returns
Type | Description
----|----
 number | Financial convert to String and return string.
##### Example
[Link to unit test.](../test/example/toString.test.ts)
```JAVASCRIPT
const num = financial.parse("100.12");
const result = financial.toString(num);   // return string
console.log(result);                      // "100.12"
```

### Function truncDown
Round a value down towards the nearest integer.
##### Syntax
```JAVASCRIPT
financial.truncDown(num, fraction);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
num | Financial &#124; string | Number to be rounded
fraction | number | Number of decimals
##### Returns
Type | Description
----|----
 Financial &#124; string | Rounded value
##### Example
[Link to unit test.](../test/example/truncDown.test.ts)
```JAVASCRIPT
const num = financial.parse("100.129");
const fraction = 2;
const result = financial.truncDown(num, fraction); // return Financial
console.log(result.toString());                    // "100.12"
console.log(result.toFloat());                     // 100.12
```

### Function truncUp
Round a value up towards the nearest integer.
##### Syntax
```JAVASCRIPT
financial.truncUp(num, fraction);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
num | Financial &#124; string | Number to be rounded
fraction | number | Number of decimals
##### Returns
Type | Description
----|----
 Financial &#124; string | Rounded value
##### Example
[Link to unit test.](../test/example/truncUp.test.ts)
```JAVASCRIPT
const num = financial.parse("100.121");
const fraction = 2;
const result = financial.truncUp(num, fraction); // return Financial
console.log(result.toString());                  // "100.13"
console.log(result.toFloat());                   // 100.13
```

### Function wrap
Create financial from Financial interface.
##### Syntax
```JAVASCRIPT
financial.wrap(value);
```
##### Parameters
Parameter | Type | Description
---- | ----------- | ----
value | string | Value convert to instance Financial
##### Returns
Type | Description
----|----
 Financial | Instance Financial
##### Example
[Link to unit test.](../test/example/wrap.test.ts)
```JAVASCRIPT
const value = "1015";
const fraction = 1;
const result = financial.wrap({ value, fraction }); // return Financial
console.log(result.toString());                     // "101.5"
console.log(result.toFloat());                      // 101.5
```
