<template>
    <f7-page>
        <f7-navbar title="Staff Info" back-link="Back" sliding>
            <f7-nav-right>
                <f7-link @click.navtive="getEditRoute(staff.show.uuid)">
                    <i class="f7-icons">edit</i>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <div class="avatar-upload" v-if="staff.show.avatarUrl">
            <div class="avatar-preview">
                <div id="imagePreview"
                     :style="{ 'background-image': 'url(' + staff.show.avatarUrl + ')' }"
                ></div>
            </div>
        </div>
        <f7-card>
            <f7-card-header class="no-border">
                <div class="avatar">
                    <img :src="staff.show.avatarUrl" width="34" height="34" :alt="staff.show.fullName"/>
                </div>
                <div class="name">{{ staff.show.fullName }}</div>
                <div class="date">{{ staff.show.dateOfBirth }}</div>
            </f7-card-header>
            <f7-card-content>
                <f7-list>
                    <f7-list-item>First name: {{ staff.show.firstName }}</f7-list-item>
                    <f7-list-item>Last name: {{ staff.show.lastName }}</f7-list-item>
                    <f7-list-item>Email: {{ staff.show.email }}</f7-list-item>
                    <f7-list-item>Phone number: {{ staff.show.phoneNumber }}</f7-list-item>
                    <f7-list-item>Base Salary: ${{ staff.show.baseSalary }}</f7-list-item>
                    <f7-list-item>Pay day: {{ staff.show.payDay }}</f7-list-item>
                    <f7-list-item>Start date: {{ staff.show.startWorkDate }}</f7-list-item>
                    <f7-list-item>Date of birth: {{ staff.show.dateOfBirth }}</f7-list-item>
                </f7-list>
            </f7-card-content>
        </f7-card>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill @click.native="getEditRoute(staff.show.uuid)" big outline round>
                        <i class="f7-icons size-16">edit</i> Edit
                    </f7-button>
                </f7-col>
                <f7-col v-if="staff.show.id !== $store.state.auth.user.id">
                    <f7-button fill color="red" big outline round @click.native="destroyStaff(staff.show)">
                        <i class="f7-icons size-16">trash</i> Delete
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill @click="goBack" big outline round color="yellow">
                        <i class="f7-icons size-16">chevron_left</i> Cancel
                    </f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    name: 'staff-show',
    data () {
      return {
        //
      }
    },
    computed: {
      ...mapState(['staff'])
    },
    methods: {
      /**
       * Method used to get the staff route.
       *
       * @param {Number} uuid The staff identifier.
       *
       * @returns {Object} The staff route.
       */
      getEditRoute (uuid) {
        this.$f7router.navigate({
          name: 'staffs.edit',
          params: { uuid: uuid }
        })
      },
      /**
       * Method used to return to the previous page.
       */
      goBack () {
        const self = this
        self.$f7router.back()
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
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('staff/show', this.$f7route.params.uuid)
        }
      })
    }
  }
</script>
