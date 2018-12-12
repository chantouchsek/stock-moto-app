<template>
    <f7-page>
        <f7-navbar title="New Staff" back-link="Back" sliding></f7-navbar>
        <f7-block-title>New Staff</f7-block-title>
        <div class="avatar-upload">
            <div class="avatar-edit">
                <input type='file' id="imageUpload"
                       accept=".png, .jpg, .jpeg"
                       @change="handleFileUpload"
                       ref="avatar"
                />
                <label for="imageUpload"></label>
            </div>
            <div class="avatar-preview">
                <div id="imagePreview"
                     :style="{ 'background-image': 'url(' + form.avatarUrl + ')' }"
                ></div>
            </div>
        </div>
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
                        v-for="(role,index) in role.all"
                        checkbox
                        :key="`role-${index}`"
                        :title="role.name"
                        name="roles"
                        :checked="form.roles.indexOf(role.name) >= 0"
                        @change="checkRoles($event)"
                        :value="role.name"
                ></f7-list-item>
            </f7-list>

            <f7-block>
                <f7-row>
                    <f7-col>
                        <f7-button fill @click.native="createStaff" big outline round>
                            <i class="f7-icons size-16">edit</i> Create
                        </f7-button>
                    </f7-col>
                    <f7-col>
                        <f7-button fill @click.native="$f7router.back()" big outline round color="orange">
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
    name: 'staff-create',
    computed: {
      ...mapState(['role'])
    },
    data () {
      return {
        form: { roles: [], avatarUrl: 'http://i.pravatar.cc/500?img=7' },
        avatar: ''
      }
    },
    methods: {
      /**
       * Method to create new staff.
       * It'll dispatch the create action on the staff module.
       */
      createStaff () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('staff/create', self.form)
      },
      /**
       * Handle check role
       */
      checkRoles (event) {
        const self = this
        const value = event.target.value
        if (event.target.checked) {
          self.form.roles.push(value)
        } else {
          self.form.roles.splice(self.form.roles.indexOf(value), 1)
        }
      },
      /*
        Handles a change on the avatar upload
      */
      handleFileUpload () {
        /*
          Set the local avatar variable to what the user has selected.
        */

        const self = this
        self.avatar = self.$refs.avatar.files[0]

        /*
          Initialize a File Reader object
        */
        let reader = new FileReader()

        /*
          Add an event listener to the reader that when the avatar
          has been loaded, we flag the show preview as true and set the
          image to be what was read from the reader.
        */
        reader.addEventListener("load", function () {
          self.form.avatarUrl = reader.result
        }.bind(self), false)

        /*
          Check to see if the avatar is not empty.
        */
        if (self.avatar) {
          /*
            Ensure the avatar is an image avatar.
          */
          if (/\.(jpe?g|png|gif)$/i.test(self.avatar.name)) {
            /*
              Fire the readAsDataURL method which will read the avatar in and
              upon completion fire a 'load' event which we will listen to and
              display the image in the preview.
            */
            reader.readAsDataURL(self.avatar)
          }
        }
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('role/reload', (proxy) => {
            proxy.removeParameters(['q', 'order', 'sort'])
          })
        }
      })
    },
    watch: {
      '$store.state.application': {
        deep: true,
        immediate: true,
        handler (value) {
          if (Object.keys(value.alert).length && value.alert.created) {
            const self = this
            self.$f7router.back()
          }
        }
      }
    }
  }
</script>
