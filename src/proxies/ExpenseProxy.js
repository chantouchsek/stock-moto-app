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

}

export default ExpenseProxy
