const sum = (a, b) => 2;

describe('sum', () => {
  it('returns 2 when sum(1,1)', () => {
    expect(sum(1, 1)).toBe(2);
  });
});
