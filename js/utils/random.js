export function getRandomItems(arr, count) {
  const result = [];
  const usedIndexes = new Set();

  if (!Array.isArray(arr)) return result;

  const max = Math.min(count, arr.length);

  while (result.length < max) {
    const randomIndex = Math.floor(Math.random() * arr.length);

    if (!usedIndexes.has(randomIndex)) {
      usedIndexes.add(randomIndex);
      result.push(arr[randomIndex]);
    }
  }

  return result;
}
