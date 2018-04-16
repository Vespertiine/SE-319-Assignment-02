var LexParse = LexParse || {};

LexParse.lex = str => str.split(' ').map(s => s.trim()).filter(s => s.length);

LexParse.Op = Symbol('op');
LexParse.Num = Symbol('num');

LexParse.parse = tokens =>
{
  let index = 0;
  const peek = () => tokens[index];
  const consume = () => tokens[index++];

  const parseNum = () => ({ val: parseInt(consume()), type: LexParse.Num });

  const parseOp = () => {
    const node = { val: consume(), type: LexParse.Op, expr: [] };
    while (peek()) node.expr.push(parseExpr());
    return node;
  };

  // if element is num (\d) parseNum, else parseOp
  const parseExpr = () => /\d/.test(peek()) ? parseNum() : parseOp();

  return parseExpr();
};

LexParse.transpile = ast =>
{
  const opMap = { sum: '+', mul: '*', sub: '-', div: '/' };
  const transpileNode = ast =>
    ast.type === LexParse.Num ? transpileNum(ast) : transpileOp(ast);
  const transpileNum = ast => ast.val;
  const transpileOp = ast =>
    `(${ast.expr.map(transpileNode).join(' ' + opMap[ast.val] + ' ')})`;
  return transpileNode(ast);
};



window.addEventListener('load', () =>
{
  const processInput = str =>
  {
    let syn = LexParse.transpile(LexParse.parse(LexParse.lex(str)));
    let val = eval(syn);
    return {
      syntax: syn,
      value: val
    };
  };

  var form = document.getElementById('inputForm');
  var text = document.getElementById('parseroutput');
  form.addEventListener("submit", (e) =>
  {
    const content = processInput(document.getElementById('parserinput').value);
    text.innerHTML = content.value + '<br/>' + content.syntax;
    console.log(content.value);
    console.log(content.syntax);
    e.preventDefault();
  });
});
