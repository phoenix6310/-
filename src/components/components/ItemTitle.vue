<template>
  <div class="item_title">
    <div class="item_title_blue"></div>
    <div class="item_title_text">{{ titleText }}</div>
  </div>
</template>
<script type="es6">
/* eslint-disable */
export default {
name: 'ItemTitle',
data () {
  return {

  }
},
props: ['titleText']
}
</script>
<style type="text/css">
  .item_title {
    height: 0.76rem;
    width: 100%;
    background-color: #eee;
  }
  .item_title_blue {
    width: 0.04rem;
    height: 0.28rem;
    background-color: #219cde;
    float: left;
    margin-top: 0.3rem;
    margin-left: 0.24rem;
    margin-right: 0.12rem;
  }
  .item_title_text{
    font-size: 0.28rem;
    float: left;
    margin-top: 0.3rem;
  }
</style>
