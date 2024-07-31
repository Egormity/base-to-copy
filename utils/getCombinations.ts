function getCombinations<T>(chars: T[], len: number) {
  const result = [];
  function f(prefix, chars) {
    for (let i = 0; i < chars.length; i++) {
      const elem = [...prefix, chars[i]];
      if (elem.length == len) result.push(elem);
      f(elem, chars.slice(i + 1));
    }
  }
  f([], chars);
  return result;
}
