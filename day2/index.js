const fs = require('fs');

getChecksum1 = (input) => (
  input.split('\n').reduce((sum, row) => {
    const n = row
      .split('\t')
      .map(i => parseInt(i, 10))
      .filter(i => !isNaN(i));

    if (n.length === 0) return sum;

    return sum + (n.reduce((a, b) => Math.max(a, b)) - n.reduce((a, b) => Math.min(a, b)));
  }, 0)
)

getChecksum2 = (input) => (
  input.split('\n').reduce((sum, row) => {
    const numbers = row
      .split('\t')
      .map(i => parseInt(i, 10))
      .filter(i => !isNaN(i));

    if (numbers.length === 0) return sum;

    let partsum = 0;
    numbers.forEach((num1, i1) => {
      numbers.forEach((num2, i2) => {
        if (i1 !== i2 && num1 % num2 === 0) {
          partsum += num1/num2
        };
      })
    });

    return sum + partsum;
  }, 0)
)

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, input) => {
  console.log(getChecksum1(input));
  console.log(getChecksum2(input));
});
