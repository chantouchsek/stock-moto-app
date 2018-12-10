/* ============
 * Model Mutations
 * ============
 *
 * The mutations available for the model module.
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
   * Mutation to update the store with the fetched models.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  models    The fetched models.
   * @param {Object} pagination The fetched pagination.
   */
  [ALL] (state, { models, pagination }) {
    models.map((model) => state.all.push(model))
    state.pagination = pagination
  },

  /**
   * Mutation to update the store with the fetched models.
   *
   * @param {Object} state      The current state of the store.
   * @param {Array}  models    The fetched models.
   * @param {Object} pagination The fetched pagination.
   */
  [RELOAD] (state, { models, pagination }) {
    state.all = models
    state.pagination = pagination
  },

  /**
   * Mutation to respond to the action when an model has been created.
   *
   * @param {Object} state   The current state of the store.
   * @param {Object} model  The model that has been created.
   */
  [CREATED] (state, model) {
    const {
      totalCount,
      limit
    } = state.pagination

    state.pagination.totalCount += 1

    if (totalCount % limit === 0) {
      state.pagination.totalPages += 1
    }

    if (limit > state.all.length) {
      state.all.push(model)
    }
  },

  /**
   * Mutation to respond to the action when an model has been updated.
   *
   * @param {Object} state  The current state of the store.
   * @param {Object} model The model that has been updated.
   */
  [UPDATED] (state, model) {
    state.all = state.all.map((item) => {
      if (item.id === model.id) {
        return model
      }
      return item
    })
  },

  /**
   * Mutation to respond to the action when an model has been destroyed.
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

    // Check if the model is the last one on the page
    if (totalPages === currentPage && currentPage !== 1 && totalCount % limit === 1) {
      page -= 1
    }

    store.dispatch('model/reload', (proxy) => {
      proxy.setParameter('page', page)
    })
  }
}
