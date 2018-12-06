import store from '@/assets/vuex'

export default async (to, from, resolve, reject) => {
  if (store.state.auth.authenticated) {
    console.log('Authenticated')
    resolve()
  } else {
    console.log('Unauthenticated')
    resolve({ path: '/login-page/' })
  }
}
