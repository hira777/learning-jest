test.only('this will be the only test that runs', () => {
  // expect(true).toBe(false);
});

// ↑で test.only を実行しているので、この test は実行されない
test('this test will not run', () => {
  expect('A').toBe('A');
});
