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

            <f7-list-input label="Attachment"
                           type="file"
                           multiple
                           ref="attachments"
                           @change="handleFilesUpload($event)"
            ></f7-list-input>

            <f7-list-item v-for="(file,index) in form.files" :key="`attachments-index${index}`"
                          :title="`${index + 1}. ${file.file_name}`"
                          overswipe
                          swipeout
            >
                <f7-swipeout-actions right>
                    <f7-swipeout-button color="red" @click="destroyFile(file.id, index)" close>
                        Delete
                    </f7-swipeout-button>
                </f7-swipeout-actions>
            </f7-list-item>

            <f7-block>
                <f7-row>
                    <f7-col>
                        <f7-button fill @click.native="updateExpense" big outline round>
                            <i class="f7-icons size-16">edit</i> Save
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
  import ExpenseProxy from '@/proxies/ExpenseProxy'
  import ExpenseTransformer from '@/transformers/ExpenseTransformer'

  const proxy = new ExpenseProxy()

  export default {
    name: 'edit-expense',
    data () {
      return {
        form: {},
        files: []
      }
    },
    methods: {
      /**
       * Method used to fetch an expense.
       *
       * @param {number | string} id The id of the expense.
       */
      fetchExpense (id) {
        proxy.find(id)
          .then((data) => {
            this.form = ExpenseTransformer.fetch(data)
          })
      },
      /**
       * Method to edit an existing expense.
       * It'll dispatch the update action on the expense module.
       */
      updateExpense () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('expense/update', self.form)
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
      },
      /**
       * Submits the avatar to the server
       */
      submitFile () {
        /*
        *Initialize the form data
        */
        let formData = new FormData()
        const self = this

        /**
         * Iterate over any file sent over appending the files to the form data.
         */
        for (let i = 0; i < self.files.length; i++) {
          let file = self.files[i]

          formData.append('files[' + i + ']', file)
        }

        /**
         * Make the request to the POST /expenses/uploads URL
         */
        proxy.upload(self.form.uuid, formData).then((response) => {
          self.form.files = response.data.files
        }).catch((error) => {
          self.$f7.dialog.alert(error.message, 'Warning!')
        })
      },
      /**
       * Handles the uploading of files
       */
      handleFilesUpload (e) {
        const self = this
        let selectedFiles = e.target.files
        if (!selectedFiles.length) {
          return false
        }
        /**
         * Adds the uploaded file to the files array
         */
        for (let i = 0; i < selectedFiles.length; i++) {
          self.files.push(selectedFiles[i])
        }
        self.submitFile()
      },
      destroyFile (mediaId, index) {
        const self = this
        proxy.destroyFile(self.form.uuid, mediaId).then((response) => {
          self.form.files.splice(index, 1)
        }).catch(error => {
          console.log(error)
        })
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchExpense(this.$f7route.params.uuid)
    }
  }
</script>
