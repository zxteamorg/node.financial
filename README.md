# DEPRECATED 

The project has been moved to https://github.com/freemework/decimal/tree/src-typescript-bignumberjs

# ZXTeam's Financial
[![npm version badge](https://img.shields.io/npm/v/@zxteam/financial.svg)](https://www.npmjs.com/package/@zxteam/financial)
[![downloads badge](https://img.shields.io/npm/dm/@zxteam/financial.svg)](https://www.npmjs.org/package/@zxteam/financial)
[![commit activity badge](https://img.shields.io/github/commit-activity/m/zxteamorg/node.financial)](https://github.com/zxteamorg/node.financial/pulse)
[![last commit badge](https://img.shields.io/github/last-commit/zxteamorg/node.financial)](https://github.com/zxteamorg/node.financial/graphs/commit-activity)
[![twitter badge](https://img.shields.io/twitter/follow/zxteamorg?style=social&logo=twitter)](https://twitter.com/zxteamorg)

Financial is a data type for storing decimal values and manipulate its via mathematical functions according infinite-precision arithmetic. It should be used when it is important to preserve exact precision, for example with monetary data.

###### Problems of JavaScript [IEEE 754 floating point numbers](https://en.wikipedia.org/wiki/IEEE_754).
##### Approximation
```javascript
const totalMoney = 600.9;
const pricePerItem = 200.3;
const totalSpent = pricePerItem * 3;

console.log(totalMoney === totalSpent); // false (while expected true)
console.log(totalSpent); // 600.9000000000001
```
##### Digits limit
```javascript
const left = parseInt("123456789012345678901234567890");
const right = parseInt("1");
const result = left + right;
console.log(result); // 1.2345678901234568e+29 (while expected 123456789012345678901234567891)
```

### Examples

You can see a lot of examples in unit tests. Here we show some points only.

### Avoid approximation

```javascript
const { financial } = require("@zxteam/financial");

const totalMoney = financial.fromFloat(600.90, 2);
const pricePerItem = financial.fromFloat(200.30, 2);
const buyItems = financial.fromInt(3);
const totalSpent = financial.multiply(pricePerItem, buyItems);

console.log(financial.equalsTo(totalMoney, totalSpent)); // true
console.log(financial.toString(totalSpent));             // 600.9
```
### Avoid digits limit

```javascript
import { financial } from "@zxteam/financial";

const left = "123456789012345678901234567890";
const right = "1";
const result = financial.plus(left, right);
console.log(result); // 123456789012345678901234567891
```

## Documentation
- [Getting Started](docs/getting-started.md)
- [Examples](docs/functions.md#examples)
- [Overview](docs/functions.md)

## Build
```bash
npm install
npm run build
```

This will build the library and put them in the folder .dist

## Test
To execute tests for the library, install the project dependencies once:
```bash
npm install
npm run build
npm run test
```
