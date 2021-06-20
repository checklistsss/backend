export default interface JSONSerializable<T> {
  toJSON(): T
}
