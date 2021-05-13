import { ComputedRef, DeepReadonly, UnwrapRef } from 'vue';

export interface Type<T> {
  new(...args: never[]): T
}

export interface Factory<P, R> {
  (arg: P): R
}

export type VueComputedReadonlyRef<T> = ComputedRef<DeepReadonly<UnwrapRef<T>>>;
