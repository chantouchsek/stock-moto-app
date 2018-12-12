<template>
    <f7-page no-toolbar no-navbar no-swipeback login-screen>
        <div class="avatar-upload">
            <div class="avatar-preview">
                <div id="imagePreview" style="background-image: url(http://i.pravatar.cc/500?img=7);">
                </div>
            </div>
        </div>
        <f7-list form>
            <f7-list-input
                    label="Email"
                    type="email"
                    placeholder="Your email"
                    info="Default validation"
                    required
                    validate
                    clear-button
                    floating-label
                    :value="user.username"
                    @input="user.username = $event.target.value"
            >
            </f7-list-input>
            <f7-list-input
                    label="Password"
                    type="password"
                    placeholder="Your password"
                    info="Default validation"
                    required
                    validate
                    clear-button
                    floating-label
                    :value="user.password"
                    @input="user.password = $event.target.value"
            >
            </f7-list-input>
            <f7-block>
                <f7-button big @click="signIn" fill color="green" type="submit">Login</f7-button>
            </f7-block>
        </f7-list>
    </f7-page>
</template>
<script>
  export default {
    name: 'Login-Page',
    data () {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      errorMessage () {
        let message = this.$store.state.application.errors
        if (Object.keys(message).length && typeof message !== 'undefined') {
          return message
        }
        return {}
      }
    },
    methods: {
      signIn () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('auth/login', this.user)
      }
    },
    watch: {
      '$store.state.auth': {
        deep: true,
        immediate: true,
        handler (value) {
          if (value.authenticated) {
            const self = this
            self.$f7router.refreshPage()
          }
        }
      }
    }
  }
</script>
