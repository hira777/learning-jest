import forEach from '@/mock-functions/forEach';

test('forEach', () => {
  // モック関数を生成する
  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 1], mockCallback);

  // モック関数が2回呼ばれたことを期待する
  expect(mockCallback.mock.calls.length).toBe(2);

  // モック関数が初めて呼ばれた時に渡された第1引数は0であることを期待する
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // モック関数が2回目に呼ばれた時に渡された第1引数は1であることを期待する
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // モック関数が初めて呼ばれた時の戻り値が42であることを期待する
  expect(mockCallback.mock.results[0].value).toBe(42);
});
