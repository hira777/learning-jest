let cities = [];

export function initializeCityDatabase() {
  return new Promise(resolve => {
    setTimeout(() => {
      cities = ['Tokyo', 'Delhi', 'Shanghai'];
      resolve();
    }, 100);
  });
}

export function clearCityDatabase() {
  return new Promise(resolve => {
    setTimeout(() => {
      cities = [];
      resolve();
    }, 100);
  });
}

export function isCity(city) {
  return cities.includes(city);
}
