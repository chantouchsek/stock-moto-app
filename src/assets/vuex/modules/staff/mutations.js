/* ============
 * Role Mutations
 * ============
 *
 * The mutations available for the staff module.
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
   * Mutation to update the store with the fetched staffs.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  staffs    The fetched staffs.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { staffs, pagination }) {
    staffs.map((staff) => state.all.push(staff))
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched staffs.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  staffs    The fetched staffs.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { staffs, pagination }) {
    state.all = staffs
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an staff has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} staff  The staff that has been created.
   */
  [CREATED] (state, staff) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(staff)
    }
  },

  /**
   * Mutation to respond to the action when an staff has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} staff The staff that has been updated.
   */
  [UPDATED] (state, staff) {
    state.all = state.all.map((item) => {
      if (item.id === staff.id) {
        return staff
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an staff has been destroyed.
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

    // Check if the staff is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('staff/reload', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
