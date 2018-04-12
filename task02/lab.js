const sample_input = "mul 3 sub 2 sum 1 3 4";

// map input to strings based on space input and remove 0-length strings
const lex = str => str.split(' ').map(s => s.strip()).filter(s => s.length);

const Op = Symbol('op');
const Num = Symbol('num');

const parse = tokens =>
{
  let index = 0;
  const peek = () => tokens[index];
  const consume = () => tokens[index++];

  const parseNum = () => ({ value: parseInt(consume()), type: Num });

  const parseOp = () =>
  {
    const node = { val: consume(), type: Op, expr: [] };
    while (peek()) node.expr.push(parseExpr());
    return node;
  };

  const parseExpr = () => /\d/.test(peek()) ? parseNum() : parseOp();
  return parseExpr();
};
