<template>
    <f7-page>
        <f7-navbar title="New Product" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Add Product</f7-block-title>
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
                    :value="form.makeId"
                    @input="form.makeId = $event.target.value"
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
                    :value="form.makeId"
                    @input="form.makeId = $event.target.value"
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
                    type="date"
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
                        <f7-button fill @click.native="createProduct" big outline round>
                            <i class="f7-icons">add_round</i> Add
                        </f7-button>
                    </f7-col>
                    <f7-col>
                        <f7-button fill @click.native="goBack" big outline round color="orange">
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

  export default {
    name: 'create-model',
    data () {
      return {
        form: {}
      }
    },
    computed: {
      ...mapState(['make', 'model']),
      errorMessage () {
        let message = this.$store.state.application.errors
        if (Object.keys(message).length && typeof message !== 'undefined') {
          return message
        }
        return {}
      }
    },
    methods: {
      checkActive (event) {
        const self = this
        if (event.target.checked) {
          self.form.active = 1
          return
        }
        self.form.active = 0
      },
      /**
       * Method to create a new model.
       * It'll dispatch the create action on the model module.
       */
      createProduct () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('model/create', self.form)
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
