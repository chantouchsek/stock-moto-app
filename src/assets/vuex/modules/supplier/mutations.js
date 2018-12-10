/* ============
 * Supplier Mutations
 * ============
 *
 * The mutations available for the supplier module.
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
   * Mutation to update the store with the fetched suppliers.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  suppliers    The fetched suppliers.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { suppliers, pagination }) {
    suppliers.map((supplier) => state.all.push(supplier))
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched suppliers.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  suppliers    The fetched suppliers.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { suppliers, pagination }) {
    state.all = suppliers
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an supplier has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} supplier  The supplier that has been created.
   */
  [CREATED] (state, supplier) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(supplier)
    }
  },

  /**
   * Mutation to respond to the action when an supplier has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} supplier The supplier that has been updated.
   */
  [UPDATED] (state, supplier) {
    state.all = state.all.map((item) => {
      if (item.id === supplier.id) {
        return supplier
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an supplier has been destroyed.
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

    // Check if the supplier is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('supplier/reload', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
