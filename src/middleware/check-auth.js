import store from '@/assets/vuex'

export default async (to, from, resolve, reject) => {
  if (!store.state.auth.authenticated && store.state.auth.token) {
    try {
      await store.dispatch('auth/fetchUser')
    } catch (e) {
      reject(e)
    }
  }

  next()
}
