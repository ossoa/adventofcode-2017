const fs = require('fs');

count = (input) => {
  const inputL = input.length;
  const programs = input.map(row => (
    row.split(' <-> ')[1].split(', ').map(i => parseInt(i, 10))
  ));

  const connected = [0];
  findConnected = (id) => {
    programs.forEach((p, index)=> {
      if (p.indexOf(id) > -1 && connected.indexOf(index) === -1) {
        connected.push(index);
        findConnected(index);
      }
    });
  }
  findConnected(0);

  return connected.length;
}

const testInput = `
0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
`

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, input) => {
  console.log(count(testInput.trim().split('\n')));
  console.log('part 1:', count(input.trim().split('\n')));

  // console.log(count2(testInput.trim().split('\n')));
  // console.log('part 2:', count2(input.trim().split('\n')));
});
