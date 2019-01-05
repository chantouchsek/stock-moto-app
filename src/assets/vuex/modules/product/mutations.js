/* ============
 * Product Mutations
 * ============
 *
 * The mutations available for the product module.
 */

import store from '@/assets/vuex'
import {
  ALL,
  SHOW,
  RELOAD,
  CREATED,
  UPDATED,
  DESTROYED,
  FETCH_FAILED
} from './mutation-types'

export default {
  /**
   * Mutation to update the store with the fetched products.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  products    The fetched products.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { products, pagination }) {
    products.map((product) => state.all.push(product))
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched products.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  products    The fetched products.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { products, pagination }) {
    state.all = products
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched product.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  product    The fetched products.
   */
  [SHOW] (state, { product }) {
    state.detail = product
  },

  /**
   * Mutation to update the store with the fetched products.
   *
   * @param {Object} state      The current state of the store.
   * @param {boolean}  empty    The fetched products.
   */
  [FETCH_FAILED] (state, { empty }) {
    state.detail = {}
    state.pagination = {
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
      limit: 5
    }
  },

  /**
   * Mutation to respond to the action when an product has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} product  The product that has been created.
   */
  [CREATED] (state, product) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(product)
    }
  },

  /**
   * Mutation to respond to the action when an product has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} product The product that has been updated.
   */
  [UPDATED] (state, product) {
    state.all = state.all.map((item) => {
      if (item.id === product.id) {
        return product
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an product has been destroyed.
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

    // Check if the product is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('product/reload', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
