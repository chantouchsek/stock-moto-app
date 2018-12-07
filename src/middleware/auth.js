import store from '@/assets/vuex'
import Login from 'pages/auth/login'

export default async (to, from, resolve, reject) => {
  if (store.state.auth.authenticated) {
    console.log('Authenticated')
    resolve()
  } else {
    console.log('Unauthenticated')
    resolve({
      component: Login
    })
  }
}
