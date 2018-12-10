<template>
    <f7-page>
        <f7-navbar title="Edit Supplier" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Edit: {{ form.name }}</f7-block-title>
        <f7-list no-hairlines-md form>
            <f7-list-input
                    label="Name"
                    type="text"
                    placeholder="Supplier name"
                    info="Default validation"
                    required
                    validate
                    clear-button
                    :value="form.name"
                    @input="form.name = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Email"
                    floating-label
                    placeholder="Supplier email"
                    info="Default validation"
                    type="textarea"
                    resizable
                    :value="form.email"
                    @input="form.email = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Address"
                    floating-label
                    placeholder="Supplier address"
                    info="Default validation"
                    type="textarea"
                    resizable
                    :value="form.address"
                    @input="form.address = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Phone number"
                    floating-label
                    placeholder="Supplier phone number"
                    info="Default validation"
                    type="tel"
                    :value="form.phoneNumber"
                    @input="form.phoneNumber = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Start provide date"
                    floating-label
                    placeholder="Start provide date"
                    info="Default validation"
                    type="date"
                    :value="form.startProvideDate"
                    @input="form.startProvideDate = $event.target.value"
            >
            </f7-list-input>
        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill @click.native="updateSupplier" big outline round>
                        <i class="f7-icons">edit</i> Edit
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill color="red" big outline round @click.native="destroySupplier(form)">
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
    </f7-page>
</template>
<script>
  import SupplierProxy from '@/proxies/SupplierProxy'
  import SupplierTransformer from '@/transformers/SupplierTransformer'

  const proxy = new SupplierProxy()

  export default {
    name: 'edit-supplier',
    data () {
      return {
        form: {}
      }
    },
    methods: {
      /**
       * Method used to fetch an supplier.
       *
       * @param {number | string} id The id of the supplier.
       */
      fetchSupplier (id) {
        proxy.find(id)
          .then((data) => {
            this.form = SupplierTransformer.fetch(data)
          })
      },
      /**
       * Method to edit an existing supplier.
       * It'll dispatch the update action on the supplier module.
       */
      updateSupplier () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('supplier/update', self.form)
      },
      /**
       * Delete the resource
       */
      destroySupplier (supplier) {
        const self = this
        const app = self.$f7
        app.dialog.confirm('Are you sure to delete?', 'Confirm', () => {
          app.preloader.show()
          self.$store.dispatch('supplier/destroy', supplier)
        })
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchSupplier(this.$f7route.params.uuid)
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
