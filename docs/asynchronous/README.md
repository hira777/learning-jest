# Testing Asynchronous Code

非同期コードのテスト方法

## コールバック

以下のようなコールバックを実行する関数に対して

```js
export default function fetchData(callback) {
  setTimeout(() => {
    callback('peanut butter');
  }, 1000);
}
```

以下のようなテストを書いても、`fetchData`の呼び出しが完了した時点でテストが完了する。

つまり、`callback`の呼び出しを待たずにテストが完了するためうまく動作しない。

```js
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```

上記のテストを正しく動作させるために、`done`を利用する。

以下のように`done`を利用すれば、Jestが`callback`の呼び出しが完了するのを待つため、テストが成功する。

```js
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});
```

## Promises

テストする関数がPromiseを返す関数であれば、以下のようにテストができる。

```js
test('the data is peanut butter', () => {
  return promise().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

rejectされることを期待する場合、想定した回数のアサーションが呼ばれなかったことを確認するために`expect.assertions(1)`を追加する必要がある。

これがないと、rejectされなかった場合にテストが失敗したと判定されない。

```js
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return promiseError().catch(e => expect(e).toMatch('error'));
});
```

## `.resolves`/`.rejects`

以下のように`.resolves`と`.rejects`matchersを利用したテストもできる。

```js
test('the data is peanut butter', () => {
  return expect(promise()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', () => {
  return expect(promiseError()).rejects.toMatch('error');
});
```

## Async/Await

以下のように`async`と`await`を利用したテストもでき。

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