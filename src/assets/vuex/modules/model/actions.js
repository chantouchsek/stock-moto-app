/* ============
 * Model Actions
 * ============
 *
 * The actions available for the model module.
 */

import * as types from './mutation-types'
import store from '@/assets/vuex'
import Proxy from '@/proxies/ModelProxy'
import ModelTransformer from '@/transformers/ModelTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all models will be fetched.
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
        models: ModelTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when all models will be fetched.
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
        models: ModelTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.RELOAD, data)
    })
}

/**
 * Action fired when an model will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   model  The model that will be created.
 */
const create = ({ commit }, model) => {
  const transformedModel = ModelTransformer.send(model)

  proxy.create(transformedModel)
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
        message: 'The model could not be created'
      })
      store.dispatch('application/addErrors', {
        type: 'danger',
        errors: response.errors,
        error: true
      })
    })
}

/**
 * Action fired when an model has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   model  The model that has been created.
 */
const created = ({ commit }, model) => {
  commit(types.CREATED, ModelTransformer.fetch(model))
}

/**
 * Action fired when an model will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   model  The model that will be updated.
 */
const update = ({ commit }, model) => {
  const transformedModel = ModelTransformer.send(model)

  proxy.update(model.uuid, transformedModel)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: response.message,
        edited: true
      })
      store.dispatch('model/updated', response.data)
    })
    .catch((response) => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The model could not be updated'
      })
      store.dispatch('application/addErrors', {
        type: 'danger',
        errors: response.errors,
        error: true
      })
    })
}

/**
 * Action fired when an model has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   model  The model that has been updated.
 */
const updated = ({ commit }, model) => {
  commit(types.UPDATED, ModelTransformer.fetch(model))
}

/**
 * Action fired when an model will be destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   model  The model that will be destroyed.
 */
const destroy = ({ commit }, model) => {
  proxy.destroy(model.uuid)
    .then((response) => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Model has been destroyed!',
        destroyed: true
      })
      store.dispatch('model/destroyed', response.data)
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The model could not be destroyed'
      })
    })
}

/**
 * Action fired when an model has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   model  The model that has been destroyed.
 */
const destroyed = ({ commit }, model) => {
  commit(types.DESTROYED, ModelTransformer.fetch(model))
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
