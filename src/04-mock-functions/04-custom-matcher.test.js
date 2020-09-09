import forEach from './forEach';

test('forEach', () => {
  // 戻り値が 42 + x のモック関数を生成する
  const mockCallback = jest.fn(x => 42 + x);

  forEach([0, 1], mockCallback);

  // モック関数が2回呼ばれたことを期待する
  expect(mockCallback).toHaveBeenCalledTimes(2);

  // モック関数が初めて呼ばれた時に渡された第1引数は0であることを期待する
  expect(mockCallback).toHaveBeenNthCalledWith(1, 0);

  // モック関数が2回目に呼ばれた時に渡された第1引数は1であることを期待する
  expect(mockCallback).toHaveBeenNthCalledWith(2, 1);

  // モック関数が初めて呼ばれた時の戻り値が42であることを期待する
  expect(mockCallback).toHaveNthReturnedWith(1, 42);
});
