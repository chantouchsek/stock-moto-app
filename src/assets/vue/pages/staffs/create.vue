<template>
    <f7-page>
        <f7-navbar title="New Staff" back-link="Back" sliding></f7-navbar>
        <f7-block-title>New Staff</f7-block-title>
        <f7-list no-hairlines-md form>
            <f7-list-input
                    label="First Name"
                    type="text"
                    placeholder="Your name"
                    info="Default validation"
                    required
                    validate
                    clear-button
            >
            </f7-list-input>
            <f7-list-input
                    label="Last Name"
                    type="text"
                    placeholder="Your name"
                    info="Default validation"
                    required
                    validate
                    clear-button
            >
            </f7-list-input>

            <f7-list-input
                    label="Gender"
                    type="select"
                    defaultValue="Male"
                    placeholder="Please choose..."
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </f7-list-input>

            <f7-list-input
                    label="Phone number"
                    type="text"
                    placeholder="Your phone number"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="Base Salary"
                    type="text"
                    placeholder="Your base salary"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
            >
                <span slot="info"></span>
            </f7-list-input>

            <f7-list-input
                    label="E-mail"
                    type="email"
                    placeholder="Your e-mail"
                    info="Default e-mail validation"
                    required
                    validate
                    clear-button
            >
            </f7-list-input>


            <f7-list-input
                    label="Pay day"
                    type="text"
                    placeholder="Your pay day"
                    info="With custom error message"
                    error-message="Only numbers please!"
                    required
                    validate
                    pattern="[0-9]*"
                    clear-button
            >
            </f7-list-input>

            <f7-list-input
                    label="URL"
                    type="url"
                    placeholder="Your URL"
                    info="Default URL validation"
                    required
                    validate
                    clear-button
            >
            </f7-list-input>

            <f7-list-input
                    label="Start date"
                    type="date"
                    placeholder="Select your start date"
                    info="With custom error message"
                    error-message="Only numbers please!"
                    required
                    validate
                    clear-button
            >
            </f7-list-input>
            <f7-list-input
                    label="Bio"
                    floating-label
                    type="textarea"
                    resizable
                    placeholder="Bio"
            >
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
    name: 'staff-create',
    data () {
      return {
        staff: {}
      }
    }
  }
</script>
