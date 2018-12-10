/* ============
 * Make Mutations
 * ============
 *
 * The mutations available for the make module.
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
   * Mutation to update the store with the fetched makes.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  makes    The fetched makes.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { makes, pagination }) {
    makes.map((make) => state.all.push(make))
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched makes.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  makes    The fetched makes.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { makes, pagination }) {
    state.all = makes
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an make has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} make  The make that has been created.
   */
  [CREATED] (state, make) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(make)
    }
  },

  /**
   * Mutation to respond to the action when an make has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} make The make that has been updated.
   */
  [UPDATED] (state, make) {
    state.all = state.all.map((item) => {
      if (item.id === make.id) {
        return make
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an make has been destroyed.
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

    // Check if the make is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('make/reload', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
