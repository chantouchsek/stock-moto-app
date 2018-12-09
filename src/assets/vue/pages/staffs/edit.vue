<template>
    <f7-page>
        <f7-navbar title="New Staff" back-link="Back" sliding></f7-navbar>
        <f7-block-title>New Staff</f7-block-title>
        <f7-list no-hairlines-md form>
            <f7-list-input
                    label="First Name"
                    type="text"
                    placeholder="Your name"
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
                    placeholder="Your name"
                    info="Default validation"
                    required
                    validate
                    clear-button
                    :value="form.lastName"
                    @input="form.lastName = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Gender"
                    type="select"
                    defaultValue="Male"
                    placeholder="Please choose..."
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </f7-list-input>

            <f7-list-input
                    label="Phone number"
                    type="text"
                    placeholder="Your phone number"
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
                    label="Base Salary"
                    type="text"
                    placeholder="Your base salary"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.baseSalary"
                    @input="form.baseSalary = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="E-mail"
                    type="email"
                    placeholder="Your e-mail"
                    info="Default e-mail validation"
                    required
                    validate
                    clear-button
                    :value="form.email"
                    @input="form.email = $event.target.value"
            >
            </f7-list-input>


            <f7-list-input
                    label="Pay day"
                    type="text"
                    placeholder="Your pay day"
                    info="With custom error message"
                    error-message="Only numbers please!"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.payDay"
                    @input="form.payDay = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="URL"
                    type="url"
                    placeholder="Your URL"
                    info="Default URL validation"
                    required
                    validate
                    clear-button
            >
            </f7-list-input>

            <f7-list-input
                    label="Start date"
                    type="date"
                    placeholder="Select your start date"
                    info="With custom error message"
                    error-message="Only numbers please!"
                    required
                    validate
                    clear-button
                    :value="form.startWorkDate"
                    @input="form.startWorkDate = $event.target.value"
            >
            </f7-list-input>
            <f7-list-input
                    label="Bio"
                    floating-label
                    type="textarea"
                    resizable
                    placeholder="Bio"
                    :value="form.bio"
                    @input="form.bio = $event.target.value"
            >
            </f7-list-input>
        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill big>Add</f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>

<script>
  import StaffProxy from '@/proxies/StaffProxy'
  import StaffTransformer from '@/transformers/StaffTransformer'

  const proxy = new StaffProxy()

  export default {
    name: 'edit-staff',
    data () {
      return {
        form: {}
      }
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
       * Method used to fetch an staff.
       *
       * @param {number | string} id The id of the staff.
       */
      fetchStaff (id) {
        proxy.find(id)
          .then((data) => {
            this.form = StaffTransformer.fetch(data)
          })
      },
      /**
       * Method to edit an existing staff.
       * It'll dispatch the update action on the staff module.
       */
      updateStaff () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('staff/update', self.form)
      },
      /**
       * Delete the resource
       */
      destroyStaff (staff) {
        const self = this
        const app = self.$f7
        app.dialog.confirm('Are you sure to delete?', 'Confirm', () => {
          app.preloader.show()
          self.$store.dispatch('staff/destroy', staff)
        })
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchStaff(this.$f7route.params.uuid)
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