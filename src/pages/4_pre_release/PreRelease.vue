<template>
  <div>
    <div class="page-scroll">
        <div>
          <ItemTitle titleText="预发布信息"></ItemTitle> 
          <InfoItem v-for="(item,index) in list1" :iBorder="item.iBorder" :key="index" :iName="item.iName" :iValue="item.iValue"></InfoItem>
          <ItemTitle titleText="附件下载"></ItemTitle> 
          <DownloadItem v-for="(item,index) in list2" :itemProps="item" :key="item.id"></DownloadItem>
        </div>
    </div>
    <footer class='page-footer' v-show="showFooter" v-html="footerHTML" @click="footerClick">  
    </footer>
  </div>
</template>
<script type="es6">
import DownloadItem from "../../components/components/DownloadItem.vue";
import InfoItem from "../../components/components/InfoItem.vue";
import ItemTitle from "../../components/components/ItemTitle.vue";

import {
  instance,
  rpsObj,
  getFileType,
  rpsParams
} from "../../assets/js/index.js";
export default {
  data() {
    return {
      config: {
        pageUrl: "/pre-release/find-by-id",
        // pageUrl: 'https://test-yi005.weilian.cn/mes/rps/pre-release/find-by-id'
        signUrl: "/workbench/claimTask"
      },
      resData: null,
      showFooter: true,
      footerHTML: "",
      list1: [],
      list2: [],
      // downloadPageUrl: '../download_file.html'
      downloadPageUrl: "download_file.html",
      footerHTMLArrs: [
        '<div class="footer-btn color-reject" data-type="sign">签收</div>',
        '<div class="footer-btn footer-btn-half color-reject" data-type="reject">不通过</div><div class="footer-btn footer-btn-half color-pass" data-type="pass">通过</div>'
      ]
    };
  },
  mounted() {
    rpsObj.addLoading();

    instance
      .get(this.config.pageUrl, {
        params: {
          enterpriseId: rpsParams.enterpriseId,
          id: rpsParams.id,
          aliasName: rpsParams.aliasName
        }
      })
      .then(res => {
        rpsObj.closeLoading();
        this.resData = res.data.data[0];
        this.preInfoList1();
        this.preInfoList2();

        if (this.resData.status == "01") {
          // 待签收
          this.showFooter = true;
          this.footerHTML = this.footerHTMLArrs[0];
        } else if (this.resData.status == "02") {
          // 办理中
          this.showFooter = true;
          this.footerHTML = this.footerHTMLArrs[1];
        } else if (this.resData.status == "03") {
          // 已办结
          this.showFooter = false;
          this.footerHTML = "";
        }
      });
  },
  methods: {
    preInfoList1() {
      var that = this;
      const target = [
        {
          serverName: "preReleaseCode",
          cnName: "预发布编号"
        },
        {
          serverName: "taskCode",
          cnName: "任务编号"
        },
        {
          serverName: "taskName",
          cnName: "任务名称"
        },
        {
          serverName: "productionUnitName",
          cnName: "生产单位"
        },
        {
          serverName: "manager",
          cnName: "负责人"
        },
        {
          serverName: "requestDate",
          cnName: "申请时间"
        },
        {
          serverName: "requestNum",
          cnName: "申请次数"
        },
        {
          serverName: "startDate",
          cnName: "开始日期"
        },
        {
          serverName: "endDate",
          cnName: "结束日期"
        },
        {
          serverName: "domainNamePre",
          cnName: "预发布地址"
        },
        {
          serverName: "codeUrl",
          cnName: "程序包地址"
        },
        {
          serverName: "description",
          cnName: "描述"
        }
      ];
      _.forEach(target, function(item, index) {
        var t = {
          iBorder: true
        };
        if (index == 0) {
          t.iBorder = false;
        }
        t.iName = item.cnName;
        t.iValue = that.resData[item.serverName];
        that.list1.push(t);
      });
    },
    preInfoList2() {
      var that = this;
      const target = [
        {
          cnName: "预发布申请单",
          fileName: "requestBill",
          fileUrl: "requestBillUrl"
        },
        {
          cnName: "功能测试报告",
          fileName: "functionTestBill",
          fileUrl: "functionTestBillUrl"
        },
        {
          cnName: "性能测试报告",
          fileName: "propertyTestBill",
          fileUrl: "propertyTestBillUrl"
        },
        {
          cnName: "安全扫描报告",
          fileName: "scanBill",
          fileUrl: "scanBillUrl"
        },
        {
          cnName: "验收清单",
          fileName: "inspectionBill",
          fileUrl: "inspectionBillUrl"
        },
        {
          cnName: "验收报告",
          fileName: "inspectionReportBill",
          fileUrl: "inspectionReportBillUrl"
        },
        {
          cnName: "其它附件",
          fileName: "accessory",
          fileUrl: "accessoryUrl"
        }
      ];
      let resData = that.resData,
        _index = 20;
      _.forEach(target, function(item, index) {
        var t = {
          pageUrl: that.downloadPageUrl
        };
        if (resData[item.fileName] && resData[item.fileUrl]) {
          t.id = _index + index;
          t.dTitle = item.cnName;
          t.fileName = resData[item.fileName];
          t.fileUrl = resData[item.fileUrl];
          t.fileType = getFileType(resData[item.fileName]);
          that.list2.push(t);
        }
      });
    },
    footerClick(event) {
      var targetEl = event.target;
      const operateType = targetEl.getAttribute("data-type");
      switch (operateType) {
        case "sign":
          this.signTask();
          break;
      }
    },
    signTask() {
      instance
        .get(this.config.signUrl, {
          params: {
            enterpriseId: rpsParams.enterpriseId,
            id: rpsParams.taskId,
            aliasName: rpsParams.aliasName,
            code: "PreRelease"
          }
        })
        .then(res => {
          console.log(res);
          if (res.returnCode) {
            this.footerHTML = this.footerHTMLArrs[1];
          }
        });
    },
    rejectTask(){

    },

  },
  components: {
    ItemTitle,
    InfoItem,
    DownloadItem
  }
};
</script>
<style lang="stylus">
.footer-btn {
  float: left;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 0.36rem;

  &.footer-btn-half {
    width: 50%;
  }
}

.color-reject {
  background-color: #219cde;
}

.color-pass {
  background-color: #fb9200;
}

#test {
  width: 100px;
  height: 100px;
}
</style>
