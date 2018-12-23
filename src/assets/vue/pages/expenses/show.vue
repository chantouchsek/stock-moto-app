<template>
    <f7-page>
        <f7-navbar title="Expense Info" back-link="Back" sliding>
            <f7-nav-right>
                <f7-link @click.navtive="getEditRoute(expense.detail.uuid)">
                    <i class="f7-icons">edit</i>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-list>
            <f7-list-item>Date: {{ expense.detail.date }}</f7-list-item>
            <f7-list-item>Amount: ${{ expense.detail.amount }}</f7-list-item>
            <f7-list-item>Expense on: {{ expense.detail.expenseOn }}</f7-list-item>
            <f7-list-item>Notes: {{ expense.detail.notes }}</f7-list-item>
            <f7-list-item>Added by: {{ expense.detail.user ? expense.detail.user.full_name : '' }}</f7-list-item>
        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill @click.native="getEditRoute(expense.detail.uuid)" big outline round>
                        <i class="f7-icons size-16">edit</i> Edit
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill color="red" big outline round @click.native="destroyExpense(expense.detail)">
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
    name: 'expense-show',
    data () {
      return {
        //
      }
    },
    computed: {
      ...mapState(['expense'])
    },
    methods: {
      /**
       * Method used to get the expense route.
       *
       * @param {Number} uuid The expense identifier.
       *
       * @returns {Object} The expense route.
       */
      getEditRoute (uuid) {
        this.$f7router.navigate({
          name: 'expenses.edit',
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
      destroyExpense (expense) {
        const self = this
        const app = self.$f7
        app.dialog.confirm('Are you sure to delete?', 'Confirm', () => {
          app.preloader.show()
          self.$store.dispatch('expense/destroy', expense)
        })
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('expense/detail', this.$f7route.params.uuid)
        }
      })
    }
  }
</script>
