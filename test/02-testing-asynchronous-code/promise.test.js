import { promise, promiseError } from '../../src/promise';

describe('Promises', () => {
  test('the data is peanut butter', () => {
    return promise().then(data => {
      expect(data).toBe('peanut butter');
    });
  });

  test('the fetch fails with an error', () => {
    expect.assertions(1);
    return promiseError().catch(e => expect(e).toMatch('error'));
  });
});

describe('.resolves/.rejects', () => {
  test('the data is peanut butter', () => {
    return expect(promise()).resolves.toBe('peanut butter');
  });

  test('the fetch fails with an error', () => {
    return expect(promiseError()).rejects.toMatch('error');
  });
});

describe('Async/Await', () => {
  test('the data is peanut butter', async () => {
    expect.assertions(1);
    const data = await promise();
    expect(data).toBe('peanut butter');
  });

  test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
      await promiseError();
    } catch (e) {
      expect(e).toMatch('error');
    }
  });
});
