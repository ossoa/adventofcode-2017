const fs = require('fs');

countScore1 = (input) => {
  let score = 0;

  let openCounter = 0;
  let garbageOpen = false;
  let ignoreCharacter = false;
  input.split('').forEach((c, index) => {
    if (ignoreCharacter) {
      ignoreCharacter = false;
      return;
    }

    if (c === '!') {
      ignoreCharacter = true;
    }

    if (c === '<') {
      garbageOpen = true;
    }

    if (c === '>') {
      garbageOpen = false;
    }

    if (garbageOpen) {
      return;
    }

    if (c === '{') {
      openCounter++;
      score += openCounter;
    }

    if (c === '}') {
      openCounter--;
    }
  });

  return score;
}

countScore2 = (input) => {
  let countCancels = 0;
  let score = 0;

  let openCounter = 0;
  let garbageOpen = false;
  let ignoreCharacter = false;
  input.split('').forEach((c, index) => {
    if (ignoreCharacter) {
      ignoreCharacter = false;
    } else

    if (c === '!') {
      ignoreCharacter = true;
    } else

    if (c === '>') {
      garbageOpen = false;
    } else

    if (garbageOpen) {
      countCancels++;
    } else

    if (c === '<') {
      garbageOpen = true;
    } else

    if (c === '{') {
      openCounter++;
      score += openCounter;
    } else

    if (c === '}') {
      openCounter--;
    }
  });

  return countCancels;
}

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, input) => {
  console.log(countScore1('{}'), 1)
  console.log(countScore1('{{{}}}'), 6)
  console.log(countScore1('{{},{}}'), 5)
  console.log(countScore1('{{{},{},{{}}}}'), 16)
  console.log(countScore1('{<a>,<a>,<a>,<a>}'), 1)
  console.log(countScore1('{{<ab>},{<ab>},{<ab>},{<ab>}}'), 9)
  console.log(countScore1('{{<!!>},{<!!>},{<!!>},{<!!>}}'), 9)
  console.log(countScore1('{{<a!>},{<a!>},{<a!>},{<ab>}}'), 3)
  console.log('part 1:', countScore1(input));
  console.log('part 2:', countScore2(input));
});
