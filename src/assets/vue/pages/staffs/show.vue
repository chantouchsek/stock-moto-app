<template>
    <f7-page>
        <f7-navbar title="Staff Info" back-link="Back" sliding>
            <f7-nav-right>
                <f7-link @click.navtive="getEditRoute(staff.show.uuid)">
                    <i class="f7-icons">edit</i>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block-title>Staff Info: {{ staff.show.fullName }}</f7-block-title>
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
