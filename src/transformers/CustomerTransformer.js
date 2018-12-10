/* ============
 * Customer Transformer
 * ============
 *
 * The transformer for a customer.
 */

import Transformer from './BaseTransformer'
import Customer from '@/models/Customer'

class CustomerTransformer extends Transformer {
  /**
   * Method used to transform a fetched customer.
   *
   * @returns {Customer} A customer model.
   */
  static fetch (customer) {
    return new Customer({
      id: customer.id,
      uuid: customer.uuid,
      fullName: customer.full_name,
      firstName: customer.first_name,
      lastName: customer.last_name,
      email: customer.email,
      address: customer.address,
      dateOfBirth: customer.date_of_birth,
      phoneNumber: customer.phone_number
    })
  }

  /**
   * Method used to transform a send customer.
   *
   * @returns {Object} The transformed customer.
   */
  static send (customer) {
    return {
      id: customer.id,
      first_name: customer.firstName,
      last_name: customer.lastName,
      email: customer.email,
      address: customer.address,
      date_of_birth: customer.dateOfBirth,
      phone_number: customer.phoneNumber
    }
  }
}

export default CustomerTransformer
