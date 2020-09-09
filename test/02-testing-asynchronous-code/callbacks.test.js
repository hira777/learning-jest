import fetchData from '../../src/fetchData';

// fetchDataの呼び出しが完了した時点でテストが完了する。
// callback が呼び出されずにテストが完了する。
// test('the data is peanut butter', () => {
//   function callback(data) {
//     expect(data).toBe('peanut butter');
//   }

//   fetchData(callback);
// });

test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});

test('the data is peanut butter', done => {
  function callback(data) {
    // なぜテストが失敗したのかをログで確認したい場合、
    // `expect`を`try`で囲み、`catch`で`error`を`done`に渡す必要がある。
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
