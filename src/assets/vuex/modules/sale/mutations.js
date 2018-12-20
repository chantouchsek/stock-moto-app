/* ============
 * Sale Mutations
 * ============
 *
 * The mutations available for the sale module.
 */

import store from '@/assets/vuex'
import {
  ALL,
  DETAIL,
  RELOAD,
  CREATED,
  UPDATED,
  DESTROYED
} from './mutation-types'

export default {
  /**
   * Mutation to update the store with the fetched sales.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  sales    The fetched sales.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { sales, pagination }) {
    sales.map((sale) => state.all.push(sale))
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched sales.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  sales    The fetched sales.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { sales, pagination }) {
    state.all = sales
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched sale.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  detail    The fetched sale.
   */
  [DETAIL] (state, { detail }) {
    state.detail = detail
  },

  /**
   * Mutation to respond to the action when an sale has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} sale  The sale that has been created.
   */
  [CREATED] (state, sale) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(sale)
    }
  },

  /**
   * Mutation to respond to the action when an sale has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} sale The sale that has been updated.
   */
  [UPDATED] (state, sale) {
    state.all = state.all.map((item) => {
      if (item.id === sale.id) {
        return sale
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an sale has been destroyed.
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

    // Check if the sale is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('sale/reload', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
