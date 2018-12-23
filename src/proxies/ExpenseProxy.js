import Proxy from './BaseProxy'

class ExpenseProxy extends Proxy {
  /**
   * The constructor for the ExpenseProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('expenses', parameters)
  }

  /**
   * Method used to update a given item.
   *
   * @param {int} id The given identifier.
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  upload (id, item) {
    return this.submit('post', `/${this.endpoint}/${id}/uploads`, item)
  }

  /**
   * Method used to destroy a given item.
   *
   * @param {int} id The given identifier.
   *
   * @param {int} mediaId
   * @returns {Promise} The result in a promise.
   */
  destroyFile (id, mediaId) {
    return this.submit('delete', `/${this.endpoint}/${id}/uploads/${mediaId}`)
  }
}

export default ExpenseProxy
