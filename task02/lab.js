const lex = str => str.split(' ').map(s => s.trim()).filter(s => s.length);

const Op = Symbol('op');
const Num = Symbol('num');

const parse = tokens =>
{
  let index = 0;
  const peek = () => tokens[index];
  const consume = () => tokens[index++];

  const parseNum = () => ({ val: parseInt(consume()), type: Num });

  const parseOp = () => {
    const node = { val: consume(), type: Op, expr: [] };
    while (peek()) node.expr.push(parseExpr());
    return node;
  };

  // if element is num (\d) parseNum, else parseOp
  const parseExpr = () => /\d/.test(peek()) ? parseNum() : parseOp();

  return parseExpr();
};

const transpile = ast =>
{
  const opMap = { sum: '+', mul: '*', sub: '-', div: '/' };
  const transpileNode = ast =>
    ast.type === Num ? transpileNum(ast) : transpileOp(ast);
  const transpileNum = ast => ast.val;
  const transpileOp = ast =>
    `(${ast.expr.map(transpileNode).join(' ' + opMap[ast.val] + ' ')})`;
  return transpileNode(ast);
};



window.onload = () =>
{
  const processInput = str =>
  {
    let syn = transpile(parse(lex(str)));
    let val = eval(syn);
    return {
      syntax: syn,
      value: val
    };
  };
  
  var form = document.getElementById('inputForm');
  var text = document.getElementById('output');
  form.addEventListener("submit", (e) =>
  {
    const content = processInput(document.getElementById('inputForm')[0].value);
    text.innerHTML = content.value + '<br/>' + content.syntax;
    console.log(content.value);
    console.log(content.syntax);
    e.preventDefault();
  });
};
