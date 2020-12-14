import entry from '../src'

describe('test src entry', () => {
  it('should get right value', () => {
    expect(entry(1)).toBe(2)
  })
})
