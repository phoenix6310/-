<template>
  <div class="download-item" @click="downloadFile">
    <div class="download-item-title">
      <div class="download-item-title-name">{{itemProps.dTitle}}</div>
      <!-- <div class="download-item-title-date">{{dDate}}</div> -->
    </div>
    <div class="float_clear"></div>
    <div class="download-item-content">
      <div class="file-image" :class="`file-image-${itemProps.fileType}`"></div>
      <div class="file-name">{{itemProps.fileName}}</div>
    </div>
    <div class="float_clear"></div>
  </div>
</template>
<script type="es6">
  export default {
    name:'DownloadItem',
    /* 
     *itemProps   {
       dTitle,    下载组件的标题
       fileType,  文件类型
       fileName,  文件名
       pageUrl,   下载页面
       fileUrl    文件下载地址
     }
     *
    */
    props:['itemProps'],
    methods: {
      downloadFile(){
        let pageUrl = this.itemProps.pageUrl;
        let fileUrl = this.itemProps.fileUrl;
        let fileName = this.itemProps.fileName;
        let fileType = this.itemProps.fileType;
        let locationHref = `${pageUrl}?fileName=${fileName}&fileUrl=${fileUrl}&fileType=${fileType}`;
        location.href = locationHref
      }
    }
  }
</script>
<style lang="stylus">
  @import '../../common/stylus/index.styl'
  .download-item
    height 1.71rem;
    width 100%;
    border-bottom 0.1rem solid #e2e2e2
    padding 0 0.2rem;
    box-sizing border-box;
    font-size 0.28rem
  .download-item-title
    height 0.57rem;
    line-height 0.57rem;
    border-1px(#e2e2e2)
    .download-item-title-name
      float left;
    .download-item-title-date
      float right;
  .download-item-content

    .file-image
      width 0.64rem
      height 0.64rem
      background-size 0.64rem  0.64rem
      background-repeat no-repeat
      float left
      margin-top 0.2rem
    .file-name
      float right
      width 6.18rem
      line-height 1.13rem
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
</style>
