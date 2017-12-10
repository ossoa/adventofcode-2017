const fs = require('fs');

spiralMemory1 = (element) => {
  const matrixSize = Math.ceil(Math.sqrt(element));

  const firstElPos = [
    Math.floor(matrixSize / 2),
    Math.ceil(matrixSize / 2) - 1
  ];

  const maxElement = matrixSize*matrixSize;
  const distanceFromMax = maxElement - element;

  let position;
  let maxX = matrixSize - 1;
  if (distanceFromMax >=0 && distanceFromMax < matrixSize) {
    position = matrixSize%2 === 0
      ? [0, distanceFromMax]
      : [maxX, maxX - distanceFromMax];
  } else if (distanceFromMax >=matrixSize && distanceFromMax < matrixSize * 2) {
    position = matrixSize%2 === 0
      ? [distanceFromMax - maxX, maxX]
      : [maxX - (distanceFromMax - maxX), 0];
    }

  return Math.abs(firstElPos[0] - position[0]) + Math.abs(firstElPos[1] - position[1]);
}

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, input) => {
  console.log(spiralMemory1(1));
  console.log(spiralMemory1(12));
  console.log(spiralMemory1(23));
  console.log(spiralMemory1(1024));

  console.log('part 1:', spiralMemory1(347991));
  console.log('part 2: ?');
});
