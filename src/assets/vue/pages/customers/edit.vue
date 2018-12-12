<template>
    <f7-page>
        <f7-navbar title="Edit Customer" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Edit: {{ form.name }}</f7-block-title>

        <f7-list no-hairlines-md form>

            <f7-list-input
                    label="First Name"
                    type="text"
                    placeholder="Customer first name"
                    info="Default validation"
                    required
                    validate
                    clear-button
                    :value="form.firstName"
                    @input="form.firstName = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Last Name"
                    type="text"
                    placeholder="Customer last name"
                    info="Default validation"
                    required
                    validate
                    clear-button
                    :value="form.lastName"
                    @input="form.lastName = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Email"
                    type="email"
                    placeholder="Customer email"
                    info="Default validation"
                    required
                    validate
                    clear-button
                    :value="form.email"
                    @input="form.email = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Phone number"
                    type="tel"
                    placeholder="Customer phone number"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.phoneNumber"
                    @input="form.phoneNumber = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Date of birth"
                    type="date"
                    placeholder="Customer date of birth, if have."
                    info="With custom error message"
                    error-message="Select a valid date please!"
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.dateOfBirth"
                    @input="form.dateOfBirth = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Address"
                    floating-label
                    placeholder="Customer address"
                    info="Default validation"
                    type="textarea"
                    resizable
                    :value="form.address"
                    @input="form.address = $event.target.value"
            >
            </f7-list-input>

        </f7-list>

        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill @click.native="updateCustomer" big outline round>
                        <i class="f7-icons size-16">edit</i> Edit
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill color="red" big outline round @click.native="destroyCustomer(form)">
                        <i class="f7-icons size-16">trash</i> Delete
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill @click="$f7router.back()" big outline round>
                        <i class="f7-icons size-16">chevron_left</i> Cancel
                    </f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>
<script>
  import CustomerProxy from '@/proxies/CustomerProxy'
  import CustomerTransformer from '@/transformers/CustomerTransformer'

  const proxy = new CustomerProxy()

  export default {
    name: 'edit-customer',
    data () {
      return {
        form: {}
      }
    },
    methods: {
      /**
       * Method used to fetch an customer.
       *
       * @param {number | string} id The id of the customer.
       */
      fetchCustomer (id) {
        proxy.find(id)
          .then((data) => {
            this.form = CustomerTransformer.fetch(data)
          })
      },
      /**
       * Method to edit an existing customer.
       * It'll dispatch the update action on the customer module.
       */
      updateCustomer () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('customer/update', self.form)
      },
      /**
       * Delete the resource
       */
      destroyCustomer (customer) {
        const self = this
        const app = self.$f7
        app.dialog.confirm('Are you sure to delete?', 'Confirm', () => {
          app.preloader.show()
          self.$store.dispatch('customer/destroy', customer)
        })
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchCustomer(this.$f7route.params.uuid)
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
