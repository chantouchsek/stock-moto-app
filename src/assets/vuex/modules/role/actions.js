/* ============
 * Role Actions
 * ============
 *
 * The actions available for the role module.
 */

import * as types from './mutation-types'
import store from '@/assets/vuex'
import Proxy from '@/proxies/RoleProxy'
import RoleTransformer from '@/transformers/RoleTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all roles will be fetched.
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
        roles: RoleTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when all roles will be fetched.
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
        roles: RoleTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD, data)
    })
}

/**
 * Action fired when an role will be created.
 *
 * @param {Object}   role  The role that will be created.
 */
const create = (role) => {
  const transformedRole = RoleTransformer.send(role)

  proxy.create(transformedRole)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Role has been created!'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The role could not be created'
      })
    })
}

/**
 * Action fired when an role has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   role  The role that has been created.
 */
const created = ({ commit }, role) => {
  commit(types.CREATED, RoleTransformer.fetch(role))
}

/**
 * Action fired when an role will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   role  The role that will be updated.
 */
const update = ({ commit }, role) => {
  const transformedRole = RoleTransformer.send(role)

  proxy.update(role.id, transformedRole)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        edited: true
      })
      store.dispatch('role/updated', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The role could not be updated'
      })
    })
}

/**
 * Action fired when an role has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   role  The role that has been updated.
 */
const updated = ({ commit }, role) => {
  commit(types.UPDATED, RoleTransformer.fetch(role))
}

/**
 * Action fired when an role will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   role  The role that will be destroyed.
 */
const destroy = ({ commit }, role) => {
  proxy.destroy(role.id)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Role has been destroyed!',
        destroyed: true
      })
      store.dispatch('role/destroyed', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The role could not be destroyed'
      })
    })
}

/**
 * Action fired when an role has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   role  The role that has been destroyed.
 */
const destroyed = ({ commit }, role) => {
  commit(types.DESTROYED, RoleTransformer.fetch(role))
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
