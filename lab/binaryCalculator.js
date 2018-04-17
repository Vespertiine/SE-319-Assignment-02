var BinaryCalculator = BinaryCalculator || {
  memory: 0
};

BinaryCalculator.bindFields = () => {
  BinaryCalculator.output = document.getElementById('bcalc_txt');
  BinaryCalculator.keys = {
    keyDiv: document.getElementById('bcalc_symDiv'),
    keySub: document.getElementById('bcalc_symSub'),
    keySum: document.getElementById('bcalc_symSum'),
    keyMul: document.getElementById('bcalc_symMul'),
    keyMod: document.getElementById('bcalc_symMod'),
    keyLS: document.getElementById('bcalc_symLS'),
    keyRS: document.getElementById('bcalc_symRS'),
    keyAnd: document.getElementById('bcalc_symAnd'),
    keyOr: document.getElementById('bcalc_symOr'),
    keyNot: document.getElementById('bcalc_symNot'),
    keyOpEq: document.getElementById('bcalc_opEq'),
    keyOpMC: document.getElementById('bcalc_opMC'),
    keyOpC: document.getElementById('bcalc_opC'),
    keyOpMR: document.getElementById('bcalc_opMR'),
    keyOpMSub: document.getElementById('bcalc_opMSub'),
    keyOpMSum: document.getElementById('bcalc_opMSum')
  };

  for (var i = 0; i <= 1; i++) {
    BinaryCalculator.keys[`key${i}`] = document.getElementById(`bcalc_num${i}`);
  }
};

BinaryCalculator.attachEventHandlers = () => {
  for (var i = 0; i <= 1; i++) {
    let key = `key${i}`;
    let val = i;
    BinaryCalculator.keys[key].addEventListener('click', () => BinaryCalculator.output.value += val);
  }
  document.getElementById('bcalc_input').addEventListener('submit', form => {
    BinaryCalculator.output.value = BinaryCalculator.opEq(BinaryCalculator.output.value);
    form.preventDefault();
  });
  BinaryCalculator.keys.keyDiv.addEventListener('click', () => BinaryCalculator.output.value += ' / ');
  BinaryCalculator.keys.keyMul.addEventListener('click', () => BinaryCalculator.output.value += ' * ');
  BinaryCalculator.keys.keySub.addEventListener('click', () => BinaryCalculator.output.value += ' - ');
  BinaryCalculator.keys.keySum.addEventListener('click', () => BinaryCalculator.output.value += ' + ');
  BinaryCalculator.keys.keyMod.addEventListener('click', () => BinaryCalculator.output.value += ' % ');
  BinaryCalculator.keys.keyLS.addEventListener('click', () => BinaryCalculator.output.value = BinaryCalculator.opEq(BinaryCalculator.output.value) + '0');
  BinaryCalculator.keys.keyRS.addEventListener('click', () => {
    const val = '0' + BinaryCalculator.opEq(BinaryCalculator.output.value)
    BinaryCalculator.output.value = val.substr(0, val.length - 1);
  });
  BinaryCalculator.keys.keyAnd.addEventListener('click', () => BinaryCalculator.output.value += ' & ');
  BinaryCalculator.keys.keyOr.addEventListener('click', () => BinaryCalculator.output.value += ' | ');
  BinaryCalculator.keys.keyNot.addEventListener('click', () => BinaryCalculator.output.value += ' ~ ');
  BinaryCalculator.keys.keyOpEq.addEventListener('click', () => BinaryCalculator.output.value = BinaryCalculator.opEq(BinaryCalculator.output.value));
  BinaryCalculator.keys.keyOpC.addEventListener('click', () => BinaryCalculator.opClear());
  BinaryCalculator.keys.keyOpMR.addEventListener('click', () => BinaryCalculator.output.value += ' ' + BinaryCalculator.memory);
  BinaryCalculator.keys.keyOpMSub.addEventListener('click', () => {
    const value = BinaryCalculator.opEq(BinaryCalculator.memory + ' - ' + BinaryCalculator.output.value);
    BinaryCalculator.memory = (value != 0)
      ? value || ''
      : 0;
    BinaryCalculator.opClear();
  });
  BinaryCalculator.keys.keyOpMSum.addEventListener('click', () => {
    BinaryCalculator.memory = BinaryCalculator.opEq(BinaryCalculator.memory + ' + ' + BinaryCalculator.output.value) || BinaryCalculator.memory;
    BinaryCalculator.opClear();
  });
  BinaryCalculator.keys.keyOpMC.addEventListener('click', () => {
    BinaryCalculator.memory = 0;
    BinaryCalculator.opClear();
  });
};

BinaryCalculator.opEq = (input) => {
  try {
    console.log('-- Binary Calculator Evaluation --');
    console.log(`Input: ${input}`);
    const sanitized = input.replace(/[^\d\*\+\-\/\.\|\~\&]/g, '').replace(/(\D)/g, ' $1 ').split(' ').filter(s => s.length).map(
      s => s = /\d/.test(s)
      ? parseInt(s, 2)
      : s).join('');
    if (!sanitized)
      return '';
    console.log(`Operation: ${sanitized}`);
    const evaluated = eval(sanitized);
    console.log(`Evaluated: ${evaluated}`);
    console.log(`Evaluated (as binary): ${evaluated.toString(2)}`);
    return (evaluated != 0)
      ? evaluated.toString(2) || ''
      : 0;
  } catch (e) {
    return '';
  }
};

BinaryCalculator.opClear = () => {
  BinaryCalculator.output.value = '';
};

window.addEventListener('load', () => {
  BinaryCalculator.bindFields();
  BinaryCalculator.attachEventHandlers();
});
