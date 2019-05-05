export const moveArrayItem = (array: any[], from: number, to: number) => {
  if (
    !array ||
    !array.length ||
    typeof array[from] === 'undefined' ||
    typeof array[to] === 'undefined'
  ) {
    return array;
  }

  const arrayCopy = [...array];

  arrayCopy.splice(to, 0, arrayCopy.splice(from, 1)[0]);

  return arrayCopy;
};
