import Vue from 'vue'
import ProductRelease from './ProductRelease'

import '../../assets/js/common.js'

import fastclick from 'fastclick'
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { ProductRelease },
  template: '<ProductRelease/>'
})
