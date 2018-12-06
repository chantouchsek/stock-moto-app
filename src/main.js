// Import Vue
import Vue from 'vue'

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import Framework7 Vue
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Style
import Framework7CSS from 'framework7/css/framework7.css'

// Import F7 iOS Icons
import Framework7Icons from 'framework7-icons/css/framework7-icons.css'

// Import Material Icons
import MaterialIcons from 'material-design-icons/iconfont/material-icons.css'

// Import Fontawesome Theme Styles
import FontAwesome from 'font-awesome/css/font-awesome.css'

// Import App Custom Styles
// import AppStyles from './assets/sass/main.scss'

// Import App Component
import app from '@/app'

// Different F7-Vue plugin initialization with f7 v3.0
Framework7.use(Framework7Vue)


// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  render: c => c('app'),
  components: {
    app
  }
});

// Fix android Back behaviour

document.addEventListener('deviceready', () => {

  // Bind to the back button for Android

  document.addEventListener('backbutton', function () {

    // NOTE: The back button will behave differently depending on circumstance
    // If the side panel is open, close it
    if (document.querySelector('.panel-left.active')) {
      // This will do nothing when the split-view is open
      return window.f7.closePanel();
    }
    // Close modals
    // @TODO How to handle modals we shouldn't close like a login-screen?
    if (document.querySelector('.modal-in')) {
      return f7.closeModal();
    }
    // If we have a back button, we want it to go back
    if ($f7router.history.length > 1) {
      return $f7router.router.back();
    }
    // Default to closing the app
    return window.navigator.app.exitApp();
  });

});
