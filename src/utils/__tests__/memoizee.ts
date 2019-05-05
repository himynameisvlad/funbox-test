import { memoizee } from '../memoizee';

describe('memoizee', () => {
  const mockFn = jest.fn((a, b) => a + b);
  let memo = memoizee(mockFn);

  it('calls function if there were no cached results 1', () => {
    memo(1, 2);
    memo(1, 2);

    expect(mockFn).toBeCalledTimes(1);
  });

  it('calls function if there were no cached results 2', () => {
    memo(2, 2);
    memo(2, 2);

    expect(mockFn).toBeCalledTimes(2);
  });

  it('calls each time when new params comes', () => {
    memo(3, 2);
    memo(4, 2);

    expect(mockFn).toBeCalledTimes(4);
  });
});
