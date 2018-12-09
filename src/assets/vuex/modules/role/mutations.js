/* ============
 * Role Mutations
 * ============
 *
 * The mutations available for the role module.
 */

import store from '@/assets/vuex'
import {
  ALL,
  RELOAD,
  CREATED,
  UPDATED,
  DESTROYED
} from './mutation-types'

export default {
  /**
   * Mutation to update the store with the fetched roles.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  roles    The fetched roles.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { roles, pagination }) {
    roles.map((role) => state.all.push(role))
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched roles.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  roles    The fetched roles.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { roles, pagination }) {
    state.all = roles
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an role has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} role  The role that has been created.
   */
  [CREATED] (state, role) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(role)
    }
  },

  /**
   * Mutation to respond to the action when an role has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} role The role that has been updated.
   */
  [UPDATED] (state, role) {
    state.all = state.all.map((item) => {
      if (item.id === role.id) {
        return role
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an role has been destroyed.
   *
   * @param {Object} state The current state of the store.
   */
  [DESTROYED] (state) {
    const {
      currentPage,
      totalCount,
      limit,
      totalPages
    } = state.pagination

    let page = currentPage

    // Check if the role is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('role/reload', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
