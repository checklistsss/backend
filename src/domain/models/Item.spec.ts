import Item from './Item'
import { ItemStatus } from './ItemStatus'

describe('Item', () => {
  it('should be able to instantiate a list', () => {
    const item = new Item('123', 'Buy pasta', ItemStatus.IN_PROGRESS)

    expect(item).toBeDefined()
    expect(item.id).toEqual('123')
    expect(item.status).toEqual(ItemStatus.IN_PROGRESS)
  })
})
