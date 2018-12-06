<template>
    <f7-page>
        <f7-navbar title="About F7" back-link="Back" sliding></f7-navbar>
        <f7-block-title>{{ user.name ? "You are already logged" : "Please login" }}</f7-block-title>
        <f7-list>
            <f7-list-group v-if="user.name">
                <f7-list-item>ID: {{ user.id }}</f7-list-item>
                <f7-list-item>Username: {{ user.name }}</f7-list-item>
            </f7-list-group>
        </f7-list>
        <f7-list>
            <f7-list-button color="blue" v-on:click="loginAction">Login Button</f7-list-button>
        </f7-list>
    </f7-page>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    },
    methods: {
      loginAction: function () {
        this.$store.dispatch('auth/userLogged', { name: "User", id: "#1" })
      }
    }
  }
</script>
