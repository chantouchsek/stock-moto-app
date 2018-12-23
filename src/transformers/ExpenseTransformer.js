/* ============
 * Expense Transformer
 * ============
 *
 * The transformer for a expense.
 */

import Transformer from './BaseTransformer'
import Expense from '@/models/Expense'

class ExpenseTransformer extends Transformer {
  /**
   * Method used to transform a fetched expense.
   *
   * @returns {Expense} A expense model.
   */
  static fetch (expense) {
    return new Expense({
      id: expense.id,
      uuid: expense.uuid,
      amount: expense.amount,
      expenseOn: expense.expense_on,
      date: expense.date,
      notes: expense.notes,
      user: expense.user,
      files: expense.files
    })
  }

  /**
   * Method used to transform a send expense.
   *
   * @returns {Object} The transformed expense.
   */
  static send (expense) {
    return {
      id: expense.id,
      amount: expense.amount,
      expense_on: expense.expenseOn,
      date: expense.date,
      notes: expense.notes
    }
  }
}

export default ExpenseTransformer
