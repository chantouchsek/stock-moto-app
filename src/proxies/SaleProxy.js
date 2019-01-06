import Proxy from './BaseProxy'

class SaleProxy extends Proxy {
  /**
   * The constructor for the SaleProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('sales', parameters)
  }

  /**
   * Method used to create an item.
   *
   * @param {Object} item The given item.
   *
   * @returns {Promise} The result in a promise.
   */
  create (item) {
    let form = new FormData()
    for (let key in item) {
      form.append(key, item[key])
    }
    if (Array.isArray(item.files)) {
      for (let i = 0; i < item.files.length; i++) {
        form.append('files[]', item.files[i])
      }
    }
    return this.submit('post', `/${this.endpoint}`, form)
  }

}

export default SaleProxy
