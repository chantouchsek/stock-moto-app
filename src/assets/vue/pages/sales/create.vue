<template>
    <f7-page>
        <f7-navbar title="New Sale" back-link="Back" sliding></f7-navbar>

        <f7-list no-hairlines-md form>

            <f7-list-input
                    label="Engine number"
                    type="text"
                    placeholder="Enter product engine number"
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="sale.engineNumber"
                    @input="setQuery($event.target.value, 'engineNumber')"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Product"
                    type="select"
                    placeholder="Please choose..."
                    disabled
                    :value="sale.productId = product.detail.id"
                    @input="setQuery($event.target.value, 'productId')"
            >
                <option value=""></option>
                <option v-for="(pro,index) in product.all" :key="`product-select-${index}`" :value="pro.id">
                    {{ pro.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Frame number"
                    type="text"
                    placeholder="Enter product frame number"
                    :value="sale.frameNumber = product.detail.frameNumber"
                    disabled
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Plate number"
                    type="text"
                    placeholder="Enter plate number"
                    :value="sale.plateNumber = product.detail.plateNumber"
                    disabled
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Price"
                    type="text"
                    placeholder="Enter product price"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="sale.price"
                    @input="sale.price = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Date"
                    type="date"
                    placeholder="Select sale date"
                    info="With custom error message"
                    error-message="Only numbers please!"
                    required
                    validate
                    clear-button
                    :value="sale.date"
                    @input="sale.date = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Customer name"
                    type="text"
                    placeholder="Enter customer name"
                    required
                    validate
                    clear-button
                    :value="sale.customerName"
                    @input="sale.customerName = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="sale.amount"
                    @input="sale.amount = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-item>
                <span>Is in lack</span>
                <f7-toggle name="isInLack"
                           :value="sale.isInLack"
                           @toggle:change="toggleChange"
                ></f7-toggle>
            </f7-list-item>

            <f7-list-input
                    label="In Lack Amount"
                    type="number"
                    placeholder="Enter amount"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="sale.inLackAmount"
                    @input="sale.inLackAmount = $event.target.value"
                    :disabled="disabled"
            >
                <span slot="info"></span>
            </f7-list-input>


        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill big @click="createSale">Add</f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>
<script>
  import { mapState } from 'vuex'
  import debounce from 'lodash.debounce'
  import _ from 'lodash'

  export default {
    name: 'create-sale',
    computed: {
      ...mapState(['product'])
    },
    data () {
      return {
        sale: { isInLack: '' },
        disabled: true
      }
    },
    methods: {
      /**
       * Method to create a new sale.
       * It'll dispatch the create action on the sale module.
       */
      createSale () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('sale/create', self.sale)
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQuery: debounce(function (query, model) {
        const self = this
        switch (model) {
          case 'engineNumber':
            self.sale.engineNumber = query
            break
          case 'productId':
            self.sale.productId = query
            break
          default:
            break
        }
        self.$store.dispatch('product/detail', (proxy) => {
          proxy.setParameters({
            q: query,
            first: true
          }).removeParameter('page')
        })
      }, 500),
      toggleChange (e) {
        this.disabled = !e
        if (e) return this.sale.isInLack = 1
        return this.sale.isInLack = 0
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('product/reload', (proxy) => {
            proxy.removeParameters(['q', 'order', 'sort'])
          })
        }
      })
    },
    /**
     * Set all available watcher in here.
     */
    watch: {
      '$store.state.application': {
        deep: true,
        immediate: true,
        handler (value) {
          if (Object.keys(value.alert).length && value.alert.created) {
            const self = this
            self.$f7router.back()
            self.$store.dispatch('application/removeErrors')
          }
        }
      },
      'sale.isInLack': {
        deep: true,
        immediate: true,
        handler (value) {
          if (!value) {
            this.sale.inLackAmount = ''
          }
        }
      }
    }
  }
</script>
