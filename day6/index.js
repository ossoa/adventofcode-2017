const fs = require('fs');

countSteps1 = (input) => {
  let banks = input.map(i => parseInt(i, 10));
  let stepsCounter = 0;
  const cache = {};

  let max = Math.max(...banks);
  let index = banks.indexOf(max);
  while (cache[banks.join('-')] !== true) {
    cache[banks.join('-')] = true;

    let i = index === banks.length - 1 ? 0 : index + 1;

    banks[index] = 0;
    while(max !== 0) {
      banks[i] = banks[i] + 1;
      max--;

      i = i === banks.length - 1 ? 0 : i + 1;
    }

    max = Math.max(...banks);
    index = banks.indexOf(max);

    stepsCounter++;
  }

  return stepsCounter;
}

countSteps2 = (input) => {
  let banks = input.map(i => parseInt(i, 10));
  let stepsCounter = 0;
  const cache = {};

  let max = Math.max(...banks);
  let index = banks.indexOf(max);
  while (cache.hasOwnProperty(banks.join('-')) !== true) {
    cache[banks.join('-')] = stepsCounter;

    let i = index === banks.length - 1 ? 0 : index + 1;

    banks[index] = 0;
    while(max !== 0) {
      banks[i] = banks[i] + 1;
      max--;

      i = i === banks.length - 1 ? 0 : i + 1;
    }

    max = Math.max(...banks);
    index = banks.indexOf(max);

    stepsCounter++;
  }

  return stepsCounter - cache[banks.join('-')];
}



fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, input) => {
  console.log(countSteps1('0 2 7 0'.split(' ')));
  console.log(countSteps1(input.split('\t')));

  console.log(countSteps2('0 2 7 0'.split(' ')));
  console.log(countSteps2(input.split('\t')));
});
