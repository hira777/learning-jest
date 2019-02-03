# Using Matchers

Jest では「matchers」を利用して、様々な方法で値のテストができる。

## 一般的な Matchers

値をテストする最も単純な方法は、厳密な等価のチェックである。

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

`.toBe(4)`が matcher であり、`expect(2 + 2)`が返す「expectation」オブジェクトからアクセスできる。

Jest を実行すれば、失敗した matcher を追跡し、エラーメッセージを表示する。

`toBe`は`Object.is`を利用して、参照なども完全に等しいかどうかをテストする。

そのため、オブジェクトの値を確認したい場合は、`toEqual`を利用する。

```js
test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});
```

また、`not`を利用することで、通常の matcher とは反対のテストができる。

```js
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

## 真偽値(およびそれらしく思える値)

テストでは、`undefined`、`null`、および`false`の区別が必要な場合があるが、これらを異なるものとして扱いたくない場合もある。

Jest にはそれらのケースに対応したヘルパーが備わっている。

- `toBeNull`: `null` のみ一致する
- `toBeUndefined`: `undefined`のみ一致する
- `toBeDefined`: `toBeUndefined` の反対
- `toBeTruthy`: `if` ステートメントが真であるものに一致する
- `toBeFalsy`: `if` ステートメントが偽であるものに一致する

サンプル

```js
  const n = null;
  expect(n).toBeNull;
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

## 数値
