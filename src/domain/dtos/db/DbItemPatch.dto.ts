import { DbItem } from './DbItem.dto'

type DbItemPatchData = Partial<Omit<DbItem, 'id'>>

export default DbItemPatchData
