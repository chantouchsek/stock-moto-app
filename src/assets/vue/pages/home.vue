<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left>
                <f7-link class="panel-open" open-panel="left" icon="fa fa-bars"></f7-link>
            </f7-nav-left>
            <div class="title">Stock Moto</div>
            <f7-nav-right>
                <f7-link popover-open=".popover-menu">
                    <i class="f7-icons">person</i>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>

        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-card content="Stock Moto"></f7-card>
                </f7-col>
            </f7-row>
            <f7-row>
                <f7-col @click.native="goToPage('/sales/')">
                    <f7-card content="Sells"></f7-card>
                </f7-col>
                <f7-col>
                    <f7-card content="Buys"></f7-card>
                </f7-col>
            </f7-row>
            <f7-row>
                <f7-col @click.native="goToPage('/staffs/')">
                    <f7-card content="Staffs"></f7-card>
                </f7-col>
                <f7-col>
                    <f7-card content="Reports"></f7-card>
                </f7-col>
            </f7-row>
        </f7-block>
        <f7-popover class="popover-menu">
            <f7-list>
                <f7-list-item @click.native="logout" title="Logout"></f7-list-item>
            </f7-list>
        </f7-popover>
    </f7-page>
</template>
<script>
  export default {
    name: 'HomePage',
    methods: {
      goToPage (page) {
        this.$f7router.navigate(page)
      },
      logout () {
        this.$store.dispatch('auth/logout')
        this.$f7router.navigate('/login/')
      }
    },
  };

</script>
