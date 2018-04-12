const sample_input = "mul 3 sub 2 sum 1 3 4";

// map input to strings based on space input and remove 0-length strings
const lex = str => str.split(' ').map(s => s.strim()).filter(s => s.length);

const Op = Symbol('Operator');
const Num = Symbol('Number');
