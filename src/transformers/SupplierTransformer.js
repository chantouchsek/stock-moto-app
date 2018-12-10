/* ============
 * Supplier Transformer
 * ============
 *
 * The transformer for a suppliers.
 */

import Transformer from './BaseTransformer'
import Supplier from '@/models/Supplier'

class SupplierTransformer extends Transformer {
  /**
   * Method used to transform a fetched suppliers.
   *
   * @returns {Supplier} A suppliers model.
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
   * Method used to transform a send suppliers.
   *
   * @returns {Object} The transformed suppliers.
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
