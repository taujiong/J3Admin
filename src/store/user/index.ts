import { Module } from 'vuex';
import { StateInterface } from '../index';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state, { UserStateInterface } from './state';

const user: Module<UserStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default user;
