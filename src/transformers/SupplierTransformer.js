/* ============
 * Supplier Transformer
 * ============
 *
 * The transformer for a supplier.
 */

import Transformer from './BaseTransformer'
import Supplier from '@/models/Supplier'

class SupplierTransformer extends Transformer {
  /**
   * Method used to transform a fetched supplier.
   *
   * @returns {Supplier} A supplier model.
   */
  static fetch (supplier) {
    return new Supplier({
      id: supplier.id,
      uuid: supplier.uuid,
      name: supplier.name,
      email: supplier.email,
      address: supplier.address,
      startProvideDate: supplier.start_provide_date,
      phoneNumber: supplier.phone_number
    })
  }

  /**
   * Method used to transform a send supplier.
   *
   * @returns {Object} The transformed supplier.
   */
  static send (supplier) {
    return {
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      address: supplier.address,
      start_work_date: supplier.startWorkDate,
      phone_number: supplier.phoneNumber
    }
  }
}

export default SupplierTransformer
