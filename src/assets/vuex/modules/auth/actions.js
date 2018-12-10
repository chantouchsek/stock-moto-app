/* ============
 * Auth Actions
 * ============
 *
 * The actions available for the auth module.
 */

import Vue from 'vue';
import * as types from './mutation-types';
import store from '@/assets/vuex';
import Proxy from '@/proxies/AuthProxy';
import AuthTransformer from '@/transformers/AuthTransformer';

const proxy = new Proxy();

/**
 * Action which will check the authentication.
 *
 * @param {function} commit Commit function to update the store.
 */
export const check = async ({ commit }) => {
  commit(types.CHECK)
}

/**
 * Action which will try to login the user.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
export const login = ({ commit }, payload) => {
  proxy.login(payload)
    .then((response) => {
      commit(types.LOGIN, AuthTransformer.fetch(response));

      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Login successful!',
        isLoggedIn: true
      })
      // Fetch the user.
      store.dispatch('auth/fetchUser')
    })
    .catch((response) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'Please check your email and password.'
      })
    })
}

/**
 * Action which will try to logout the user.
 *
 * @param {function} commit Commit function to update the store.
 */
export const logout = async ({ commit }) => {
  commit(types.LOGOUT)

  store.dispatch('application/addAlert', {
    type: 'success',
    message: 'Logout successful!'
  })
}
/**
 * Action which fire when save user token to local storage
 * @param commit
 * @param payload
 * @returns {Promise<void>}
 */
export const saveToken = async ({ commit }, payload) => {
  commit(types.SAVE_TOKEN, payload)
}

/**
 * Action will fire when fetch user logged in
 * @param commit
 * @returns {Promise<void>}
 */
export const fetchUser = async ({ commit }) => {
  try {
    const { data } = await Vue.$http.get('/user')
    commit(types.FETCH_USER_SUCCESS, { user: data })
  } catch (e) {
    commit(types.FETCH_USER_FAILURE)
  }

}

export const userLogged = ({ commit }, user) => {
  commit(types.USER_LOGGED, user)
}

export default {
  check,
  login,
  logout,
  saveToken,
  fetchUser,
  userLogged
}
