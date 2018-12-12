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

  /**
   * Method used to update a given item.
   *
   * @param {int} id The given identifier.
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  uploadAvatar (id, item) {
    return this.submit('post', `/${this.endpoint}/${id}/upload-avatar`, item)
  }
}

export default StaffProxy
