import { initializeCityDatabase, clearCityDatabase, isCity } from './city';

describe('beforeEach and afterEach', () => {
  // 各 test（it）が実行される前に、毎回実行される関数
  beforeEach(() => {
    console.log('beforeEach');
  });

  // 各 test（it）が実行された前に、毎回実行される関数
  afterEach(() => {
    console.log('afterEach');
  });

  test('test 1', () => {
    console.log('test 1');
  });

  test('test 2', () => {
    console.log('test 2');
  });
});
// ↑のテストを実行した場合、コンソールの出力は以下のようになる。
// beforeEach
// test 1
// afterEach
// beforeEach
// test 2
// afterEach

describe('beforeAll and afterAll', () => {
  // 最初の test（it）が実行される前に実行される関数
  beforeAll(() => {
    console.log('beforeAll');
  });

  // 最後の test（it）が実行された後にに実行される関数
  afterAll(() => {
    console.log('afterAll');
  });

  test('test 3', () => {
    console.log('test 3');
  });

  test('test 4', () => {
    console.log('test 4');
  });
});
// ↑のテストを実行した場合、コンソールの出力は以下のようになる。
// beforeAll
// test 1
// test 2
// afterAll

describe('city', () => {
  beforeAll(() => {
    // initializeCityDatabase は Promise を返す関数なので、
    // return initializeCityDatabase() とすれば、
    // Promise が resolve するまで待つ（Promise が resolve するまでテストは実行されない）。
    return initializeCityDatabase();
  });

  afterAll(() => {
    // clearCityDatabase は Promise を返す関数なので、
    // return clearCityDatabase() とすれば、Promise が resolve するまで待つ。
    return clearCityDatabase();
  });

  test('city database has Tokyo', () => {
    expect(isCity('Tokyo')).toBeTruthy();
  });

  test('city database has Delhi', () => {
    expect(isCity('Delhi')).toBeTruthy();
  });

  test('city database has not Cairo', () => {
    expect(isCity('Cairo')).toBeFalsy();
  });
});
