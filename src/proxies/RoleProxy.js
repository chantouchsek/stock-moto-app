import Proxy from './BaseProxy'

class RoleProxy extends Proxy {
  /**
   * The constructor for the RoleProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('roles', parameters)
  }

}

export default RoleProxy
