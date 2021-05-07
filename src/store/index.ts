import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex';

import user from './user';
import { UserStateInterface } from './user/state';

export interface StateInterface {
  user: UserStateInterface;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key');

export default store(function(/* { ssrContext } */) {
  return createStore<StateInterface>({
    modules: {
      user
    },

    strict: !!process.env.DEBUGGING
  });
});

export function useStore() {
  return vuexUseStore(storeKey);
}
