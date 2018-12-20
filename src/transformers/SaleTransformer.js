/* ============
 * Sale Transformer
 * ============
 *
 * The transformer for a sale.
 */

import Transformer from './BaseTransformer'
import Sale from '@/models/Sale'

class SaleTransformer extends Transformer {
  /**
   * Method used to transform a fetched sale.
   *
   * @returns {Sale} A sale model.
   */
  static fetch (sale) {
    return new Sale({
      id: sale.id,
      uuid: sale.uuid,
      customerId: sale.customer_id,
      userId: sale.user_id,
      isInLack: sale.is_in_lack,
      inLackAmount: sale.in_lack_amount,
      total: sale.total,
      tax: sale.tax,
      taxAmount: sale.tax_amount,
      createdAt: sale.created_at,
      products: sale.products,
      customer: sale.customer,
      user: sale.user
    })
  }

  /**
   * Method used to transform a send sale.
   *
   * @returns {Object} The transformed sale.
   */
  static send (sale) {
    return {
      id: sale.id,
      customer_id: sale.customerId,
      user_id: sale.userId,
      is_in_lack: sale.isInLack,
      in_lack_amount: sale.inLackAmount,
      total: sale.total,
      tax: sale.tax,
      tax_amount: sale.taxAmount
    }
  }
}

export default SaleTransformer
