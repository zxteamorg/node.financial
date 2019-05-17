# Function reference

## Functions

Function | Description
---- | -----------
[Financial.add(left, right)](functions.md#function-add) | Add two values, left + right.
[Financial.equals(left, right)](functions.md#function-equals) | Check equality of two Financial.
[Financial.fromFloat(value, fractionDigits)](functions.md#function-fromFloat) | Create Financial instance from value is float and fraction.
[Financial.fromInt(value)](functions.md#function-fromInt) | Create Financial instance from integer.
[Financial.fromString(value)](functions.md#function-fromString) | Create Financial instance from string.
[Financial.gt(left, right)](functions.md#function-gt) | The greater than function returns true if the left operand is greater than the right operand (left > right).
[Financial.gte(left, right)](functions.md#function-gte) | The greater than or equal function returns true if the left operand is greater than or equal to the right operand (left >= right).
[Financial.isFinancial(probablyFinancal)](functions.md#function-isFinancial) | The method determines whether an object is an Financial.
[Financial.isZero(num)](functions.md#function-isZero) | Check whether a value as Financial is zero.
[Financial.mod(left, right)](functions.md#function-mod) | Function returns only the remainder. (as similar operator %)


[Financial.plus(left, right)](functions.md#function-plus) | Add two values, left + right.


## Examples
You can see a lot of examples in unit tests. [Link to tests.](../test/Examples.test.ts)

#### Function add
Add two values, left + right.
##### Syntax
```JAVASCRIPT
const result: Financial = Financial.add(left: Financial, right: Financial);
```
##### Examples
```JAVASCRIPT
const left = financial("200.3");
const right = financial("600.5");
const result = Financial.add(left, right); // return Financial
console.log(result.toString());            // "800.8"
console.log(result.toFloat());             // 800.8
```

#### Function equals
Check equality of two Financial.
##### Syntax
```JAVASCRIPT
const result: Boolean = Financial.equals(left: Financial, right: Financial);
```
##### Example
```JAVASCRIPT
const left = financial("200.3");
const right = financial("600.5");
const result = Financial.equals(left, right); // return boolean
console.log(result);                          // false

```

#### Function fromFloat
Create Financial instance from value is float and fraction.
##### Syntax
```JAVASCRIPT
const result: Financial = Financial.fromFloat(value: number, fractionDigits: number);
```
##### Example
```JAVASCRIPT
const value = 150.55;
const fraction = 2;
const simpleFinancial = Financial.fromFloat(value, fraction);
console.log(simpleFinancial.toString());  // "150.55"
console.log(simpleFinancial.toFloat());   // 150.55
```

#### Function fromInt
Create Financial instance from integer.
##### Syntax
```JAVASCRIPT
const result: Financial = Financial.fromInt(value: number);
```
##### Example
```JAVASCRIPT
const value = 42;
const simpleFinancial = Financial.fromInt(value);
console.log(simpleFinancial.toString()); // "42"
console.log(simpleFinancial.toInt());    // 42
```






#### Function fromString
Create Financial instance from String.
##### Syntax
```JAVASCRIPT
const result: Financial = Financial.fromString(value: string);
```
##### Example
```JAVASCRIPT
const value = "101.5";
const simpleFinancial = Financial.fromString(value);
console.log(simpleFinancial.toString());   // "101.5"
console.log(simpleFinancial.toFloat());    // 101.5
```

#### Function gt
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

#### Function gte
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

#### Function isFinancial
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

#### Function isZero
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

#### Function mod
Function returns only the remainder (as similar operator %).
##### Syntax
```JAVASCRIPT
const result: Financial = mod(left: Financial, right: Financial);
```
##### Example
```JAVASCRIPT

```


#### Function plus
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

#### Function minus
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


#### Function multiply	
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

#### Function divide
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

