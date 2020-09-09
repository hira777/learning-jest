# Using Matchers

Jest では「matchers」を利用して、様々な方法で値のテストができる。

## 一般的な Matchers

値をテストする最も単純な方法は、厳密な等価のチェックである。

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

`.toBe(4)`が matcher であり、`expect(2 + 2)`が返す`expectation`オブジェクトからアクセスできる。

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

```js
test('two plus two', () => {
  const value = 2 + 2;
  // 3より大きい
  expect(value).toBeGreaterThan(3);
  // 4より大きい、もしくは等価
  expect(value).toBeGreaterThanOrEqual(4);
  // 3より小さい
  expect(value).toBeLessThan(5);
  // 4より小さい、もしくは等価
  expect(value).toBeLessThanOrEqual(4);

  // 等価
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

テストを丸め誤差に依存させたくないため、浮動小数点の値が同一であるかを確認するには`toEqual`の代わりに`toBeCloseTo`を利用する。

```js
test('adding floating point number', () => {
  const value = 0.1 + 0.2;
  // 以下のように書くと丸め誤差が原因で期待通りに動作しない
  // expect(value).toBe(0.3);
  expect(value).toBeCloseTo(0.3);
});
```

## 文字列

`toMatch`で利用して、文字列に対して正規表現でマッチするか確認できる。

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

## 配列とイテラブル

`toContain`を利用して、配列に特定のアイテムが含まれているかどうかを確認できる。

```js
test('the shopping list has beer on it', () => {
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
  ];

  // shoppingList に 'beer' が含まれていれば、テストは pass する
  expect(shoppingList).toContain('beer');
});
```

## 例外

`toThrow`を利用して、関数が呼び出されたときに例外が発生するかどうかを確認できる。

```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  // compileAndroidCode がエラーをスローする
  expect(compileAndroidCode).toThrow();
  // compileAndroidCode がスローしたコンストラクタは Error である
  expect(compileAndroidCode).toThrow(Error);

  // エラーメッセージがマッチするかテストできる
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```
