<template>
    <f7-page>
        <f7-navbar title="New Model" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Add Model</f7-block-title>
        <f7-list no-hairlines-md form>
            <f7-list-input
                    label="Name"
                    type="text"
                    placeholder="Model name"
                    info="The field name is required"
                    required
                    validate
                    clear-button
                    :value="form.name"
                    @input="form.name = $event.target.value"
            >
            </f7-list-input>

            <f7-list-input
                    label="Make"
                    type="select"
                    defaultValue=""
                    placeholder="Please choose..."
                    :value="form.makeId"
                    @input="form.makeId = $event.target.value"
            >
                <option v-for="(m,index) in make.all" :key="`make-${index}`" :value="m.id">
                    {{ m.name }}
                </option>
            </f7-list-input>

            <f7-list-input
                    label="Description"
                    floating-label
                    placeholder="Model description"
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
                        <f7-button fill @click.native="createMake" big outline round>
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
  import { mapState } from 'vuex'

  export default {
    name: 'create-model',
    data () {
      return {
        form: {}
      }
    },
    computed: {
      ...mapState(['make']),
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
       * Method to create a new model.
       * It'll dispatch the create action on the model module.
       */
      createMake () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('model/create', self.form)
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
      this.$store.dispatch('make/reload', (proxy) => {
        proxy.removeParameters(['q', 'order', 'sort', 'page'])
      })
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
