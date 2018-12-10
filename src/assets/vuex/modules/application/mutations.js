/* ============
 * Application Mutations
 * ============
 *
 * The mutations available for the application module.
 */

import {
  ADD_ALERT,
  ADD_ERRORS,
  REMOVE_ALERT,
  REMOVE_ERRORS
} from './mutation-types'

export default {
  /**
   * Mutation which will add a new alert.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} alert The newly added alert.
   */
  [ADD_ALERT] (state, alert) {
    state.alert = alert
  },

  /**
   * Mutation which will add a new errors.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} errors The newly added errors.
   */
  [ADD_ERRORS] (state, errors) {
    state.errors = errors
  },

  /**
   * Mutation which will remove a alert.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} alert The alert which will be removed.
   */
  [REMOVE_ALERT] (state, alert) {
    state.alert = alert
  },

  /**
   * Mutation which will remove errors.
   *
   * @param {Object} state The current state of the store.
   */
  [REMOVE_ERRORS] (state) {
    state.errors = []
  }
}
