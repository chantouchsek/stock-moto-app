<template>
    <f7-page>
        <f7-navbar title="Add Expense" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Add Expense</f7-block-title>
        <f7-list no-hairlines-md form>
            <f7-list-input
                    label="Amount"
                    type="number"
                    placeholder="Expense amount"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
                    :value="form.amount"
                    @input="form.amount = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Expense on"
                    type="text"
                    placeholder="Expense on"
                    required
                    validate
                    clear-button
                    :value="form.expenseOn"
                    @input="form.expenseOn = $event.target.value"
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Date"
                    type="date"
                    placeholder="Expense date"
                    required
                    validate
                    clear-button
                    :value="form.date"
                    @input="form.date = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Note"
                    floating-label
                    type="textarea"
                    resizable
                    placeholder="Expense note"
                    :value="form.notes"
                    @input="form.notes = $event.target.value"
            >
            </f7-list-input>

            <f7-block>
                <f7-row>
                    <f7-col>
                        <f7-button fill @click.native="createExpense" big outline round>
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
  export default {
    name: 'expense-create',
    data () {
      return {
        form: {}
      }
    },
    methods: {
      /**
       * Method to create new expense.
       * It'll dispatch the create action on the expense module.
       */
      createExpense () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('expense/create', self.form)
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
          //
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
