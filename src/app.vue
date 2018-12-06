<template>
    <!-- App -->
    <f7-app :params="f7params">
        <f7-statusbar></f7-statusbar>
        <f7-panel left cover>
            <f7-view url="/panel-left/" links-view=".view-main"/>
        </f7-panel>
        <f7-view url="/" :main="true" class="ios-edges"></f7-view>
    </f7-app>
</template>
<script>
  // Import Routes...
  import routes from '@/routes'
  import store from '@/assets/vuex'

  let theme = 'auto';
  if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
  }

  export default {
    name: "app",
    store,
    data () {
      return {
        f7params: {
          theme,
          routes,
          id: 'com.moto.stock.system',
          version: '0.0.1',
          language: 'en',
          view: {
            pushState: false
          }
        }
      }
    }
  }
</script>
