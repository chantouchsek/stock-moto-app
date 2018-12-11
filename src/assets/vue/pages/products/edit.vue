<template>
    <f7-page>
        <f7-navbar title="Edit Product" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Edit: {{ form.name }}</f7-block-title>
        <f7-list no-hairlines-md form>
            <f7-list-input
                    label="Name"
                    type="text"
                    placeholder="Product name"
                    info="The field name is required"
                    required
                    validate
                    clear-button
                    :value="form.name"
                    @input="form.name = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Model"
                    type="select"
                    defaultValue=""
                    placeholder="Please choose..."
                    :value="form.modelId"
                    @input="form.modelId = $event.target.value"
            >
                <option v-for="(m,index) in model.all" :key="`model-${index}`" :value="m.id">
                    {{ m.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Make"
                    type="select"
                    defaultValue=""
                    placeholder="Please choose..."
                    :value="form.makeId"
                    @input="form.makeId = $event.target.value"
            >
                <option v-for="(m,index) in make.all" :key="`make-${index}`" :value="m.id">
                    {{ m.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Category"
                    type="select"
                    defaultValue=""
                    placeholder="Please choose..."
                    :value="form.categoryId"
                    @input="form.categoryId = $event.target.value"
            >
                <option v-for="(m,index) in make.all" :key="`make-${index}`" :value="m.id">
                    {{ m.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Supplier"
                    type="select"
                    defaultValue=""
                    placeholder="Please choose..."
                    :value="form.supplierId"
                    @input="form.supplierId = $event.target.value"
            >
                <option v-for="(m,index) in make.all" :key="`make-${index}`" :value="m.id">
                    {{ m.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Description"
                    floating-label
                    placeholder="Product description"
                    info="Default validation"
                    type="textarea"
                    resizable
                    :value="form.description"
                    @input="form.description = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Price"
                    type="number"
                    placeholder="Price is the amount a customer is willing to pay for a product or service."
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.price"
                    @input="form.price = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Cost"
                    type="number"
                    placeholder="Cost is typically the expense incurred for a product or service being sold by a company."
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.cost"
                    @input="form.cost = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Qty"
                    type="number"
                    placeholder="Product quantity"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.qty"
                    @input="form.qty = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Engine number"
                    type="text"
                    placeholder="Product engine number"
                    required
                    validate
                    clear-button
                    :value="form.engineNumber"
                    @input="form.engineNumber = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Color"
                    type="text"
                    placeholder="Product color"
                    required
                    validate
                    clear-button
                    :value="form.color"
                    @input="form.color = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Plat number"
                    type="text"
                    placeholder="Product plate number"
                    required
                    validate
                    clear-button
                    :value="form.plateNumber"
                    @input="form.plateNumber = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Frame number"
                    type="text"
                    placeholder="Product frame number"
                    required
                    validate
                    clear-button
                    :value="form.plateNumber"
                    @input="form.plateNumber = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Frame code"
                    type="text"
                    placeholder="Product code"
                    required
                    validate
                    clear-button
                    :value="form.code"
                    @input="form.code = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Import from"
                    type="text"
                    placeholder="Product import from"
                    required
                    validate
                    clear-button
                    :value="form.importFrom"
                    @input="form.importFrom = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Year"
                    type="number"
                    placeholder="The product made year"
                    info="With custom error message"
                    error-message="Select a valid date please!"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.year"
                    @input="form.year = $event.target.value"
            >
            </f7-list-input>

            <f7-list-item>
                <span>New</span>
                <f7-toggle checked color="blue"></f7-toggle>
                <span>Second hand</span>
            </f7-list-item>

            <f7-block>
                <f7-row>
                    <f7-col>
                        <f7-button fill @click.native="updateProduct" big outline round>
                            <i class="f7-icons">edit</i> Edit
                        </f7-button>
                    </f7-col>
                    <f7-col>
                        <f7-button fill color="red" big outline round @click.native="destroyProduct(form)">
                            <i class="f7-icons">trash</i> Delete
                        </f7-button>
                    </f7-col>
                    <f7-col>
                        <f7-button fill @click="$f7router.back()" big outline round>
                            <i class="f7-icons">chevron_left</i> Cancel
                        </f7-button>
                    </f7-col>
                </f7-row>
            </f7-block>

        </f7-list>

    </f7-page>
</template>
<script>
  import { mapState } from 'vuex'
  import ProductProxy from '@/proxies/ProductProxy'
  import ProductTransformer from '@/transformers/ProductTransformer'

  const proxy = new ProductProxy()

  export default {
    name: 'edit-product',
    data () {
      return {
        form: {}
      }
    },
    computed: {
      ...mapState(['make', 'model'])
    },
    methods: {
      checkActive (event) {
        const self = this;
        if (event.target.checked) {
          self.form.active = 1
          return
        }
        self.form.active = 0
      },
      /**
       * Method used to fetch n product.
       *
       * @param {number | string} id The id of the product.
       */
      fetchProduct (id) {
        proxy.find(id)
          .then((data) => {
            this.form = ProductTransformer.fetch(data)
          })
      },
      /**
       * Method to edit an existing product.
       * It'll dispatch the update action on the product module.
       */
      updateProduct () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('product/update', self.form)
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
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      const self = this
      self.fetchProduct(self.$f7route.params.uuid)
      self.$store.dispatch('make/reload', (proxy) => {
        proxy.removeParameters(['q', 'order', 'sort', 'page'])
      })
      self.$store.dispatch('model/reload', (proxy) => {
        proxy.removeParameters(['q', 'order', 'sort', 'page'])
      })
    },
    watch: {
      '$store.state.application': {
        deep: true,
        immediate: true,
        handler (value) {
          if (Object.keys(value.alert).length && value.alert.destroyed) {
            const self = this
            self.$f7router.back()
          }
          if (Object.keys(value.alert).length && value.alert.edited) {
            const self = this
            self.$f7router.back()
          }
        }
      }
    }
  }
</script>
