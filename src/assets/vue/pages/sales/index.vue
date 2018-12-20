<template>
    <f7-page
            ptr
            infinite
            :infinite-preloader="showPreloader"
            @infinite="setQueryScroll"
            @ptr:refresh="reloadSale"
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

        <f7-block-title>Sales List</f7-block-title>
        <f7-list>
            <f7-list-item v-for="(sell,index) in sale.all"
                          swipeout
                          @swipeout:delete="destroySale(sell)"
                          :key="`sell-${index}`"
                          :title="`$${sell.total}`"
                          after="Detail"
                          @click="getDetailRoute(sell.uuid)"
                          link
                          :footer="`Date: ${sell.createdAt}`"
            >
                <f7-swipeout-actions right>
                    <f7-swipeout-button delete>
                        Delete
                    </f7-swipeout-button>
                </f7-swipeout-actions>
            </f7-list-item>
        </f7-list>

        <f7-list v-if="sale.all.length === 0">
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
