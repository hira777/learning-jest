test('two plus two is four', () => {
  // 2 + 2 は 4 と等価である
  expect(2 + 2).toBe(4);
});

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  // data は { one: 1, two: 2 } と等価である
  expect(data).toEqual({ one: 1, two: 2 });
});

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      // a + b は 0 と等価ではない
      expect(a + b).not.toBe(0);
    }
  }
});

test('null', () => {
  const n = null;

  // n は null である
  expect(n).toBeNull;

  // n は undefined 以外である
  expect(n).toBeDefined();

  // n は undefined ではない
  expect(n).not.toBeUndefined();

  // n は if ステートメントが真であるものに一致しない
  expect(n).not.toBeTruthy();

  // n は if ステートメントが偽であるものに一致する
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;

  // z は null ではない
  expect(z).not.toBeNull();

  // z は undefined 以外である
  expect(z).toBeDefined();

  // z は undefined ではない
  expect(z).not.toBeUndefined();

  // z は if ステートメントが真であるものに一致しない
  expect(z).not.toBeTruthy();

  // z は if ステートメントが偽であるものに一致する
  expect(z).toBeFalsy();
});

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

test('adding floating point number', () => {
  const value = 0.1 + 0.2;
  // 以下のように書くと丸め誤差が原因で期待通りに動作しない
  // expect(value).toBe(0.3);
  expect(value).toBeCloseTo(0.3);
});

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

test('the shopping list has beer on it', () => {
  const shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'beer'];

  // shoppingList に 'beer' が含まれている
  expect(shoppingList).toContain('beer');
});

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
