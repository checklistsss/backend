export default interface Serializer<U, T> {
  toJSON(source: U): T
}
