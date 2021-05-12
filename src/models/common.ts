export interface Type<T> {
  new(...args: never[]): T
}
