/* ============
 * Category Mutations
 * ============
 *
 * The mutations available for the category module.
 */

import store from '@/assets/vuex'
import {
  ALL,
  CREATED,
  UPDATED,
  DESTROYED
} from './mutation-types'

export default {
  /**
   * Mutation to update the store with the fetched categories.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  categories    The fetched categories.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { categories, pagination }) {
    categories.map((category) => state.all.push(category))
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an category has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} category  The category that has been created.
   */
  [CREATED] (state, category) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(category)
    }
  },

  /**
   * Mutation to respond to the action when an category has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} category The category that has been updated.
   */
  [UPDATED] (state, category) {
    state.all = state.all.map((item) => {
      if (item.id === category.id) {
        return category
      }

      return item
    })
  },

  /**
   * Mutation to respond to the action when an category has been destroyed.
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

    // Check if the category is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('category/all', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
