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
      product: sale.product,
      customerName: sale.customer_name,
      user: sale.user,
      date: sale.date,
      files: sale.files
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
      engine_number: sale.engineNumber,
      is_in_lack: sale.isInLack,
      in_lack_amount: sale.inLackAmount,
      total: sale.total,
      tax: sale.tax,
      tax_amount: sale.taxAmount,
      product_id: sale.productId,
      customer_name: sale.customerName,
      amount: sale.amount,
      price: sale.price,
      date: sale.date,
      files: sale.files
    }
  }
}

export default SaleTransformer
