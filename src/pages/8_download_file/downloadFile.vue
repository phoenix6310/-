<template>
  <div class="download-file-page">
      <div>
        <div>
          <div class="file-img" :class="`file-big-image-${fileType}`"></div>
        </div>
        <div v-text="fileName" class="file-name"></div>
      </div>
      <a :href="fileUrl" :download="fileName" class="file-download">下载</a>
      <!-- <div @click='downloadFile' class="file-download">
        下载
      </div> -->
  </div>
</template>
<script type="es6">
import { rpsObj, getUrlParam } from "../../assets/js/index.js";

export default {
  data() {
    return {
      fileType: "",
      fileName: "",
      fileUrl: ""
    };
  },
  mounted() {
    rpsObj.addLoading();
    this.fileType = getUrlParam("fileType");
    this.fileName = getUrlParam("fileName");
    this.fileUrl = getUrlParam("fileUrl");
    rpsObj.closeLoading();
  },
  methods: {
    downloadFile() {
      // window.open(this.fileUrl)
      // window.location.href = this.fileUrl
      var ifr = document.createElement("iframe");
      ifr.src = this.fileUrl;
      ifr.style.display = "none";
      document.body.appendChild(ifr);
      window.setTimeout(function() {
        document.body.removeChild(ifr);
      }, 2000);
    }
  }
};
</script>
<style lang="stylus">
@import '../../common/stylus/index.styl';

.download-file-page {
  background-color: #eeeeee;
  height: 100%;
  font-size: 0.28rem;
  padding-top: 1.2rem;

  .file-img {
    width: 74px;
    height: 74px;
    background-size: 74px 74px;
    background-repeat: no-repeat;
    margin: 0 auto;
  }

  .file-name {
    text-align: center;
    line-height: 0.8rem;
  }

  .file-download {
    margin: 0.8rem auto 0;
    width: 5.5rem;
    height: 0.8rem;
    background-color: #219cde;
    color: #fff;
    border-radius: 0.04rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.36rem;
    display block
  }
}
</style>
