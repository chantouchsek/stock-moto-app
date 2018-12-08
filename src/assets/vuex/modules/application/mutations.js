/* ============
 * Application Mutations
 * ============
 *
 * The mutations available for the application module.
 */

import {
  ADD_ALERT,
  REMOVE_ALERT
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
   * Mutation which will remove a alert.
   *
   * @param {Object} state The current state of the store.
   * @param {Object} alert The alert which will be removed.
   */
  [REMOVE_ALERT] (state, alert) {
    state.alert = alert
  }
}
