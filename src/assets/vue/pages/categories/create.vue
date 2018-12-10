<template>
    <f7-page>
        <f7-navbar title="New Category" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Add category</f7-block-title>
        <f7-list no-hairlines-md form>
            <f7-list-input
                    label="Name"
                    type="text"
                    placeholder="Category name"
                    info="Default validation"
                    required
                    validate
                    clear-button
                    :value="form.name"
                    @input="form.name = $event.target.value"
            >
            </f7-list-input>
            <f7-list-input
                    label="Description"
                    floating-label
                    placeholder="Category description"
                    info="Default validation"
                    type="textarea"
                    resizable
                    :value="form.description"
                    @input="form.description = $event.target.value"
            >
            </f7-list-input>
            <f7-list-item
                    checkbox
                    title="Active"
                    name="active"
                    :value="form.active"
                    @change="checkActive"
                    :checked="!!form.active"
            ></f7-list-item>

            <f7-block>
                <f7-row>
                    <f7-col>
                        <f7-button fill @click.native="createCategory" big outline round>
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
    name: 'create-category',
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
      checkActive (event) {
        const self = this;
        if (event.target.checked) {
          self.form.active = 1
          return
        }
        self.form.active = 0
      },
      /**
       * Method to create a new category.
       * It'll dispatch the create action on the category module.
       */
      createCategory () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('category/create', self.form)
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
