<template>
  <div class="content">
    <div class="page-scroll">
      <div>
        <ItemTitle titleText="所属部件信息"></ItemTitle>
        <InfoItem v-for="item in partList" :iBorder="item.border" :iName="item.name" :iValue="item.value"></InfoItem>
        <ItemTitle titleText="产品计划信息"></ItemTitle>
        <InfoItem v-for="item in productionList" :iBorder="item.border" :iName="item.name" :iValue="item.value"></InfoItem>
        <!-- <DownloadItem dTitle="预发布申请单" dDate="2018-10-20" fileName="象翌微链空间生产平台系统一期预发布申请单象翌微链空间生产平台系统一期预发布申请单.doc"
											 fileType='mark'></DownloadItem>-->
        <div class="border_blank">
        </div>
        <div> <InfoItem :iBorder="false" iName="版本内容" :iValue="thisVersion"></InfoItem>
        </div>
        <div class="border_blank">
        </div>
        <div>
          <InfoItem :iBorder="false" iName="上一版本号"  :iValue="preVersion"></InfoItem>
          <InfoItem :iBorder="true" iName="上一版本内容" :iValue="preVersionText"></InfoItem>
        </div>
      </div>
    </div>
    <footer class='page-footer' @click="pass()" v-show="showFooter" v-html="footerHTML">
    </footer>
  </div>
</template>
<script type="es6">
  import ItemTitle from './../../components/components/ItemTitle'
  import InfoItem from './../../components/components/InfoItem'
  import DownloadItem from './../../components/components/DownloadItem'
  import {partTable, productTable} from './../../config/pageInfo'
  import {instance, rpsObj} from "../../assets/js/index.js";

  export default {
    components: {
      ItemTitle,
      InfoItem,
      DownloadItem
    },
    data() {
      return {
        partList: [],
        productionList: [],
        config: {
          pageUrl: "/product-plan/find-by-id",
          previousVersionUrl: "/product-plan/previous-version"
        },
        resData: null,
        showFooter: true,
        footerHTML: '',
        thisVersion:"",
        preVersion:"",
        preVersionText:"",
        session:"",
        id:"1064367281561354240",
        enterpriseId:55,
        aliasName:"学勤",
      }
    },

    created() {
      console.log("33")
    },

    mounted() {
      rpsObj.addLoading();
      this.pageInit();
    },

    methods: {
      pageInit:function () {
        instance.get(this.config.pageUrl, {
          params: {
            enterpriseId: this.enterpriseId,
            id:this.id,
            aliasName: this.aliasName
          }
        })
          .then(res => {
            rpsObj.closeLoading();
            this.partList = this.getList(partTable, res.data.data[0]);
            this.productionList = this.getList(productTable, res.data.data[0]);
            this.thisVersion = res.data.data[0].versionText;
            this.initVersion(this.componentId);
            this.resData = res.data.data[0];
            if (this.resData.status === '00') {
              // 待签收
              this.showFooter = true;
              this.footerHTML = '<div class="footer-btn color-reject">签收</div>'
            } else if (this.resData.status === '01') {
              // 办理中
              this.showFooter = true
              this.footerHTML = '<div class="footer-btn footer-btn-half color-reject">不通过</div><div class="footer-btn footer-btn-half color-pass">通过</div>'

            } else if (this.resData.status === '02') {
              // 已办结
              this.showFooter = false
              this.footerHTML = ''
            }

          })
          .catch(err => {
            rpsObj.closeLoading();
            throw new Error(err);
          });

      },
      getList: function (showList, reqList) {
        var list = [];
        for (var i of showList) {
          list.push({name: i.name, value: reqList[i.key], border: true});
        }
        list[0].border = false;
        return list;
      },
      initVersion: function (componentId) {
        instance.get(this.config.previousVersionUrl, {
          params: {
            enterpriseId: 55,
            id: componentId,
          }
        })
          .then(res => {
            let data = res.data.data[0];
            this.preVersion = data.version;
            this.preVersionText = data.versionText;
          }).catch(err =>{
            console.error(err);
        })
      },
      pass(){

      }
    }
  }
</script>
<style lang="stylus">
  .content
    font-size: 0.28rem
  .border_blank
    height: 0.1rem
    width:100%
    background-color: #eee
  .footer-btn
    float left;
    width 100%;
    text-align center;
    color #fff;
    font-size 0.36rem;
  &.footer-btn-half
    width 50%
  .color-reject
    background-color #219cde;

  .color-pass
    background-color #fb9200;
</style>
