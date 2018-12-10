<template>
    <f7-page>
        <f7-navbar title="Edit Model" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Edit: {{ form.name }}</f7-block-title>
        <f7-list no-hairlines-md form>
            <f7-list-input
                    label="Name"
                    type="text"
                    placeholder="Model name"
                    info="Default validation"
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
        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill @click.native="updateModel" big outline round>
                        <i class="f7-icons">edit</i> Edit
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill color="red" big outline round @click.native="destroyModel(form)">
                        <i class="f7-icons">trash</i> Delete
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill @click="$f7router.back()" big outline round>
                        <i class="f7-icons">chevron_left</i> Cancel
                    </f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>
<script>
  import { mapState } from 'vuex'
  import ModelProxy from '@/proxies/ModelProxy'
  import ModelTransformer from '@/transformers/ModelTransformer'

  const proxy = new ModelProxy()

  export default {
    name: 'edit-model',
    data () {
      return {
        form: {}
      }
    },
    computed: {
      ...mapState(['make'])
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
       * Method used to fetch an model.
       *
       * @param {number | string} id The id of the model.
       */
      fetchModel (id) {
        proxy.find(id)
          .then((data) => {
            this.form = ModelTransformer.fetch(data)
          })
      },
      /**
       * Method to edit an existing model.
       * It'll dispatch the update action on the model module.
       */
      updateModel () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('model/update', self.form)
      },
      /**
       * Delete the resource
       */
      destroyModel (model) {
        const self = this
        const app = self.$f7
        app.dialog.confirm('Are you sure to delete?', 'Confirm', () => {
          app.preloader.show()
          self.$store.dispatch('model/destroy', model)
        })
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchModel(this.$f7route.params.uuid)
      this.$store.dispatch('make/reload', (proxy) => {
        proxy.removeParameters(['q', 'order', 'sort', 'page'])
      })
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
