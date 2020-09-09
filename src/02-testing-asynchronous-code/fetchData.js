export default function fetchData(callback) {
  setTimeout(() => {
    callback('peanut butter');
  }, 1000);
}
