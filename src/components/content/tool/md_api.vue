<template>
  <div class="tool_box">
    <h1>{{ this.$route.meta.title }}</h1>

    <p class="red">
      PS: 如果接口开启跨域，请使用以下方法解决
      <br />1、Chrome插件 Allow-Control-Allow-Origin
      <br />2、Chrome 命令行启动参数 --disable-web-security
    </p>
    <textarea id="txt1">[
    {
        "title":"获取文章",
        "url":"http://test.carisok.com/pc.php/index/get_articles/?api_version=1.55&__trace_id=c8d6f77c-39a7-490c-87f2-fc0aa77e7420-store&token=45be8ba612e77dc33ae6099cdb41dacd"
    }
]</textarea>
    <div class="btn_box">
      <v-btn btnText="转换" @click.native="transformFun"></v-btn>
    </div>
    <h5>生成结果</h5>
    <textarea id="txt2"></textarea>
  </div>
</template>

<style lang="less" scoped>
.tool_box {
  font-size: 20px;
  padding: 20px;
  color: #000;
  .btn_box {
    margin: 10px 0;
  }
  .red {
    font-size: 14px;
    color: #f22;
    margin-bottom: 30px;
  }
  h5 {
    font-size: 16px;
    color: #777;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>

<script>
import comm_btn from '../comm/comm_btn.vue';

export default {
  components: {
    'v-btn': comm_btn
  },
  data() {
    return {};
  },
  mounted: function() {},
  methods: {
    getUrlParam(url) {
      var arr1 = url.split('?')[1].split('&');
      function getJson(arr) {
        var theRequest = {};
        for (var i = 0; i < arr.length; i++) {
          var kye = arr[i].split('=')[0];
          var value = arr[i].split('=')[1];
          // 给对象赋值
          theRequest[kye] = value;
        }
        return theRequest;
      }
      return JSON.stringify(getJson(arr1), null, '\t');
    },

    getHttpData(loadArr) {
      const reqList = [];
      loadArr.forEach((item, index) => {
        const req = this.axios.get(item.url);
        reqList.push(req);
      });

      return this.axios.all(reqList).then(
        this.axios.spread(function(...resList) {
          return resList;
        })
      );
    },

    getParamStr(reqArr) {
      const paramArr = JSON.parse(reqArr);
      let returnStr = '';
      for (const x in paramArr) {
        const isEmpty = paramArr[x] === '' ? '否' : '是';
        const keyType = isNaN(Number(paramArr[x])) === true ? 'String' : 'Number';
        returnStr += `|${x}|${isEmpty}|${keyType}|　|\n`;
      }
      return returnStr;
    },

    async transformFun() {
      const txt1 = document.getElementById('txt1');
      const txt2 = document.getElementById('txt2');
      txt2.value = '';
      try {
        const loadArr = JSON.parse(txt1.value);
        const resultStr = await this.getMD(loadArr);
        txt2.value = resultStr;
      } catch (e) {
        alert('请输入正确的json');
      }
    },
    /**
     * 生成MackDown文件
     */
    async getMD(loadArr) {
      const httpDataArr = await this.getHttpData(loadArr);
      const parseArr = loadArr;
      let returnStr = '';
      parseArr.forEach((item, index) => {
        const reqStr = this.getUrlParam(item.url);
        const resStr = JSON.stringify(httpDataArr[index]['data'], null, '\t');
        const paramStr = this.getParamStr(reqStr);
        const reqUrl = item.url
          .replace(/http(s)?:\/\/([^\/]+)\//i, '')
          .split('?')[0];
        const str = `
### ${index + 1}. ${item.title}

**URL：**
- \`${reqUrl}\`

**METHODS：**
- GET 

**PARAM：** 

|参数名|必选|类型|说明|
|:----|:---|:-----|:-----|
${paramStr}

**REQUEST:**

\`\`\`
${reqStr}
\`\`\`

**RESPONSE - SUCCESS:**

\`\`\`
${resStr}
\`\`\`

**RESPONSE - ERROR:**

\`\`\`
{
	errorcode: 99,
	errmsg:''
}
\`\`\`

`;
        returnStr += str;
      });
      return returnStr;
    }
  }
};
</script>

