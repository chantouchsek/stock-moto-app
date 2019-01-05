<template>
    <f7-page>
        <f7-navbar title="Product detail" back-link="Back" sliding>
            <f7-nav-right>
                <f7-link @click.navtive="getEditRoute(product.uuid)">
                    <i class="f7-icons">edit</i>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-list>
            <f7-list-item>Name: {{ product.name }}</f7-list-item>
            <f7-list-item>Cost: ${{ product.cost }}</f7-list-item>
            <f7-list-item>Price: ${{ product.price }}</f7-list-item>
            <f7-list-item>Qty: {{ product.qty }}</f7-list-item>
            <f7-list-item>Category: {{ product.category ? product.category.name : '' }}</f7-list-item>
            <f7-list-item>Make: {{ product.make ? product.make.name : '' }}</f7-list-item>
            <f7-list-item>Model: {{ product.model ? product.model.name : '' }}</f7-list-item>
            <f7-list-item>Supplier: {{ product.supplier ? product.supplier.name : '' }}</f7-list-item>
            <f7-list-item>Import from: {{ product.importFrom }}</f7-list-item>
            <f7-list-item>Date import: {{ product.dateImport }}</f7-list-item>
            <f7-list-item>Year: {{ product.year }}</f7-list-item>
        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill @click.native="getEditRoute(product.uuid)" big outline round>
                        <i class="f7-icons size-16">edit</i> Edit
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill color="red" big outline round @click.native="destroyProduct(product)">
                        <i class="f7-icons size-16">trash</i> Delete
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill @click="goBack" big outline round color="yellow">
                        <i class="f7-icons size-16">chevron_left</i> Cancel
                    </f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>
<script>
  import ProductProxy from '@/proxies/ProductProxy'
  import ProductTransformer from '@/transformers/ProductTransformer'

  const proxy = new ProductProxy()

  export default {
    name: 'product-show',
    data () {
      return {
        product: {}
      }
    },
    methods: {
      async fetchProduct (uuid) {
        await proxy.find(uuid).then((response) => {
          this.product = ProductTransformer.fetch(response)
        }).catch((error) => {
          console.log(error)
        })
      },
      /**
       * Method used to get the product route.
       *
       * @param {Number} uuid The product identifier.
       *
       * @returns {Object} The product route.
       */
      getEditRoute (uuid) {
        this.$f7router.navigate({
          name: 'products.edit',
          params: { uuid: uuid }
        })
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        const self = this
        self.$f7router.back()
      },

      /**
       * Delete the resource
       */
      destroyProduct (product) {
        const self = this
        const app = self.$f7
        app.dialog.confirm('Are you sure to delete?', 'Confirm', () => {
          app.preloader.show()
          self.$store.dispatch('product/destroy', product)
        })
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          // this.$store.dispatch('product/show', this.$f7route.params.uuid)
          this.fetchProduct(this.$f7route.params.uuid)
        }
      })
    }
  }
</script>
