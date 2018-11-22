import Vue from 'vue'
import PreRelease from './PreRelease'
import _ from 'lodash'

import '@/assets/js/common.js'
import 'static/css/reset.css'

Vue.prototype.getClientHeight = function() {
  //        获取移动端屏幕高度
  var winHeight
  if (window.innerHeight) {
    winHeight = window.innerHeight;
  } else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight;
  } else if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight;
  }
  return winHeight
}

Vue.mixin({
  updated() {
    var scrollBody = document.querySelector(".page-scroll"); //获取滚动区域的DOM
    var bottom = document.querySelector(".page-footer"); //获取底部DOM
    var height = this.getClientHeight() - bottom.offsetHeight; //获取滚动区域高度
    scrollBody.style.height = height + "px"; //计算出实际的滚动区域的高度，然后设置
    new JRoll(scrollBody, { bounce: true }); //实例化JRoll插件
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { PreRelease },
  template: '<PreRelease/>'
})
