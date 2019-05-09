const buildPossibleCombination = (numberCollection) => {
  if (!numberCollection || !numberCollection.x) {
    return [];
  }
  const value = numberCollection.x;
  if (!numberCollection.l && !numberCollection.r) {
    return [value];
  }
  let left = buildPossibleCombination(numberCollection.l);
  let right = buildPossibleCombination(numberCollection.r);
  left = left.map((item) => {
    if (Array.isArray(item)) {
      return [value, ...item];
    }
    return [value, item];
  });
  right = right.map((item) => {
    if (Array.isArray(item)) {
      return [value, ...item];
    }
    return [value, item];
  });

  return [...left, ...right];
};

const findPossibleCombination = (queryNumber, numberCollection) => {
  const queryNumbers = queryNumber.split('').map(value => parseInt(value, 10));
  const allCombinations = buildPossibleCombination(numberCollection);
  const possibleCombinations = allCombinations.filter(
    combination => queryNumbers.every((number, index) => number === combination[index]),
  );
  return possibleCombinations.map(combination => combination.join(''));
};

module.exports = {
  findPossibleCombination,
};
