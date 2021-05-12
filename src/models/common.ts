export interface Type<T> {
  new(...args: never[]): T
}

export interface Factory<P, R> {
  (arg: P): R
}
