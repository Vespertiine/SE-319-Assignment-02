# S E 319 | Assignment 02 [Due: 2018-04-24]

## Task 1: Calculators

Create two calculators based on the provided code in [ExerciseHelp](./doc/prof-help/), one for binary and one for decimal.

### Specification (Binary)
1. Note that for some options on the binary calculator, it may be more convenient to convert the binary numbers to integers and then do the operation.
2. You can assume that only positive binary numbers are represented and used. For example, positive 9 is 1001.
3. (2 pts) | Binary operator [+] represents plus operation.
4. (2 pts) | Binary operator [\*] represents multiply operation.
5. (2 pts) | Binary operator [/] represents division operation.
6. (2 pts) | Binary operator [%] represents modular division operation.
7. (2 pts) | Unary operator [<<] represents bit-shift left operation.
8. (2 pts) | Unary operator [>>] represents bit-shift right operation.
9. (2 pts) | Binary operator [&] represents AND operation.
10. (2 pts) | Binary operator [|] represents OR operation.
11. (2 pts) | Unary operator [~] represents NOT operation.

### Specification (Decimal)
1. (2 pts/op, 8 pts) | Binary operators [+], [-], [\*], and [/] represent plus, minus, multiply, and division operations respectively.
2. (3 pts) | Symbol [.] should be used for operations with decimals.
3. (3 pts) | Support negative operations.
4. Assume that calculator will operate left to right.

### Checklist
- [ ] File names ``calculator.js`` and ``calculatorBinary.js``.
- [x] Relative paths in all files.
- [x] Semantic naming of objects and JavaScript functions.
- [x] (2 pts/display, 4 pts) | Display both calculators correctly.
- [x] (3 pts) | MR Operation: Show memory value on screen.
- [ ] (3 pts) | MC Operation: Clear memory value.
- [ ] (2 pts) | M+ Operation: Display gets added to memory.
- [ ] (2 pts) | M- Operation: Display gets subtracted from memory.
- [ ] (2 pts) | C Operation: Clear screen value and last operation ([=] will not repeat op.)
- [x] Variables should not be singletons.

### Submission
- Verify function in Chrome browser.
- Submit ``.zip`` containing ``lab.html``, ``calculator.js``, ``calculatorBinary.js``, and ``README.md``.

## Task 2: Lexer and Parser

Develop a Lexcial Analyzer and a Parser in JavaScript using the template. Show output and accept input in browser.

### (15 pts) | Specification: Lexer

Input: ``mul 6 sub 4 sum 7 3 4``.
Output: ``["mul", "6", "sub", "4", "sum", "7", "3", "4"]``

```javascript
{
  "type": Symbol("Operator"),
  "value": "-"
}
```

### (15 pts) | Specification: Parser

Example:
```javascript
const tokens = ["sub", "3", "sum", "2", "4", "5"];
```
Expected tree:
```
  sub
 /   \
3    sum
     /|\
    2 4 5
```

Provided grammar used to parse input token:
```
  num   :=  0-9+
  op    :=  sum | sub | div | mul
  expr  :=  num | op expr+
```

### (5 pts) | Specification: Evaluator
- [x] Visit each node.
  - [x] Return corresponding value (if node is number type);
  - [x] Perform operation (if node is operation type).

### (5 pts) | Specification: Code Generator
- [x] Translate input into another language.

### (5 pts) | Specifiction: Interpreter
- [x] Perform instructions written in another language without requiring previous compilation.

### (5 pts) | Specification: Compiler
- [ ] Perform instructions written in a compiled language.

#### Example:
**Input:** ``mul 5 sub 2 sum 7 2 9``
**Output:**
```
-80
(5 * (2 - (7 + 2 + 9)))
```

### Submission
- Verify function in Chrome browser.
- Submit a ``.zip`` containing files and a README.
