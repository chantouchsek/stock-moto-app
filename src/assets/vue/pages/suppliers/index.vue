<template>
    <f7-page
            ptr
            infinite
            :infinite-preloader="showPreloader"
            @infinite="setQueryScroll"
            @ptr:refresh="reloadSupplier"
    >
        <f7-navbar back-link="Back" sliding>
            <f7-nav-title>Stock Moto</f7-nav-title>
            <f7-subnavbar :inner="false">
                <f7-searchbar
                        :custom-search="true"
                        :value="query"
                        @input="query = $event.target.value"
                        @searchbar:clear="query = ''"
                ></f7-searchbar>
            </f7-subnavbar>
        </f7-navbar>

        <f7-block-title>Suppliers List</f7-block-title>
        <f7-list>
            <f7-list-item v-for="(cg,index) in supplier.all"
                          swipeout
                          @swipeout:delete="destroySupplier(cg)"
                          :key="`cg-${index}`"
                          :title="cg.name"
                          after="Edit"
                          @click="getEditRoute(cg.uuid)"
                          link
            >
                <f7-swipeout-actions right>
                    <f7-swipeout-button delete>
                        Delete
                    </f7-swipeout-button>
                </f7-swipeout-actions>
            </f7-list-item>
        </f7-list>

        <f7-list v-if="supplier.all.length === 0">
            <f7-list-item title="Nothing found"></f7-list-item>
        </f7-list>

        <f7-fab position="right-bottom"
                slot="fixed"
                color="orange"
                @click.native="redirectToCreatePage">
            <f7-icon ios="f7:add" md="material:add"></f7-icon>
        </f7-fab>

    </f7-page>
</template>
<script>
  import { mapState } from 'vuex'
  import debounce from 'lodash.debounce'

  export default {
    name: 'SupplierIndex',
    computed: {
      ...mapState(['supplier']),
      limit: {
        get () {
          return this.supplier.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.supplier.pagination.currentPage
        },
        set (page) {
          this.setPage(page)
        }
      }
    },
    data () {
      return {
        query: null,
        pageNumbers: [5, 10, 20, 30, 50, 500],
        sortBy: 'name',
        sortDesc: false,
        busy: false,
        allowInfinite: true,
        showPreloader: true
      }
    },
    methods: {
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('supplier/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('supplier/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQuery: debounce(function (query) {
        this.$store.dispatch('supplier/reload', (proxy) => {
          proxy.setParameters({
            'q': query,
            'order': this.sortDesc ? 'desc' : 'asc',
            'sort': this.sortBy
          })
            .removeParameter('page')
        })
      }, 500),
      /**
       * Method used to get the supplier route.
       *
       * @param {Number} uuid The supplier identifier.
       *
       * @returns {Object} The supplier route.
       */
      getEditRoute (uuid) {
        this.$f7router.navigate({
          name: 'suppliers.edit',
          params: { uuid: uuid }
        })
      },
      /**
       * Reload the resource
       */
      reloadSupplier: debounce(function (event, done) {
        const self = this;
        self.$store.dispatch('supplier/reload', (proxy) => {
          proxy.removeParameters(['q', 'order', 'sort', 'limit', 'page'])
        })
        done()
      }, 1000),
      /**
       * Delete the resource
       */
      destroySupplier (supplier) {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('supplier/destroy', supplier)
      },
      /**
       * Create the resource
       */
      redirectToCreatePage () {
        const self = this
        self.$f7router.navigate({ name: 'suppliers.create' })
      },
      /**
       * The method used to load more data on scroll
       *
       * The results will be debounced using the lodash debounce method.
       */
      setQueryScroll: debounce(function () {
        const self = this
        if (self.currentPage < self.supplier.pagination.totalPages) {
          self.currentPage++
          return
        }
        self.showPreloader = true
      }, 1000)
    },
    /**
     * Available watchers for this page.
     */
    watch: {
      query (query) {
        this.setQuery(query)
      },
      'supplier': {
        deep: true,
        immediate: true,
        handler (value) {
          const self = this
          if (value.all.length === value.pagination.totalCount) {
            self.showPreloader = false
            return
          }
          self.showPreloader = true
        }
      }
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('supplier/reload', (proxy) => {
            proxy.removeParameters(['q', 'order', 'sort'])
          })
          // this.$echo
          //   .channel('supplier')
          //   .listen('User.Created', supplier => this.$store.dispatch('supplier/created', supplier))
          //   .listen('User.Updated', (supplier) => {
          //     console.log(supplier)
          //     this.$store.dispatch('supplier/updated', supplier)
          //   })
          //   .listen('User.Deleted', supplier => this.$store.dispatch('supplier/destroyed', supplier))
        }
      })
    }
  }
</script>
