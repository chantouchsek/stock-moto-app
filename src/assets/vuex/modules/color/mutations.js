/* ============
 * Color Mutations
 * ============
 *
 * The mutations available for the color module.
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
   * Mutation to update the store with the fetched colors.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  colors    The fetched colors.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { colors, pagination }) {
    colors.map((color) => state.all.push(color))
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched colors.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  colors    The fetched colors.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { colors, pagination }) {
    state.all = colors
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an color has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} color  The color that has been created.
   */
  [CREATED] (state, color) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(color)
    }
  },

  /**
   * Mutation to respond to the action when an color has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} color The color that has been updated.
   */
  [UPDATED] (state, color) {
    state.all = state.all.map((item) => {
      if (item.id === color.id) {
        return color
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an color has been destroyed.
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

    // Check if the color is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('color/reload', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
