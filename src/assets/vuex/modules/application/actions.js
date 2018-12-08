/* ============
 * Application Actions
 * ============
 *
 * The actions available for the Application module.
 */
import * as types from './mutation-types'

/**
 * Action fired to add a new alert.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
const addAlert = ({ commit }, payload) => {
  commit(types.ADD_ALERT, payload)
}

/**
 * Action fired to remove an alert.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
const removeAlert = ({ commit }, payload) => {
  commit(types.REMOVE_ALERT, payload)
}

export default {
  addAlert,
  removeAlert
}
