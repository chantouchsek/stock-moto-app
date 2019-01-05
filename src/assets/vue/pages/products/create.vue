<template>
    <f7-page>
        <f7-navbar title="New Product" back-link="Back" sliding></f7-navbar>
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
                    placeholder="Please choose..."
                    required
                    validate
                    :value="form.modelId"
                    @input="form.modelId = $event.target.value"
            >
                <option value=""></option>
                <option v-for="(m,index) in model.all" :key="`model-${index}`" :value="m.id">
                    {{ m.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Make"
                    type="select"
                    placeholder="Please choose..."
                    required
                    validate
                    :value="form.makeId"
                    @input="form.makeId = $event.target.value"
            >
                <option value=""></option>
                <option v-for="(m,index) in make.all" :key="`make-${index}`" :value="m.id">
                    {{ m.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Category"
                    type="select"
                    placeholder="Please choose..."
                    required
                    validate
                    :value="form.categoryId"
                    @input="form.categoryId = $event.target.value"
            >
                <option value=""></option>
                <option v-for="(cat,index) in category.all" :key="`category-${index}`" :value="cat.id">
                    {{ cat.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Color"
                    type="select"
                    placeholder="Please choose..."
                    required
                    validate
                    :value="form.colorId"
                    @input="form.colorId = $event.target.value"
            >
                <option value=""></option>
                <option v-for="(colour,index) in color.all" :key="`color-${index}`" :value="colour.id">
                    {{ colour.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Supplier"
                    type="select"
                    placeholder="Please choose..."
                    required
                    validate
                    :value="form.supplierId"
                    @input="form.supplierId = $event.target.value"
            >
                <option value=""></option>
                <option v-for="(m,index) in supplier.all" :key="`supplier-${index}`" :value="m.id">
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
                    placeholder="The amount a customer is willing to pay."
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
                    placeholder="The expense incurred for a product"
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
                    error-message="Select a valid date please!"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.year"
                    @input="form.year = $event.target.value"
            >
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
                    label="Frame number"
                    type="text"
                    placeholder="Product frame number"
                    required
                    validate
                    clear-button
                    :value="form.frameNumber"
                    @input="form.frameNumber = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    v-if="form.status ==='second'"
                    label="Plate number"
                    type="text"
                    placeholder="Product plate number"
                    validate
                    clear-button
                    :value="form.plateNumber"
                    @input="form.plateNumber = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Product code"
                    type="text"
                    placeholder="Product code"
                    validate
                    clear-button
                    :value="form.code"
                    @input="form.code = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-item radio
                          title="New"
                          name="status"
                          value="new"
                          :checked="form.status === 'new'"
                          @change="form.status = $event.target.value"
            ></f7-list-item>

            <f7-list-item radio
                          title="Second hand"
                          name="status"
                          value="second"
                          :checked="form.status === 'second'"
                          @change="form.status = $event.target.value"
            ></f7-list-item>

            <f7-block>
                <f7-row>
                    <f7-col>
                        <f7-button fill @click.native="createProduct" big outline round>
                            <i class="f7-icons size-16">add</i> Save
                        </f7-button>
                    </f7-col>

                    <f7-col>
                        <f7-button fill @click="goBack" big outline round>
                            <i class="f7-icons size-16">chevron_left</i> Cancel
                        </f7-button>
                    </f7-col>
                </f7-row>
            </f7-block>

        </f7-list>

    </f7-page>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    name: 'create-product',
    data () {
      return {
        form: {}
      }
    },
    computed: {
      ...mapState(['make', 'model', 'category', 'color', 'supplier']),
      errorMessage () {
        let message = this.$store.state.application.errors
        if (Object.keys(message).length && typeof message !== 'undefined') {
          return message
        }
        return {}
      }
    },
    methods: {
      /**
       * Method to create a new product.
       * It'll dispatch the create action on the product module.
       */
      createProduct () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('product/create', self.form)
      },

      /**
       * Method used to return to the previous page.
       */
      goBack () {
        const self = this
        self.$f7router.back()
        self.$store.dispatch('application/removeErrors')
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      const self = this
      self.$store.dispatch('make/reload', (proxy) => {
        proxy.removeParameters(['q', 'order', 'sort', 'page'])
      })
      self.$store.dispatch('model/reload', (proxy) => {
        proxy.removeParameters(['q', 'order', 'sort', 'page'])
      })
      self.$store.dispatch('category/reload', (proxy) => {
        proxy.removeParameters(['q', 'order', 'sort', 'page'])
      })
      self.$store.dispatch('color/reload', (proxy) => {
        proxy.removeParameters(['q', 'order', 'sort', 'page'])
      })
      self.$store.dispatch('supplier/reload', (proxy) => {
        proxy.removeParameters(['q', 'order', 'sort', 'page'])
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
      }
    }
  }
</script>
