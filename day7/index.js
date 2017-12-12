const fs = require('fs');

getBottom = (rows) => {
  const parents = [];
  const children = [];

  rows.forEach(row => {
    const parts = row.split(' -> ');
    if (parts[1]) {
      const parent = parts[0].split(' ')[0];
      parents.push(parent);
      children.push(...parts[1].split(', '))
    }
  });

  let parent;
  for (let i = 0 ; i < parents.length ; i++) {
    if (children.indexOf(parents[i]) === -1) {
      parent = parents[i];
      break;
    }
  }

  return parent;
}

checkSum = (rows) => {
  const parentKey = getBottom(rows);

  const elements = {};

  rows.forEach(row => {
    const parts = row.split(' -> ');
    const part1parts = parts[0].split(' ');
    const key = part1parts[0];

    const children = parts[1] ? parts[1].split(', ') : null;
    elements[key] = {
      weight: parseInt(part1parts[1].substr(1).slice(0, -1)),
    };

    if (children) {
      elements[key].children = children;
    }
  });


  const tree = getChildren(parentKey, elements);

  sumBranches(tree);
  // printTree(tree, 1);

  // console.log(tree.children[3]);
  console.log(
    tree.children[3]
      .children[1]
      // .children[2]
      .children
      .map(c => `${c.key} ${c.weight} ${c.sum}`)
  );

  findInbalance(tree);

  // Correct answer 256 for tulwp
  return undefined;
}

findInbalance = (tree) => {
  if (!tree.children) return;

  const count = {};
  tree.children.forEach((c, index) => {
    if (count[c]) {
      count[c] = false;
    } else {
      count[c] = index;
    }
  });

  if (Object.keys(count) > 1) {
    return findInbalance(tree)
  }
}

getChildren = (key, elements) => {
  const element = elements[key];

  if (!element.children) {
    return {
      key,
      weight: element.weight,
    };
  }

  return {
    key,
    weight: element.weight,
    children: element.children.map(child => getChildren(child, elements)),
  };
}

sumBranches = (tree) => {
  if (!tree.children) {
    tree.sum = tree.weight;
    return tree.sum;
  }

  tree.sum = tree.children.reduce(
    (acc, branch) => acc + sumBranches(branch),
    tree.weight
  );

  return tree.sum;
}

printTree = (tree, index) => {
  console.log(
    Array(index).join('  '),
    index,
    tree.key,
    tree.sum
  );
  if (tree.children) {
    tree.children.forEach(t => printTree(t, index + 1));
  }
}

const testInput =`
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`;


fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, input) => {
  // console.log(getBottom(testInput.trim().split('\n')));
  // console.log(getBottom(input.trim().split('\n')));

  // console.log(checkSum(testInput.trim().split('\n')));
  console.log(checkSum(input.trim().split('\n')));
});
