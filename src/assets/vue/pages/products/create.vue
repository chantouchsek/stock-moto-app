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
                    required
                    validate
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
                    required
                    validate
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
                    required
                    validate
                    :value="form.categoryId"
                    @input="form.categoryId = $event.target.value"
            >
                <option v-for="(cat,index) in category.all" :key="`category-${index}`" :value="cat.id">
                    {{ cat.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Supplier"
                    type="select"
                    defaultValue=""
                    placeholder="Please choose..."
                    required
                    validate
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

            <f7-list simple-list>
                <f7-list-item title="Add Colors: ">
                    <f7-button raised popup-open=".color-popup">Open Form</f7-button>
                </f7-list-item>
            </f7-list>
            <div v-if="form.colors.length" class="color-list-attributes"
                 v-for="(c,index) in form.colors"
                 :key="`color-selected-${index}`"
            >
                <f7-block-title>Color: {{ c.name }}</f7-block-title>
                <f7-list>
                    <f7-list-item v-for="(colour,indexColor) in color.all"
                                  :key="`color-selected-${indexColor}`"
                                  radio
                                  :title="colour.name"
                                  :name="`color-selected-${index}`"
                                  :value="colour.id"
                                  :checked="form.colors[index].colorId === colour.id"
                                  @change="form.colors[index].colorId = $event.target.value"
                    ></f7-list-item>

                    <f7-list-input
                            label="Engine number"
                            type="text"
                            placeholder="Product engine number"
                            required
                            validate
                            clear-button
                            :value="form.colors[index].engineNumber"
                            @input="form.colors[index].engineNumber = $event.target.value"
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
                            :value="form.colors[index].frameNumber"
                            @input="form.colors[index].frameNumber = $event.target.value"
                    >
                        <span slot="info"></span>
                    </f7-list-input>

                    <f7-list-input
                            v-if="form.colors[index].status ==='second'"
                            label="Plate number"
                            type="text"
                            placeholder="Product plate number"
                            validate
                            clear-button
                            :value="form.colors[index].plateNumber"
                            @input="form.colors[index].plateNumber = $event.target.value"
                    >
                        <span slot="info"></span>
                    </f7-list-input>

                    <f7-list-input
                            label="Product code"
                            type="text"
                            placeholder="Product code"
                            validate
                            clear-button
                            :value="form.colors[index].code"
                            @input="form.colors[index].code = $event.target.value"
                    >
                        <span slot="info"></span>
                    </f7-list-input>

                    <f7-list-item radio
                                  title="New"
                                  :name="`status-selected-${index}`"
                                  value="new"
                                  :checked="form.colors[index].status === 'new'"
                                  @change="form.colors[index].status = $event.target.value"
                    ></f7-list-item>

                    <f7-list-item radio
                                  title="Second hand"
                                  :name="`status-selected-${index}`"
                                  value="second"
                                  :checked="form.colors[index].status === 'second'"
                                  @change="form.colors[index].status = $event.target.value"
                    ></f7-list-item>
                </f7-list>
            </div>
            <f7-block>
                <f7-row>
                    <f7-col>
                        <f7-button fill @click.native="createProduct" big outline round>
                            <i class="f7-icons size-16">add</i> Add
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

        <f7-popup class="color-popup" :opened="popupOpened" @popup:closed="saveColorAttribute">
            <f7-page>
                <f7-navbar title="Select Color">
                    <f7-nav-right>
                        <f7-link popup-close>Save</f7-link>
                    </f7-nav-right>
                </f7-navbar>

                <f7-block-title>Please select a color</f7-block-title>
                <f7-list>
                    <f7-list-item v-for="(colour,index) in color.all"
                                  :key="`color-select-${index}`"
                                  radio
                                  :title="colour.name"
                                  name="color"
                                  :value="colour.id"
                                  :checked="attribute.colorId === colour.id"
                                  @change="attribute.colorId = $event.target.value"
                    ></f7-list-item>

                    <f7-list-input
                            label="Engine number"
                            type="text"
                            placeholder="Product engine number"
                            required
                            validate
                            clear-button
                            :value="attribute.engineNumber"
                            @input="attribute.engineNumber = $event.target.value"
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
                            :value="attribute.frameNumber"
                            @input="attribute.frameNumber = $event.target.value"
                    >
                        <span slot="info"></span>
                    </f7-list-input>

                    <f7-list-input
                            v-if="attribute.status ==='second'"
                            label="Plate number"
                            type="text"
                            placeholder="Product plate number"
                            validate
                            clear-button
                            :value="attribute.plateNumber"
                            @input="attribute.plateNumber = $event.target.value"
                    >
                        <span slot="info"></span>
                    </f7-list-input>

                    <f7-list-input
                            label="Product code"
                            type="text"
                            placeholder="Product code"
                            validate
                            clear-button
                            :value="attribute.code"
                            @input="attribute.code = $event.target.value"
                    >
                        <span slot="info"></span>
                    </f7-list-input>

                    <f7-list-item radio
                                  title="New"
                                  name="status"
                                  value="new"
                                  :checked="attribute.status === 'new'"
                                  @change="attribute.status = $event.target.value"
                    ></f7-list-item>

                    <f7-list-item radio
                                  title="Second hand"
                                  name="status"
                                  value="second"
                                  :checked="attribute.status === 'second'"
                                  @change="attribute.status = $event.target.value"
                    ></f7-list-item>
                </f7-list>
            </f7-page>
        </f7-popup>
    </f7-page>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    name: 'create-product',
    data () {
      return {
        form: { colors: [] },
        popupOpened: false,
        attribute: {
          code: '',
          colorId: '',
          engineNumber: '',
          frameNumber: '',
          plateNumber: '',
          status: 'new'
        }
      }
    },
    computed: {
      ...mapState(['make', 'model', 'category', 'color']),
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
      },
      /**
       * The method for pushing the new added color to form
       */
      saveColorAttribute () {
        const self = this
        self.popupOpened = false
        if (self.attribute.colorId && self.attribute.engineNumber && self.attribute.frameNumber) {
          self.form.colors.push(self.attribute)
          self.attribute = {
            code: '',
            colorId: '',
            engineNumber: '',
            frameNumber: '',
            plateNumber: '',
            status: 'new'
          }
        }
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
