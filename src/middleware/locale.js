import store from '@/assets/vuex'
import { loadMessages } from '@/plugins/i18n'

export default async (to, from, resolve, reject) => {
  await loadMessages(store.getters['lang/locale'])
  resolve()
}
