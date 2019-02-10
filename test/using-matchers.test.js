test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

test('null', () => {
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
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer'
  ];

  expect(shoppingList).toContain('beer');
});

class ConfigError {}
function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError);
});
