<template>
    <f7-page>
        <f7-navbar back-link="Back" sliding>
            <f7-nav-title>Stock Moto</f7-nav-title>
        </f7-navbar>
        <f7-block-title>Sells List</f7-block-title>
        <f7-list>
            <f7-list-item title="$2,345" after="10/10/2018" link="/sales/1"></f7-list-item>
            <f7-list-item title="$54,642" after="11/10/2018" link="/sales/2"></f7-list-item>
            <f7-list-item title="$542,343.54" after="12/10/2018" link="/sales/3"></f7-list-item>
        </f7-list>

        <f7-fab position="right-bottom"
                slot="fixed"
                @click.native="redirectToCreatePage">
            <f7-icon ios="f7:add" md="material:add"></f7-icon>
        </f7-fab>

    </f7-page>
</template>
<script>
  export default {
    name: 'SellsIndex',
    data () {
      return {
        //
      }
    },
    methods: {
      /**
       * Create the resource
       */
      redirectToCreatePage () {
        const self = this
        self.$f7router.navigate({ name: 'sales.create' })
      },
    },
  }
</script>
