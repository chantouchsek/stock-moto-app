<template>
    <f7-page no-toolbar no-navbar no-swipeback login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list form>
            <f7-list-input
                    label="Username"
                    type="text"
                    placeholder="Your username"
                    :value="user.username"
                    @input="user.username = $event.target.value"
            ></f7-list-input>
            <f7-list-input
                    label="Password"
                    type="password"
                    placeholder="Your password"
                    :value="user.password"
                    @input="user.password = $event.target.value"
            ></f7-list-input>
        </f7-list>
        <f7-block>
            <f7-button big @click="signIn">Login</f7-button>
        </f7-block>
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
      };
    },
    methods: {
      signIn () {
        this.$store.dispatch('auth/login', this.user)
      }
    }
  }
</script>
