# An Async Example

API と通信するモジュールをモック化し、非同期処理をテストする。

テストする JS は以下の`user.js`。

```js
import request from './request';

export function getUserName(userID) {
  return request('/users/' + userID).then(user => user.name);
}
```

上記で利用している`request.js`をモック化する。

```js
const http = require('http');

export default function request(url) {
  return new Promise(resolve => {
    http.get({ path: url }, response => {
      let data = '';
      response.on('data', _data => (data += _data));
      response.on('end', () => resolve(data));
    });
  });
}
```

モック化した`__mocks__/request.js`は以下の通り。

```js
const users = {
  4: { name: 'Mark' },
  5: { name: 'Paul' },
};

export default function request(url) {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10);

    // TODO: なぜ process.nextTick を利用するのかわかっていない
    process.nextTick(() =>
      users[userID]
        ? resolve(users[userID])
        : reject({
            error: 'User with ' + userID + ' not found.',
          })
    );
  });
}
```

テストは以下のようになる。

```js
// user.js の request.js が ../__mocks__/request.js に置き換わる
jest.mock('../request');

import * as user from '../user';

it('works with promises', () => {
  expect.assertions(1);
  return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
});

it('works with resolves', () => {
  expect.assertions(1);
  return expect(user.getUserName(5)).resolves.toEqual('Paul');
});

it('works with async/await', async () => {
  expect.assertions(1);
  const data = await user.getUserName(4);
  expect(data).toEqual('Mark');
});

it('works with async/await and resolves', async () => {
  expect.assertions(1);
  await expect(user.getUserName(5)).resolves.toEqual('Paul');
});

it('tests error with promises', () => {
  expect.assertions(1);
  return user.getUserName(2).catch(e =>
    expect(e).toEqual({
      error: 'User with 2 not found.',
    })
  );
});

it('tests error with rejects', () => {
  expect.assertions(1);
  return expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.',
  });
});

it('tests error with async/await', async () => {
  expect.assertions(1);
  try {
    await user.getUserName(1);
  } catch (e) {
    expect(e).toEqual({
      error: 'User with 1 not found.',
    });
  }
});

it('tests error with async/await and rejects', async () => {
  expect.assertions(1);
  await expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.',
  });
});
```
