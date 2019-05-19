export function promise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('peanut butter');
    }, 1000);
  });
}

export function promiseError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error');
    }, 1000);
  });
}
