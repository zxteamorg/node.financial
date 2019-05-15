## Financial.JS

Finance JS is a data type for storing decimal values and manipulate its via mathematical functions according infinite-precision arithmetic. It should be used when it is important to preserve exact precision, for example with monetary data.

###### Problems of JavaScript [IEEE 754 floating point numbers](https://en.wikipedia.org/wiki/IEEE_754).
##### Approximation
```JAVASCRIPT
const totalMoney = 600.9;
const pricePerItem = 200.3;
const totalSpent = pricePerItem * 3;

console.log(totalMoney === totalSpent); // false (while expected true)
console.log(totalSpent); // 600.9000000000001
```
##### Digits limit
```JAVASCRIPT
const left = parseInt("123456789012345678901234567890");
const right = parseInt("1");
const result = left + right;
console.log(result); // 1.2345678901234568e+29 (while expected 123456789012345678901234567891)
```

### Usage

#### Load financial.js in node.js:
```JAVASCRIPT
// load financial.js
import { financial, Financial } from "@zxteam/financial.js";
```

#### Function plus
Add two values, left + right.
##### Syntax
```JAVASCRIPT
const result: Financial = Financial.plus(left: Financial, right: Financial);
```
##### Examples
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
##### Examples
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
##### Examples
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
##### Examples
```JAVASCRIPT
const left = financial("500");
const right = financial("10");
const result = Financial.divide(left, right);		// return Financial
console.log(result.toString());						// "50"
console.log(result.toFloat());						// 50
```

## Examples
You can see a lot of examples in unit tests. Here we show some points only.
### Avoid approximation
```JAVASCRIPT
import { financial, Financial } from "financial.js";

const totalMoney = financial(600.90, 2);
const pricePerItem = financial(200.30, 2);
const buyItems = financial(3);
const totalSpent = Financial.multiply(pricePerItem, buyItems);

console.log(Financial.equalsTo(totalMoney, totalSpent)); // true
console.log(totalSpent.toString()); // 600.9
```
### Avoid digits limit
```JAVASCRIPT
import { financial, Financial } from "@zxteam/financial.js";

const left = financial("123456789012345678901234567890");
const right = financial("1");
const result = Financial.plus(left, right);
console.log(result.toString()); // 123456789012345678901234567891
```
