import List from './List'

describe('List', () => {
  it('should be able to instantiate a list', () => {
    const list = new List('123', 'userId', 'My list')

    expect(list).toBeDefined()
    expect(list.id).toEqual('123')
    expect(list.userId).toEqual('userId')
    expect(list.title).toEqual('My list')
    expect(list.items).toBeDefined()
  })
})
