/* ============
 * Expense Actions
 * ============
 *
 * The actions available for the expense module.
 */

import * as types from './mutation-types'
import store from '@/assets/vuex'
import Proxy from '@/proxies/ExpenseProxy'
import ExpenseTransformer from '@/transformers/ExpenseTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'
import SaleTransformer from 'src/transformers/SaleTransformer'

const proxy = new Proxy()

/**
 * Action fired when all expenses will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const all = async ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  await proxy.all()
    .then((response) => {
      const data = {
        expenses: response.data,
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when all expenses will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const reload = async ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  await proxy.all()
    .then((response) => {
      const data = {
        expenses: response.data,
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD, data)
    })
}

/**
 * Action fired when an expense will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that will be created.
 */
const create = ({ commit }, expense) => {
  const transformedExpense = ExpenseTransformer.send(expense)

  proxy.create(transformedExpense)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        created: true
      })
    })
    .catch((response) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The expense could not be created'
      })
      store.dispatch('application/addErrors', {
        type: 'danger',
        errors: response.errors,
        error: true
      })
    })
}

/**
 * Action fired when an expense has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that has been created.
 */
const created = ({ commit }, expense) => {
  commit(types.CREATED, ExpenseTransformer.fetch(expense))
}

/**
 * Action fired when an expense will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that will be updated.
 */
const update = ({ commit }, expense) => {
  const transformedExpense = ExpenseTransformer.send(expense)

  proxy.update(expense.uuid, transformedExpense)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        edited: true
      })
      store.dispatch('expense/updated', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The expense could not be updated'
      })
    })
}

/**
 * Action fired when an expense has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that has been updated.
 */
const updated = ({ commit }, expense) => {
  commit(types.UPDATED, ExpenseTransformer.fetch(expense))
}

/**
 * Action fired when an expense will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that will be destroyed.
 */
const destroy = ({ commit }, expense) => {
  proxy.destroy(expense.uuid)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Expense has been destroyed!',
        destroyed: true
      })
      store.dispatch('expense/destroyed', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The expense could not be destroyed'
      })
    })
}

/**
 * Action fired when an expense has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   expense  The expense that has been destroyed.
 */
const destroyed = ({ commit }, expense) => {
  commit(types.DESTROYED, ExpenseTransformer.fetch(expense))
}

/**
 * Action fired when a expense will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {int|string}   uuid  The expense that will be updated.
 */
const detail = ({ commit }, uuid) => {
  proxy.find(uuid)
    .then((response) => {
      const data = {
        detail: ExpenseTransformer.fetch(response)
      }
      commit(types.DETAIL, data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The expense could not be fetched.'
      })
    })
}

export default {
  all,
  detail,
  reload,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed
}
