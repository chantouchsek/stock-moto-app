<template>
    <f7-page>
        <f7-navbar title="Sale Detail" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Sale Detail</f7-block-title>
        <f7-card>
            <f7-card-header class="no-border">
                <div class="avatar">
                    <img src="https://picsum.photos/500/200" width="34" height="34"/>
                </div>
                <div class="name">John Doe</div>
                <div class="date">10/10/1996</div>
            </f7-card-header>
            <f7-card-content>
                <f7-list>
                    <f7-list-item>First name: Jonh</f7-list-item>
                    <f7-list-item>Last name: Doe</f7-list-item>
                    <f7-list-item>Email: john.doe@example.com</f7-list-item>
                    <f7-list-item>Phone number: 070374622</f7-list-item>
                    <f7-list-item>Base Salary: 400$</f7-list-item>
                    <f7-list-item>Pay day: 10/10/2018</f7-list-item>
                    <f7-list-item>Start date: 10/10/2017</f7-list-item>
                    <f7-list-item>Date of birth: 20/10/1994</f7-list-item>
                </f7-list>
            </f7-card-content>
        </f7-card>
    </f7-page>
</template>
<script>
  export default {
    name: 'staff-show',
    data () {
      return {
        staff: {}
      }
    }
  }
</script>
