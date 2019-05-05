export const memoizee = fn => {
  const cache = {};

  return (...args) => {
    const stringifyArgs = JSON.stringify(args);

    cache[stringifyArgs] = cache[stringifyArgs] || fn(...args);

    return cache[stringifyArgs];
  };
};
