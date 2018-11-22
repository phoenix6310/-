<template>
  <div class="item-content">
    <div :class="{'item-border-content':true, 'item-1px-border':iBorder}">
      <div class="item-name">{{iName}}</div>
      <div class="item-value">{{iValue}}</div>
    </div>
    <div class="float_clear"></div>
  </div>
</template>
<script type="es6">
export default {
  name:'InfoItem',
  props:['iName', 'iValue', 'iBorder']
}
</script>
<style lang="stylus">
  @import '../../common/stylus/index.styl'
  .item-content
    padding 0 0.24rem
    box-sizing border-box
    min-height:0.57rem
    width 100%
    .item-border-content
      width 100%
      height 100%
      font-size 0.28rem
      line-height 0.57rem
    .item-1px-border
      border-1px(#e2e2e2)
    .item-name
      width 2.1rem
      float left
      height 100%
      word-wrap:break-word
      word-break:break-all
    .item-value
      width 4.74rem
      height 100%
      float right
      word-wrap:break-word
      word-break:break-all


</style>
