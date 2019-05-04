# configuration

`package.json`か`jest.config.js`にJestの設定を定義できる。

`package.json`の場合、以下のように記述し

```json
{
  "name": "my-project",
  "jest": {
    "verbose": true
  }
}
```

`jest.config.js`の場合、以下のように記述する。

```js
module.exports = {
  verbose: true,
};
```

## デフォルトオプション

必要に応じて、デフォルトオプションを取得して拡張できる。

```js
const { defaults } = require('jest-config');
module.exports = {
  // defaults.moduleFileExtensionsは['js', 'json', 'jsx', 'ts', 'tsx', 'node']
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
```

## Reference

- moduleFileExtensions
- transform
- moduleNameMapper

### moduleFileExtensions

Default: `['js', 'json', 'jsx', 'ts', 'tsx', 'node']`

テスト対象の拡張子を指定する。

たとえば、`.vue`をテスト対象にしたい場合、以下のように記述をする。

```js
module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    // *.vue ファイルを処理するように Jest に指示する
    'vue'
  ]
};
```

### transform

Default: `undefined`

正規表現にマッチしたファイルに対して実行するトランフォーマーを指定する。

トランフォーマーはプリプロセッサのこと。`babel-jest`、`vue-jest`、`ts-jest`などがそれに当たる。

Jest単体ではTypeScriptや`.vue`ファイルなどのテストができないため、それらをテストするために必要。

たとえば、`.vue`ファイルに`vue-jest`を利用したい場合は、以下のように記述をする。

```js
module.exports = {
 'transform': {
    // vue-jest で *.vue ファイルを処理する
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  }
};
```

#### babel-jestの注意点

`babel-jest`はインストールしておけば、デフォルトの設定で有効になるため、設定ファイルに`transform`を指定する必要はない。

しかし、`transform`に`vue-jest`などの他の設定も追加する場合、`babel-jest`の利用も明記する必要がある。

```js
module.exports = {
 'transform': {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  }
};
```

#### プロダクションコードのビルド時とテスト実行時で利用するBabelの設定を変更する。

以下のように`env.test`を指定すれば、テストの時だけその設定が利用される。

```json
{
  "presets": [["env", { "modules": false }]],
  "env": {
    "test": {
      "presets": [["env", { "targets": { "node": "current" } }]]
    }
  }
}
```

### moduleNameMapper

Default: `null`

エイリアスの指定をする（ざっくり言えば）。

たとえば、webpackで以下の`resolve.alias`を指定している場合、

```js
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
```

以下のような`moduleNameMapper`を指定する必要がある。

```js
module.exports = {
 'moduleNameMapper': {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
```

`<rootDir>`はJestの設定ファイル、もしくは`package.json`が存在するルートディレクトリ。


