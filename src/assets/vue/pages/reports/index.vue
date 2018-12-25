<template>
    <f7-page>
        <f7-navbar back-link="Back" sliding title="Reports"></f7-navbar>

        <f7-block-title>Report List</f7-block-title>
        <f7-list>
            <f7-list>
                <f7-list-item title="Report 1" link="#"></f7-list-item>
                <f7-list-item title="Report 2" link="#"></f7-list-item>
                <f7-list-item title="Report 3" link="#"></f7-list-item>
            </f7-list>
        </f7-list>

    </f7-page>
</template>
<script>
  import { mapState } from 'vuex'
  import debounce from 'lodash.debounce'

  export default {
    name: 'SaleIndex',
    computed: {
      ...mapState(['sale']),
      limit: {
        get () {
          return this.sale.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.sale.pagination.currentPage
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
        this.$store.dispatch('sale/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('sale/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      setQuery: debounce(function (query) {
        this.$store.dispatch('sale/reload', (proxy) => {
          proxy.setParameters({
            'q': query,
            'order': this.sortDesc ? 'desc' : 'asc',
            'sort': this.sortBy
          })
            .removeParameter('page')
        })
      }, 500),
      /**
       * Method used to get the sale route.
       *
       * @param {Number} uuid The sale identifier.
       *
       * @returns {Object} The sale route.
       */
      getDetailRoute (uuid) {
        this.$f7router.navigate({
          name: 'sales.show',
          params: { uuid: uuid }
        })
      },
      /**
       * Reload the resource
       */
      reloadSale: debounce(function (event, done) {
        const self = this;
        self.$store.dispatch('sale/reload', (proxy) => {
          proxy.removeParameters(['q', 'order', 'sort', 'limit', 'page'])
        })
        done()
      }, 1000),
      /**
       * Delete the resource
       */
      destroySale (sale) {
        const self = this
        self.$f7.preloader.show()
        self.$store.dispatch('sale/destroy', sale)
      },
      /**
       * Create the resource
       */
      redirectToCreatePage () {
        const self = this
        self.$f7router.navigate({ name: 'sales.create' })
      },
      /**
       * The method used to load more data on scroll
       *
       * The results will be debounced using the lodash debounce method.
       */
      setQueryScroll: debounce(function () {
        const self = this
        if (self.currentPage < self.sale.pagination.totalPages) {
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
      sale: {
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
          this.$store.dispatch('sale/reload', (proxy) => {
            proxy.removeParameters(['q', 'order', 'sort'])
          })
        }
      })
    }
  }
</script>
