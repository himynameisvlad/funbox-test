import { moveArrayItem } from '../moveArrayItem';

describe('utils - moveArrayItem', () => {
  it('should swap array item and move the rest of them', () => {
    expect(moveArrayItem([1,2,3,4,5], 4, 1)).toEqual([1,5,2,3,4]);
    expect(moveArrayItem([1,2,3,4,5], 4, 0)).toEqual([5,1,2,3,4]);
  });

  describe('return array itself', () => {
    it('if array is falsy', () => {
      expect(moveArrayItem(null, 4, 0)).toBe(null);
    });

    it('if array.length === 0', () => {
      const array = [];

      expect(moveArrayItem(array, 4, 0)).toBe(array);
    });

    it('if there is no from item', () => {
      const array = [1,2];

      expect(moveArrayItem(array, 4, 0)).toBe(array);
    });

    it('if there is no to item', () => {
      const array = [1,2];

      expect(moveArrayItem(array, 1, 5)).toBe(array);
    });
  });
});
