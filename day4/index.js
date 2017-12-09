const fs = require('fs');

getPass1 = (input) => {
  let validCount = 0;

  input.split('\n').forEach((row, i) => {
    if (row === '') return;

    const words = row.split(' ');

    let valid = true;
    words.forEach((word1, index1) => {
      words.forEach((word2, index2) => {
        if (index1 !== index2 && word1 === word2) {
          valid = false;
        }
      });
    });

    if (valid) validCount++;
  });

  return validCount;
}

isAnagram = (w1, w2) => {
  let counter = 0;
  w1.split('').forEach(c => {
    if (w2.indexOf(c) > -1) {
      counter++;
    }
  });

  return w1.length === counter && w2.length === counter;
}

getPass2 = (input) => {
  let validCount = 0;

  input.split('\n').forEach((row, i) => {
    if (row === '') return;

    const words = row.split(' ');

    let valid = true;
    words.forEach((word1, index1) => {
      words.forEach((word2, index2) => {
        if (index1 !== index2 && isAnagram(word1, word2)) {
          valid = false;
        }
      });
    });

    if (valid) validCount++;
  });

  return validCount;
}

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, input) => {
  console.log(getPass1(input));
  console.log(getPass2(input));
});
