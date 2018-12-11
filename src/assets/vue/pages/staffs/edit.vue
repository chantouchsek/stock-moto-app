<template>
    <f7-page>
        <f7-navbar title="Edit Staff" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Edit: {{ form.name }}</f7-block-title>
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
                    defaultValue=""
                    placeholder="Please choose..."
                    :value="form.gender"
                    @input="form.gender = $event.target.value"
            >
                <option value="1">Male</option>
                <option value="2">Female</option>
            </f7-list-input>

            <f7-list-input
                    label="Phone number"
                    type="tel"
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
                    type="date"
                    placeholder="Your pay day"
                    info="With custom error message"
                    error-message="Select a valid date please!"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.payDay"
                    @input="form.payDay = $event.target.value"
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

            <f7-block-title>Roles</f7-block-title>
            <f7-list>
                <f7-list-item
                        v-for="(role,index) in roles"
                        checkbox
                        :key="`role-${index}`"
                        :title="role.name"
                        name="roles"
                        :checked="form.roles.indexOf(role.name) >= 0"
                        @change="checkRoles($event)"
                        :value="role.name"
                ></f7-list-item>
            </f7-list>
        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill @click.native="updateStaff" big outline round>
                        <i class="f7-icons">edit</i> Edit
                    </f7-button>
                </f7-col>
                <f7-col v-if="$store.state.auth.user.id !== form.id">
                    <f7-button fill color="red" big outline round @click.native="destroyStaff(form)">
                        <i class="f7-icons">trash</i> Delete
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill @click.native="$f7router.back()" big outline round color="orange">
                        <i class="f7-icons">chevron_left</i> Cancel
                    </f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>

<script>
  import StaffProxy from '@/proxies/StaffProxy'
  import RoleProxy from '@/proxies/RoleProxy'
  import StaffTransformer from '@/transformers/StaffTransformer'
  import RoleTransformer from '@/transformers/RoleTransformer'

  const proxy = new StaffProxy()
  const roleProxy = new RoleProxy()

  export default {
    name: 'edit-staff',
    data () {
      return {
        form: { roles: [] },
        roles: []
      }
    },
    methods: {
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
      fetchRoles () {
        roleProxy.all()
          .then((response) => {
            this.roles = RoleTransformer.fetchCollection(response.data)
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
      },
      checkRoles (event) {
        const self = this
        const value = event.target.value
        if (event.target.checked) {
          self.form.roles.push(value)
        } else {
          self.form.roles.splice(self.form.roles.indexOf(value), 1)
        }
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchStaff(this.$f7route.params.uuid)
      this.fetchRoles()
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
