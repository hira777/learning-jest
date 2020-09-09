import foo from './foo';
jest.mock('./foo');

test('foo', () => {
  // foo を () => 42 に置き換える。
  foo.mockImplementation(() => 42);
  expect(foo()).toBe(42);
});
