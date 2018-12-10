/* ============
 * Staff Actions
 * ============
 *
 * The actions available for the staff module.
 */

import * as types from './mutation-types'
import store from '@/assets/vuex'
import Proxy from '@/proxies/StaffProxy'
import StaffTransformer from '@/transformers/StaffTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all staffs will be fetched.
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
        staffs: StaffTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when all staffs will be fetched.
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
        staffs: StaffTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD, data)
    })
}

/**
 * Action fired when an staff will be created.
 *
 * @param {function} commit Commit function to update the store.
 * @param {Object}   staff  The staff that will be created.
 */
const create = ({ commit }, staff) => {
  const transformedStaff = StaffTransformer.send(staff)

  proxy.create(transformedStaff)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Staff has been created!'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The staff could not be created'
      })
    })
}

/**
 * Action fired when an staff has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   staff  The staff that has been created.
 */
const created = ({ commit }, staff) => {
  commit(types.CREATED, StaffTransformer.fetch(staff))
}

/**
 * Action fired when an staff will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   staff  The staff that will be updated.
 */
const update = ({ commit }, staff) => {
  const transformedStaff = StaffTransformer.send(staff)

  proxy.update(staff.uuid, transformedStaff)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        edited: true
      })
      store.dispatch('staff/updated', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The staff could not be updated'
      })
    })
}

/**
 * Action fired when an staff has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   staff  The staff that has been updated.
 */
const updated = ({ commit }, staff) => {
  commit(types.UPDATED, StaffTransformer.fetch(staff))
}

/**
 * Action fired when an staff will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   staff  The staff that will be destroyed.
 */
const destroy = ({ commit }, staff) => {
  proxy.destroy(staff.uuid)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Staff has been destroyed!',
        destroyed: true
      })
      store.dispatch('staff/destroyed', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The staff could not be destroyed'
      })
    })
}

/**
 * Action fired when an staff has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   staff  The staff that has been destroyed.
 */
const destroyed = ({ commit }, staff) => {
  commit(types.DESTROYED, StaffTransformer.fetch(staff))
}

export default {
  all,
  reload,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed
}
