/* ============
 * Customer Mutations
 * ============
 *
 * The mutations available for the customer module.
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
   * Mutation to update the store with the fetched customers.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  customers    The fetched customers.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { customers, pagination }) {
    customers.map((customer) => state.all.push(customer))
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched customers.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  customers    The fetched customers.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { customers, pagination }) {
    state.all = customers
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an customer has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} customer  The customer that has been created.
   */
  [CREATED] (state, customer) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(customer)
    }
  },

  /**
   * Mutation to respond to the action when an customer has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} customer The customer that has been updated.
   */
  [UPDATED] (state, customer) {
    state.all = state.all.map((item) => {
      if (item.id === customer.id) {
        return customer
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an customer has been destroyed.
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

    // Check if the customer is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('customer/reload', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
