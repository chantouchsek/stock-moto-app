/* ============
 * Expense Mutations
 * ============
 *
 * The mutations available for the expense module.
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
   * Mutation to update the store with the fetched expenses.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  expenses    The fetched expenses.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { expenses, pagination }) {
    state.all = Object.assign({}, state.all, expenses)
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched expenses.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  expenses    The fetched expenses.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { expenses, pagination }) {
    state.all = expenses
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an expense has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} expense  The expense that has been created.
   */
  [CREATED] (state, expense) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(expense)
    }
  },

  /**
   * Mutation to respond to the action when an expense has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} expense The expense that has been updated.
   */
  [UPDATED] (state, expense) {
    state.all = state.all.map((item) => {
      if (item.id === expense.id) {
        return expense
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an expense has been destroyed.
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

    // Check if the expense is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('expense/reload', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
