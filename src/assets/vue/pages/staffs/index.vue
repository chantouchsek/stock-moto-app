<template>
    <f7-page>
        <f7-navbar back-link="Back" sliding>
            <f7-nav-title>Stock Moto</f7-nav-title>
            <f7-nav-right>
                <f7-link icon="fa fa-plus-circle" href="/add-staff/"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block-title>Staffs List</f7-block-title>
        <f7-list media-list>
            <f7-list-item
                    v-for="(staff, index) in 50"
                    :key="index"
                    link="/staffs/1"
                    :title="`Staff ${staff}`"
                    :subtitle="`Position ${staff}`">
                <img slot="media" :src="`https://picsum.photos/1${index}`" width="44"/>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
  export default {
    name: 'StaffIndex',
    data () {
      return {
        staffs: [
          {
            id: 1,
            name: '',
            position: '',
            avatar: 'https://picsum.photos/60/60?random'
          }
        ]
      }
    }
  }
</script>
