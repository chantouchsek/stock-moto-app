<template>
    <f7-page>
        <f7-navbar title="Edit Role" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Edit: {{ form.name }}</f7-block-title>
        <f7-list no-hairlines-md form>
            <f7-list-input
                    label="Name"
                    type="text"
                    placeholder="Role name"
                    info="Default validation"
                    required
                    validate
                    clear-button
                    :value="form.name"
                    @input="form.name = $event.target.value"
            >
            </f7-list-input>
        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill @click.native="updateRole" big outline round>
                        <i class="f7-icons">edit</i> Edit
                    </f7-button>
                </f7-col>
                <f7-col>
                    <f7-button fill color="red" big outline round @click.native="destroyRole(form)">
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
  import RoleProxy from '@/proxies/RoleProxy'
  import RoleTransformer from '@/transformers/RoleTransformer'

  const proxy = new RoleProxy()

  export default {
    name: 'edit-category',
    data () {
      return {
        form: {}
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
       * Method used to fetch an category.
       *
       * @param {number | string} id The id of the category.
       */
      fetchRole (id) {
        proxy.find(id)
          .then((data) => {
            this.form = RoleTransformer.fetch(data)
          })
      },
      /**
       * Method to edit an existing category.
       * It'll dispatch the update action on the category module.
       */
      updateRole () {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('category/update', self.form)
      },
      /**
       * Delete the resource
       */
      destroyRole (category) {
        const self = this
        const app = self.$f7
        app.dialog.confirm('Are you sure to delete?', 'Confirm', () => {
          app.preloader.show()
          self.$store.dispatch('category/destroy', category)
        })
      }
    },
    /**
     * This method will be fired once the page has been loaded.
     * It'll fetch the quest using the given quest identifier.
     */
    mounted () {
      this.fetchRole(this.$f7route.params.uuid)
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
