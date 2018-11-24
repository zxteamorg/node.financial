# Financial.JS

Finance JS is a data type for storing decimal values and manipulate its via mathematical functions according infinite-precision arithmetic. It should be used when it is important to preserve exact precision, for example with monetary data.

## Problems of JavaScript [IEEE 754 floating point numbers](https://en.wikipedia.org/wiki/IEEE_754).
### Approximation
```
const totalMoney = 600.90;
const pricePerItem = 200.30;
const totalSpent = pricePerItem * 3;

console.log(totalMoney === totalSpent); // false (while expected true)
console.log(totalSpent); // 600.9000000000001
```
### Digits limit
```
const first = parseInt("123456789012345678901234567890");
const second = parseInt("1");
const result = first + second;
console.log(result); // 1.2345678901234568e+29 (not 123456789012345678901234567891)
```

## Examples
You can see a lot of examples in unit tests. Here we show some points only.
### Avoid approximation
```
import financial from "financial.js";

const totalMoney = financial(600.90, 2);
const pricePerItem = financial(200.30, 2);
const buyItems = financial(3);
const totalSpent = pricePerItem.multiply(buyItems);

console.log(totalMoney.equalsTo(totalSpent)); // true
console.log(totalSpent.toString()); // 600.90
```
### Avoid digits limit
```
import financial from "financial.js";

const first = financial("123456789012345678901234567890");
const second = financial("1");
const result = first.plus(second);
console.log(result.toString()); // 123456789012345678901234567891
```
