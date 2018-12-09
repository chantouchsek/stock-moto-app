import Proxy from './BaseProxy'

class StaffProxy extends Proxy {
  /**
   * The constructor for the RoleProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('users', parameters)
  }

}

export default StaffProxy
