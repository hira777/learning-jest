# Mock Functions

モック関数を利用することで以下のようなことができる。

- 関数の呼び出しやその呼び出しで渡されるパラメータをキャプチャする
- new でインスタンス化されたコンストラクタ関数のインスタンスをキャプチャする
- 戻り値を指定できる

## 関数をモックにする手段

- テストコードの中でモック関数を作成する。
- manual mock を作成して依存しているモジュールを上書きする。

## モック関数を利用する

以下の`forEach`関数のテストをする。

```js
export default function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

今回、引数`callback`にモック関数を渡す。モック関数は`jest.fn()`で作成できる。

以下はモック関数を利用したテスト。

```js
import forEach from './forEach';

test('forEach', () => {
  // 戻り値が 42 + x のモック関数を生成する
  const mockCallback = jest.fn(x => 42 + x);

  forEach([0, 1], mockCallback);

  // すべてのモック関数には mock プロパティが存在し、
  // モック関数呼び出し時のデータと、関数の返り値が記録されている。
  // そのため、以下のように関数がどのように呼び出され、どのようにインスタンス化され、
  // 返り値が何であったのかを確認することができる。

  // モック関数が2回呼ばれたことを期待する
  expect(mockCallback.mock.calls.length).toBe(2);

  // モック関数が初めて呼ばれた時に渡された第1引数は0であることを期待する
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // モック関数が2回目に呼ばれた時に渡された第1引数は1であることを期待する
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // モック関数が初めて呼ばれた時の戻り値が42であることを期待する
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```

`jest.fn(x => 42 + x)`がモック関数であり、`42`に引数`x`を加算して返す関数を作成している。

すべてのモック関数には`mock`プロパティが存在し、モック関数呼び出し時のデータと、関数の返り値が記録されている。

そのため、関数がどのように呼び出され、どのようにインスタンス化され、返り値が何であったのかを確認することができる。

## モック関数の戻り値を細かく指定する

以下のように`mockReturnValueOnce`を利用すれば呼び出した回数に応じた戻り値を返すことも可能。

```js
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

モック関数の戻り値を指定することでテストがやりやすくなる。

たとえば、以下のテストの場合、`filter()`が期待した値を返すかどうかをテストしたい。

```js
const filterTestFn = jest.fn();

// １回目の呼び出しは`true`を返し、2回目の呼び出しは`false`を返す
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(filterTestFn);

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls);
// > [ [11], [12] ]
```

本来、この関数に引数として渡すコールバック関数は無茶苦茶複雑かもしれないが、今回はあくまで`filter()`がうまく動作しているかどうかのテストをしたい。

テストをするためには、コールバック関数が`true`か`false`を返せば良いだけなので、モック関数`filterTestFn`を定義し、呼び出し回数に応じた戻り値を指定している。

## モジュールをモックにする

以下のコードでは`axios`を利用しているが、これをモックにしてテストを実行してみる。

```js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```

テストは以下のようになる。

```js
import axios from 'axios';
import Users from '@/mock-functions/users';

// axiosモジュールをモックにする
jest.mock('axios');
test('should fetch users', async () => {
  const users = [{ name: 'Bob' }];
  // `axios.get`メソッドを`{ data: [{ name: 'Bob' }] }`を返すモック関数にする
  // そのため、`Users.all`メソッド内で実行される`axios.get('/users.json')`は
  // `{ data: [{ name: 'Bob' }] }`を返すようになる
  axios.get.mockResolvedValue({ data: users });
  // ↑は以下の糖衣構文
  // axios.get.mockImplementation(() => Promise.resolve(resp));

  const response = await Users.all();
  expect(response).toEqual(users);
});
```

上記のテストにも書いてあるように、以下のコードは

```js
axios.get.mockResolvedValue(resp);
```

以下の糖衣構文である。

```js
axios.get.mockImplementation(() => Promise.resolve(resp));
```

`mockImplementation`を利用して、`get`メソッドを丸ごと置き換えている。

## Mock Implementations（`mockImplementation`）

前述のように、`mockImplementation`を利用することで、モック関数の実装を丸ごと置き換えることができる。

以下の例では、`foo`モジュールを、別の関数（`() => 42`）に置き換えている。

```js
import foo from './foo';
jest.mock('./foo');

test('foo', () => {
  // foo を () => 42 に置き換える。
  foo.mockImplementation(() => 42);
  expect(foo()).toBe(42);
});
```

### `mockImplementationOnce`

`mockImplementationOnce`を利用すると、モック関数を１度実行するときだけ、実装を置き換えることができる。

以下のようにモック関数を実行した回数に応じて、実行させる処理を分けることができる。

```js
const myMockFn = jest
  .fn()
  // １回目に myMockFn を実行した時に、実行される関数
  .mockImplementationOnce(cb => cb(null, true))
  // ２回目に myMockFn を実行した時に、実行される関数
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
```

もし、以下のように`jest.fn`で戻り値を指定している場合、`mockImplementationOnce`をすべて呼び出した後にそれを返す。

```js
const myMockFn = jest
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
```

## Mock Names(`mockName`)

以下のように`mockName`を利用することで、テストエラーの出力で`jest.fn()`の変わりに表示される。

```js
const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => 42 + scalar)
  .mockName('add42');
```

これを利用することで、エラー発生したモック関数を識別しやすくなる。

## Custom Matchers

モック関数がどのように呼ばれたかのアサートを容易にするためのカスタムマッチャー（糖衣構文）が提供されている。

そのため、以下のアサートを

```js
// モック関数が2回呼ばれたことを期待する
expect(mockCallback.mock.calls.length).toBe(2);

// モック関数が初めて呼ばれた時に渡された第1引数は0であることを期待する
expect(mockCallback.mock.calls[0][0]).toBe(0);

// モック関数が2回目に呼ばれた時に渡された第1引数は1であることを期待する
expect(mockCallback.mock.calls[1][0]).toBe(1);

// モック関数が初めて呼ばれた時の戻り値が42であることを期待する
expect(mockCallback.mock.results[0].value).toBe(42);
```

カスタムマッチャーを利用すれば、以下のように書ける。

```js
// モック関数が2回呼ばれたことを期待する
expect(mockCallback).toHaveBeenCalledTimes(2);

// モック関数が初めて呼ばれた時に渡された第1引数は0であることを期待する
expect(mockCallback).toHaveBeenNthCalledWith(1, 0);

// モック関数が2回目に呼ばれた時に渡された第1引数は1であることを期待する
expect(mockCallback).toHaveBeenNthCalledWith(2, 1);

// モック関数が初めて呼ばれた時の戻り値が42であることを期待する
expect(mockCallback).toHaveNthReturnedWith(1, 42);
```
