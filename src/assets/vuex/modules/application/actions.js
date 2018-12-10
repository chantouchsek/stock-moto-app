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
 * Action fired to add new errors.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   payload The payload.
 */
const addErrors = ({ commit }, payload) => {
  commit(types.ADD_ERRORS, payload)
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

/**
 * Action fired to remove errors.
 *
 * @param {function} commit  Commit function to update the store.
 */
const removeErrors = ({ commit }) => {
  commit(types.REMOVE_ERRORS)
}

export default {
  addAlert,
  addErrors,
  removeAlert,
  removeErrors
}
