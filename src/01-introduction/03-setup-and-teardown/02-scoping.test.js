beforeAll(() => console.log('1 - beforeAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterAll(() => console.log('1 - afterAll'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterAll(() => console.log('2 - afterAll'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});
// ↑のテストを実行した場合、コンソールの出力は以下のようになる。
// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
