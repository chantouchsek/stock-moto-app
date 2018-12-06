<template>
    <f7-page>
        <f7-navbar title="New Sale" back-link="Back" sliding></f7-navbar>
        <f7-block-title>Add new sale</f7-block-title>
        <f7-list no-hairlines-md>
            <f7-list-input
                    label="ID"
                    type="text"
                    placeholder="ID"
                    info="Default validation"
                    required
                    validate
                    clear-button
            >
            </f7-list-input>
            <f7-list-input
                    label="Serial number"
                    type="text"
                    placeholder="Enter serial number"
                    info="Default validation"
                    required
                    validate
                    clear-button
            >
            </f7-list-input>

            <f7-list-input
                    label="Category"
                    type="select"
                    defaultValue="1"
                    placeholder="Please choose..."
            >
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
            </f7-list-input>

            <f7-list-input
                    label="Price"
                    type="text"
                    placeholder="Enter product price"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Quantity"
                    type="number"
                    placeholder="Enter quantity"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Date"
                    type="date"
                    placeholder="Select sale date"
                    info="With custom error message"
                    error-message="Only numbers please!"
                    required
                    validate
                    clear-button
            >
            </f7-list-input>

            <f7-list-input
                    label="Customer name"
                    type="text"
                    placeholder="Enter customer name"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
            >
                <span slot="info"></span>
            </f7-list-input>

        </f7-list>
        <f7-block>
            <f7-row>
                <f7-col>
                    <f7-button fill big>Add</f7-button>
                </f7-col>
            </f7-row>
        </f7-block>
    </f7-page>
</template>
<script>
  export default {
    name: 'create-sale',
    data () {
      return {
        staff: {}
      }
    }
  }
</script>
