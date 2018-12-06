/* ============
 * Auth Module
 * ============
 */

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
