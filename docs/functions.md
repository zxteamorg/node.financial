# Function reference

## Functions

Function | Description
---- | -----------
[Financial.add(left, right)](functions.md#function-add) | Add two values, left + right.
[Financial.plus(left, right)](functions.md#function-plus) | Add two values, left + right.
[Financial.equals(left, right)](functions.md#function-equals) | Check equality of two Financial

## Example

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
const result = Financial.add(left, right);		// return Financial
console.log(result.toString());					// "800.8"
console.log(result.toFloat());					// 800.8
```

#### Function equals
Check equality of two Financial.
##### Syntax
```JAVASCRIPT
const result: Boolean = Financial.equals(left: Financial, right: Financial);
```
##### Examples
```JAVASCRIPT
const left = financial("200.3");
const right = financial("600.5");
const result = Financial.equals(left, right);		// return Boolean
console.log(result);								// false
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

