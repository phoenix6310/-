import Vue from 'vue'
import ProductPlan from './ProductPlan'

import '../../assets/js/common.js'

import fastclick from 'fastclick'
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { ProductPlan },
  template: '<ProductPlan/>'
})
