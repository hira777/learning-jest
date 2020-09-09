# 非同期コードをテストする

非同期コードのテスト方法

## コールバック

以下のようなコールバックを実行する関数に対して

```js
export default function fetchData(callback) {
  setTimeout(() => {
    callback('peanut butter');
  }, 100);
}
```

以下のようなテストを書いても、`fetchData`の呼び出しが完了した時点でテストが完了する。

つまり、`callback`の呼び出しを待たずにテストが完了するためうまく動作しない。

```js
test('the data is peanut butter', () => {
  // fetchData の呼び出しが完了した時点でテストが完了するので、callback が呼び出されずにテストが完了する。
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```

上記のテストを正しく動作させるために、`done()`を利用する。

以下のように`done()`を利用すれば、Jest が`callback`の呼び出しが完了するのを待つため、テストが成功する。

```js
test('the data is peanut butter', done => {
  // done() を実行するこで、Jest が`callback`の呼び出しが完了するのを待つ。
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});
```

### `done()`が実行されない場合

`done()`が一定時間実行されない場合、テストはタイムアウトエラーで失敗する。

また、`expect`が失敗した場合、エラーがスローされ、`done()`は呼び出されない。

なぜテストが失敗したのかをログで確認したい場合は、以下のように`expect`を`try`で囲み、`catch`で`error`を`done`に渡す必要がある。

```js
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

## Promises

テストする関数が以下のように Promise を返す関数であれば、

```js
export function promise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('peanut butter');
    }, 1000);
  });
}
```

以下のようにテストができる。

```js
test('the data is peanut butter', () => {
  return promise().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

### reject のチェスト

テストする関数が以下のように reject をする関数であれば

```js
export function promiseError() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('error');
    }, 100);
  });
}
```

以下のようにテストできる。

```js
test('the fetch fails with an error', () => {
  // アサーションが呼ばれた回数が１回であることを期待する
  // promiseError が reject をしなかった場合、expect(e).toMatch('error') は実行されず
  // アサーションが呼ばれた回数は０回なので、テストは失敗する。
  expect.assertions(1);
  return promiseError().catch(e => expect(e).toMatch('error'));
});
```

想定した回数のアサーションが呼ばれなかったことを確認するために、今回は`expect.assertions(1)`を追加する必要がある。

これがないと、reject されなかった場合にテストが失敗したと判定されない。

## `.resolves`/`.rejects`

上記のテストは以下のように`.resolves`と`.rejects`matchers を利用したテストもできる。

```js
test('the data is peanut butter', () => {
  return expect(promise()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', () => {
  return expect(promiseError()).rejects.toMatch('error');
});
```

この場合、`expect.assertions(1)`のような、アサーションが呼ばれた回数を確認する記述は不要。

## Async/Await

以下のように`async`と`await`を利用したテストもできる。

```js
test('the data is peanut butter', async () => {
  expect.assertions(1);
  const data = await promise();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await promiseError();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

この場合は、`expect.assertions(1)`のような、アサーションが呼ばれた回数を確認する記述は必要。

### `.resolves`/`.rejects`と併用

以下のように`.resolves`/`.rejects`と併用できる。

```js
describe('Async/Await with .resolves/.rejects', () => {
  test('the data is peanut butter', async () => {
    expect.assertions(1);
    await expect(promiseError()).resolves.toBe('peanut butter');
  });

  test('the fetch fails with an error', async () => {
    expect.assertions(1);
    await expect(promiseError()).rejects.toMatch('error');
  });
});
```
