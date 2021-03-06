import Vue from 'vue'
import downloadFile from './downloadFile'

import '../../assets/js/common.js'

import fastclick from 'fastclick'
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { downloadFile },
  template: '<downloadFile/>'
})
