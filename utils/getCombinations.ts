const permutations = (strOrArr: string | Array<any>, join: false | string = false) => {
  let arr = strOrArr.slice(0);
  if (typeof arr === 'string') arr = arr.split('');

  const output = [];

  const swapInPlace = (arrToSwap: Array<any>, indexA: number, indexB: number) => {
    const temp = arrToSwap[indexA];
    arrToSwap[indexA] = arrToSwap[indexB];
    arrToSwap[indexB] = temp;
  };

  const generate = (n: number, heapArr: Array<any>) => {
    if (n === 1)
      return typeof join === 'string'
        ? output.push(heapArr.slice(0).join(join))
        : output.push(heapArr.slice(0));

    generate(n - 1, heapArr);

    for (let i = 0; i < n - 1; i++) {
      if (n % 2 === 0) swapInPlace(heapArr, i, n - 1);
      else swapInPlace(heapArr, 0, n - 1);
      generate(n - 1, heapArr);
    }
  };

  generate(arr.length, arr);

  return output;
};
