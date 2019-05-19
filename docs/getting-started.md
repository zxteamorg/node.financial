# Getting Started
This getting started describes how to install, load, and use @zxteam/financial.js.

## Install
Financial.js can be installed using various package managers like npm.

To install via npm, run:
```BASH
npm install @zxteam/financial.js
```

## Load
Financial.js can be used in node.js.
```JAVASCRIPT
// load financial.js
import { financial } from "@zxteam/financial.js";

// use financial.js through string value
const leftStr = "10";
const rightStr = "2";

const plusStr = financial.plus(leftStr, rightStr);
console.log(plusStr); // "12"

const minusStr = financial.minus(leftStr, rightStr);
console.log(minusStr); // "8"

const multiplyStr = financial.multiply(leftStr, rightStr);
console.log(multiplyStr); // "20"

const divideStr = financial.divide(leftStr, rightStr);
console.log(divideStr); // "5"

// use financial.js through financial class
const left = financial.fromInt("10");
const right = financial.fromInt("2");

const plus = financial.plus(left, right);
console.log(financial.toString(plus)); // "12"

const minus = financial.minus(left, right);
console.log(financial.toString(minus)); // "8"

const multiply = financial.multiply(left, right);
console.log(financial.toString(multiply)); // "20"

const divide = financial.divide(left, right);
console.log(financial.toString(divide)); // "5"
```
