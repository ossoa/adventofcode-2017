const fs = require('fs');

solveCaptcha1 = (sequence) => {
  let sum = 0;

  sequence.split('').map((c, i) => {
    if ((i + 1 < sequence.length && c === sequence[i+1])
         || (i + 1 == sequence.length && c === sequence[0])
    ) {
      sum += parseInt(c, 10);
    }
  });

  return sum;
}

solveCaptcha2 = (sequence) => {
  let sum = 0;

  for (var i = 0, seqL = sequence.length; i < seqL/2 ; i++) {
    if (sequence[i] === sequence[seqL - seqL/2 + i]) {
      sum += parseInt(sequence[i], 10);
    }
  }

  return sum * 2;
}

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, input) => {
  console.log(solveCaptcha1(input));
  console.log(solveCaptcha2(input));
});
