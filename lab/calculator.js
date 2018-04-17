// single-namespace of Calculator
var DecimalCalculator = DecimalCalculator || {
  memory: 0,
  prev_btn: 0
};

DecimalCalculator.bindFields = () => {
  DecimalCalculator.output = document.getElementById('dcalc_txt');

  DecimalCalculator.keys = {
    keyDiv: document.getElementById('dcalc_symDiv'),
    keyDot: document.getElementById('dcalc_symDot'),
    keySub: document.getElementById('dcalc_symSub'),
    keySum: document.getElementById('dcalc_symSum'),
    keyMul: document.getElementById('dcalc_symMul'),
    keyOpC: document.getElementById('dcalc_opC'),
    keyOpEq: document.getElementById('dcalc_opEq'),
    keyOpMC: document.getElementById('dcalc_opMC'),
    keyOpMR: document.getElementById('dcalc_opMR'),
    keyOpMSub: document.getElementById('dcalc_opMSub'),
    keyOpMSum: document.getElementById('dcalc_opMSum'),
    keyMod: document.getElementById('dcalc_symMod')
  };
  for (var i = 0; i <= 9; i++) {
    DecimalCalculator.keys[`key${i}`] = document.getElementById(`dcalc_num${i}`);
  }
};

DecimalCalculator.attachEventHandlers = () => {
  for (var i = 0; i <= 9; i++) {
    let key = `key${i}`;
    let val = i;
    DecimalCalculator.keys[key].addEventListener('click', () => DecimalCalculator.output.value += val);
  };
  document.getElementById('dcalc_input').addEventListener('submit', form => {
    DecimalCalculator.output.value = DecimalCalculator.opEq(DecimalCalculator.output.value);
    form.preventDefault();
  });
  DecimalCalculator.keys.keyDiv.addEventListener('click', () => DecimalCalculator.output.value += ' / ');
  DecimalCalculator.keys.keyMul.addEventListener('click', () => DecimalCalculator.output.value += ' * ');
  DecimalCalculator.keys.keyDot.addEventListener('click', () => DecimalCalculator.output.value += '.');
  DecimalCalculator.keys.keySub.addEventListener('click', () => DecimalCalculator.output.value += ' - ');
  DecimalCalculator.keys.keySum.addEventListener('click', () => DecimalCalculator.output.value += ' + ');
  DecimalCalculator.keys.keyMod.addEventListener('click', () => DecimalCalculator.output.value += ' % ');
  DecimalCalculator.keys.keyOpEq.addEventListener('click', () => DecimalCalculator.output.value = DecimalCalculator.opEq(DecimalCalculator.output.value));
  DecimalCalculator.keys.keyOpC.addEventListener('click', () => DecimalCalculator.opClear());
  DecimalCalculator.keys.keyOpMR.addEventListener('click', () => DecimalCalculator.output.value += ' ' + DecimalCalculator.memory);
  DecimalCalculator.keys.keyOpMSub.addEventListener('click', () => {
    const value = DecimalCalculator.opEq(DecimalCalculator.memory + ' - ' + DecimalCalculator.output.value);
    DecimalCalculator.memory = (value != 0)
      ? value || ''
      : 0;
    DecimalCalculator.opClear();
  });
  DecimalCalculator.keys.keyOpMSum.addEventListener('click', () => {
    DecimalCalculator.memory = DecimalCalculator.opEq(DecimalCalculator.memory + ' + ' + DecimalCalculator.output.value) || DecimalCalculator.memory;
    DecimalCalculator.opClear();
  });
  DecimalCalculator.keys.keyOpMC.addEventListener('click', () => {
    DecimalCalculator.memory = 0;
    DecimalCalculator.opClear();
  });
};

DecimalCalculator.opEq = (input) => {
  try {
    console.log('-- Decimal Calculator Evaluation --');
    console.log(`Input: ${input}`);
    const sanitized = input.replace(/[^\d\*\+\-\%\/\.]/g, '');
    if (!sanitized)
      return '';
    console.log(`Operation: ${sanitized}`);
    const evaluated = eval(sanitized);
    console.log(`Evaluated: ${evaluated}`);
    return (evaluated != 0)
      ? evaluated || ''
      : 0;
  } catch (e) {
    return '';
  }
};

DecimalCalculator.opClear = () => {
  DecimalCalculator.output.value = '';
};

window.addEventListener('load', () => {
  DecimalCalculator.bindFields();
  DecimalCalculator.attachEventHandlers();
});
