const fs = require('fs');

const process = rows => {
  const values = {};
  let maxValue;

  rows.forEach(row => {
    const parts = row.split(' ');

    const {id, instr, cond} = {
      id: parts[0],
      instr: {
        operation: parts[1],
        by: parseInt(parts[2], 10)
      },
      cond: {
        id: parts[4],
        param: parts[5],
        value: parseInt(parts[6], 10),
      }
    }

    if (eval(`${values[cond.id] || 0} ${cond.param} ${cond.value}`)) {
      if (instr.operation === 'inc') {
        values[id] = (values[id] || 0) + instr.by;
      } else if (instr.operation === 'dec') {
        values[id] = (values[id] || 0) - instr.by;
      }

      maxValue = maxValue
        ? Math.max(...Object.keys(values).map(key => values[key]), maxValue)
        : Math.max(...Object.keys(values).map(key => values[key]));
    }
  });

  return {
    'part 1': Math.max(...Object.keys(values).map(key => values[key])),
    'part 2': maxValue,
  };
};

const testInput = `
b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
`;

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, input) => {
  console.log(process(testInput.trim().split("\n")));
  console.log(process(input.trim().split('\n')));
});
