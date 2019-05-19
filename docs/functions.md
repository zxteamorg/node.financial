# Function reference

## Functions

Function | Description
---- | -----------
[financial.add(left, right)](functions.md#function-add) | Add two values, left + right.
[financial.equals(left, right)](functions.md#function-equals) | Check equality of two Financial.
[financial.fromFloat(value, fractionDigits)](functions.md#function-fromFloat) | Create Financial instance from value is float and fraction.
[financial.fromInt(value)](functions.md#function-fromInt) | Create Financial instance from integer.
[financial.parse(value)](functions.md#function-parse) | Create Financial instance from string.
[financial.gt(left, right)](functions.md#function-gt) | The greater than function returns true if the left operand is greater than the right operand (left > right).
[financial.gte(left, right)](functions.md#function-gte) | The greater than or equal function returns true if the left operand is greater than or equal to the right operand (left >= right).
[financial.isFinancial(probablyFinancal)](functions.md#function-isFinancial) | The method determines whether an object is an financial.
[financial.isZero(num)](functions.md#function-isZero) | Check whether a value as Financial is zero.
[financial.mod(left, right)](functions.md#function-mod) | Function returns only the remainder. (as similar operator %)


[financial.plus(left, right)](functions.md#function-plus) | Add two values, left + right.


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

### Function fromString
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

### Function gt
The greater than operator returns true if the left operand is greater than the right operand (left > right).
##### Syntax
```JAVASCRIPT
const result: boolean = Financial.gt(left: Financial, right: Financial);
```
##### Example
```JAVASCRIPT
const left = financial("200.3");
const right = financial("600.5");
const result = Financial.gt(left, right); // left > right = false
console.log(result);                      // false
```

### Function gte
The greater than or equal operator returns true if the left operand is greater than or equal to the right operand (left >= right).
##### Syntax
```JAVASCRIPT
const result: boolean = Financial.gte(left: Financial, right: Financial);
```
##### Example
```JAVASCRIPT
const left = financial("200.3");
const right = financial("600.5");
const result = Financial.gte(left, right); // left >= right = false
console.log(result);                       // false
```

### Function isFinancial
The method determines whether an object is an Financial.
##### Syntax
```JAVASCRIPT
const result: boolean = isFinancial(probablyFinancal: any);
```
##### Example
```JAVASCRIPT
const financialLike = { value: "5", fraction: 0 };
const financialFake = {};
const resultTrue = Financial.isFinancial(financialLike);
const resultFalse = Financial.isFinancial(financialFake);
console.log(resultTrue);  // true
console.log(resultFalse); // false
```

### Function isZero
Check whether a value as Financial is zero.
##### Syntax
```JAVASCRIPT
const result: boolean = isZero(num: Financial);
```
##### Example
```JAVASCRIPT
const zero = { value: "0", fraction: 0 };
const isZero = Financial.isZero(zero);
console.log(isZero);          // true
```

### Function mod
Function returns only the remainder (as similar operator %).
##### Syntax
```JAVASCRIPT
const result: Financial = mod(left: Financial, right: Financial);
```
##### Example
```JAVASCRIPT

```


### Function plus
Add two values, left + right.
##### Syntax
```JAVASCRIPT
const result: Financial = Financial.plus(left: Financial, right: Financial);
```
##### Example
```JAVASCRIPT
const left = financial("200.3");
const right = financial("600.5");
const result = Financial.plus(left, right);		// return Financial
console.log(result.toString());					// "800.8"
console.log(result.toFloat());					// 800.8
```

### Function minus
Minus two values, left - right.
##### Syntax
```JAVASCRIPT
const result: Financial = Financial.minus(left: Financial, right: Financial);
```
##### Example
```JAVASCRIPT
const left = financial("500.5");
const right = financial("250.7");
const result = Financial.minus(left, right);		// return Financial
console.log(result.toString());						// "249.8"
console.log(result.toFloat());						// 249.8
```


### Function multiply	
Multiply two values, left * right.
##### Syntax
```JAVASCRIPT
const result: Financial = Financial.multiply(left: Financial, right: Financial);
```
##### Example
```JAVASCRIPT
const left = financial("357.5");
const right = financial("2.5");
const result = Financial.multiply(left, right);		// return Financial
console.log(result.toString());						// "893.75"
console.log(result.toFloat());						// 893.75
```

### Function divide
Divide two values, left / right.
##### Syntax
```JAVASCRIPT
const result: Financial = Financial.divide(left: Financial, right: Financial);
```
##### Example
```JAVASCRIPT
const left = financial("500");
const right = financial("10");
const result = Financial.divide(left, right);		// return Financial
console.log(result.toString());						// "50"
console.log(result.toFloat());						// 50
```

