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
      total: expense.total,
      expenses: expense.expenses.map(exp => ({
        "id": exp.id,
        "uuid": exp.uuid,
        "amount": exp.amount,
        "expenseOn": exp.expense_on,
        "notes": exp.notes,
        "user_id": exp.user_id,
        "user": {
          "id": 3,
          "uuid": "4c7acfb6-5405-43bb-988f-85b0b2277488",
          "first_name": "Norwood",
          "last_name": "Schuppe",
          "email": "hayden.rice@example.net",
          "phone_number": "+1-586-906-5927",
          "username": "joey.bauch",
          "email_verified_at": "2018-12-13 22:20:09",
          "gender": 1,
          "date_of_birth": "1983-08-16 00:00:00",
          "bio": "Architecto odio et est ut maxime esse tempore. Quibusdam error omnis assumenda enim maxime. Culpa consequuntur sapiente distinctio sed saepe. Quo et ducimus assumenda voluptate.",
          "address": "1158 Yvonne Ridges\nDillonside, DC 30577-3472",
          "start_work_date": "1977-08-22 00:00:00",
          "pay_day": "2007-11-24",
          "base_salary": "500.00",
          "avatar_url": "https://lorempixel.com/640/480/?54525",
          "status": 1,
          "resigned_at": null,
          "locale": "en",
          "bonus": "20.00",
          "created_at": "2018-12-13 22:20:09",
          "updated_at": "2018-12-22 14:28:27",
          "deleted_at": null,
          "full_name": "Norwood Schuppe"
        },
        "date": exp.date
      }))
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
