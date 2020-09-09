export function promise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('peanut butter');
    }, 100);
  });
}

export function promiseError() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('error');
    }, 100);
  });
}
