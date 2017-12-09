const fs = require('fs');

countSteps1 = (input) => {
  let steps = input.map(i => parseInt(i, 10));

  let stepsCounter = 0;
  let currentIndex = 0;
  while (Number.isInteger(steps[currentIndex])) {
    nextIndex = currentIndex + steps[currentIndex];
    steps[currentIndex] = steps[currentIndex] + 1;

    currentIndex = nextIndex;
    stepsCounter++;
  }

  return stepsCounter;
}

countSteps2 = (input) => {
  let steps = input.map(i => parseInt(i, 10));

  let stepsCounter = 0;
  let currentIndex = 0;
  while (Number.isInteger(steps[currentIndex])) {
    const offset = steps[currentIndex];

    nextIndex = currentIndex + offset;

    if (offset >= 3) {
      steps[currentIndex] = steps[currentIndex] - 1;
    } else {
      steps[currentIndex] = steps[currentIndex] + 1;
    }

    currentIndex = nextIndex;
    stepsCounter++;
  }

  return stepsCounter;
}


fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, input) => {
  console.log(countSteps1('0 3 0 1 -3'.split(' ')));
  console.log(countSteps1(input.split('\n')));

  console.log(countSteps2('0 3 0 1 -3'.split(' ')));
  console.log(countSteps2(input.split('\n')));
});
