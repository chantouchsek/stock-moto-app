<template>
    <f7-page>
        <f7-navbar title="New Customer" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Add customer</f7-block-title>
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

            <f7-block>
                <f7-row>
                    <f7-col>
                        <f7-button fill @click.native="createCustomer" big outline round>
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
  export default {
    name: 'create-customer',
    data () {
      return {
        form: {}
      }
    },
    computed: {
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
       * Method to create a new customer.
       * It'll dispatch the create action on the customer module.
       */
      createCustomer () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('customer/create', self.form)
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
      //
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
