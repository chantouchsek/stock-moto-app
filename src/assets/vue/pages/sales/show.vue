<template>
    <f7-page>
        <f7-navbar title="Sale Detail" back-link="Back" sliding></f7-navbar>
        <f7-list>
            <f7-list-item>Sale #: {{ sale.detail.id }}</f7-list-item>
            <f7-list-item>Sale By: {{ sale.detail.user ? sale.detail.user.full_name : '' }}</f7-list-item>
            <f7-list-item>Customer: {{ sale.detail.customer ? sale.detail.customer.full_name : '' }}</f7-list-item>
            <f7-list-item>Is in lack: {{ sale.detail.isInLack }}</f7-list-item>
            <f7-list-item>In lack amount: {{ sale.detail.inLackAmount }}</f7-list-item>
            <f7-list-item>Date: {{ sale.detail.createdAt }}</f7-list-item>
            <f7-list-item>Tax: {{ sale.detail.tax }}</f7-list-item>
            <f7-list-item>Tax amount: {{ sale.detail.taxAmount }}</f7-list-item>
            <f7-list-item>Total: {{ sale.detail.total }}</f7-list-item>
            <f7-block-title>Product</f7-block-title>
            <f7-list>
                <f7-list-item v-if="sale.detail.product"
                              :header="`Name: ${sale.detail.product.name}`"
                              :key="`product-index-${sale.detail.product.id}`"
                ></f7-list-item>
            </f7-list>
            <f7-block-title>Attachments: </f7-block-title>
            <f7-list>
                <f7-list-item v-for="(file, index) in sale.detail.files"
                              :header="`Name: ${file.file_name}`"
                              :key="`file-index-${index}`"
                ></f7-list-item>
            </f7-list>
        </f7-list>
    </f7-page>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    name: 'staff-show',
    computed: {
      ...mapState(['sale'])
    },
    data () {
      return {
        //
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('sale/detail', this.$f7route.params.uuid)
        }
      })
    }
  }
</script>
