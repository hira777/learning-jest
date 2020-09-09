# Setup と Teardown

Jest は、テストが実行される前や後に処理を実行させるためのヘルパー関数（Setup メソッドと、Teardown メソッド）を提供している。

## `beforeEach`、`afterEach`

以下のように毎回実行されるヘルパー関数。

- `beforeEach`: 各`test`（`it`）が実行される前に、毎回実行される関数
- `afterEach`: 各`test`（`it`）が実行された後に、毎回実行される関数

```js
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
```

## `beforeAll`、`afterAll`

以下のように一度だけ実行されるヘルパー関数。

- `beforeAll`: 最初の`test`（`it`）が実行される前に実行される関数
- `afterAll`: 最後の`test`（`it`）が実行された後に実行される関数

```js
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
```

## 非同期処理を扱う

以下のように Promise を返す関数を、前述のヘルパー関数で利用したい場合、

```js
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
```

以下のように関数を`return`すれば、Promise が resolve するまで`test`(`it`)は実行されない。

```js
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
```

## スコープ

`describe`を利用することで、ヘルパー関数をスコーピングできる。

以下のように、トップレベルに書いたヘルパー関数はどのスコープでも実行され、`describe`内に書いたものは、その`describe`内でしか実行されない。

```js
beforeEach(() => console.log('1 - beforeEach'));
test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeEach(() => console.log('2 - beforeEach'));
  test('', () => console.log('2 - test'));
  test('', () => console.log('3 - test'));
});
// ↑のテストを実行した場合、コンソールの出力は以下のようになる。
// 1 - beforeEach
// 1 - test
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 1 - beforeEach
// 2 - beforeEach
// 3 - test
```

スコーピングをした場合、トップレベルで実行されるヘルパー関数と、スコープ内で実行されるヘルパー関数の順番は以下の通り。

```js
beforeAll(() => console.log('1 - beforeAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterAll(() => console.log('1 - afterAll'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterAll(() => console.log('2 - afterAll'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});
// ↑のテストを実行した場合、コンソールの出力は以下のようになる。
// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

## `describe`と`test`（`it`）の実行順序

以下のように、スコープに関わらず、すべての`describe`が`test`よりも先に実行される。

```js
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});
// ↑のテストを実行した場合、コンソールの出力は以下のようになる。
// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

## `test.only`

以下ように`test.only`を実行することで、その`test`だけを実行できる。

```js
test.only('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

// ↑で test.only を実行しているので、この test は実行されない
test('this test will not run', () => {
  expect('A').toBe('A');
});
```

テストが失敗した時に、失敗したテスト自身に影響があるのかを確認するために役に立つ（他の`test`が実行される状態だと、他の`test`が原因でテストが失敗している可能性があるため）。
