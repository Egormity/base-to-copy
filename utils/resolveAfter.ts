export function resolveAfter<T>(value: T, delay: number, reject: boolean = false) {
  return new Promise((res, rej) => {
    if (!reject) setTimeout(() => res(value), delay);
    if (reject) setTimeout(() => rej(value), delay);
  });
}
