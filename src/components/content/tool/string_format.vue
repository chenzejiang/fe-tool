<template>
  <div class="tool_box">
    <h1>{{ this.$route.meta.title }}</h1>
    <div class="stringFormat">
      <!-- <label for="exampleInputPassword1">即将转换的内容</label> -->
      <!-- <el-alert
        title="即将转换的内容"
        type="error"
        :closable="false"
      > -->
      <p class="p1">即将转换的内容</p>
      <el-input v-model="textFormat" placeholder="请输入.."></el-input>
    </div>

    <div class="inputBox">
      <div v-for="(item) in formarArr" :key="item.title" class="form-inline">
        <el-input placeholder="请输入内容" :value="item.val" class="input-with-select">
          <template slot="prepend">{{ item.title }}</template>
          <el-button
            v-clipboard:copy="item.val"
            v-clipboard:success="onCopySuccess"
            slot="append"
            type="primary"
          >
            Copy
          </el-button>
        </el-input>
      </div>
    </div>

    <!-- <div v-for="(item) in formarArr" :key="item.title" class="form-inline">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-addon">{{ item.title }}</div>
          <input type="text" class="form-control" :value="item.val">
          <div
            v-clipboard:copy="item.val"
            v-clipboard:success="onCopySuccess"
            class="input-group-addon btn btn-primary"
          >Copy</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      formarArr: [
        {
          title: '英文大写',
          prop: this.upperCase,
          val: ''
        },
        {
          title: '英文小写',
          prop: this.lowerCase,
          val: ''
        },
        {
          title: '字符串转unicode编码',
          prop: this.str2unicode,
          val: ''
        },
        {
          title: 'unicode解码',
          prop: this.unicode2str,
          val: ''
        },
        {
          title: 'decodeURIComponent解码',
          prop: this.decodeURIComponent,
          val: ''
        },
        {
          title: 'decodeURI解码',
          prop: this.decodeURI,
          val: ''
        },
        {
          title: '时间戳转换时间',
          prop: this.timestamp,
          val: ''
        }
      ],
      textFormat: ''
    };
  },
  watch: {
    textFormat: function(_str) {
      const res = this.formarArr.map(item => {
        const obj = item;
        obj.val = item.prop(_str);
        return obj;
      });
      this.formarArr = res;
    }
  },
  methods: {
    /* 复制成功 */
    onCopySuccess() {
      console.log('复制成功');
    },
    /* 转换为英文大写 */
    upperCase(_str) {
      return _str.toUpperCase();
    },
    /* 转换为英文小写 */
    lowerCase(_str) {
      return _str.toLowerCase();
    },
    /* 字符串转unicode编码 */
    str2unicode(_str) {
      var res = [];
      for (let i = 0; i < _str.length; i++) {
        res[i] = ('00' + _str.charCodeAt(i).toString(16)).slice(-4);
      }
      return res.length === 0 ? '' : '\\u' + res.join('\\u');
    },
    /* unicode解码 */
    unicode2str: function(_str) {
      _str = _str.replace(/\\/g, '%');
      _str = unescape(_str);
      _str = _str.replace(/%/g, '\\');
      _str = _str.replace(/\\/g, '');
      return _str;
    },
    /* decodeURIComponent解码 */
    decodeURIComponent(_str) {
      return decodeURIComponent(_str);
    },
    /* decodeURI解码 */
    decodeURI(_str) {
      return decodeURI(_str);
    },
    /* 时间戳转换可阅读时间 */
    timestamp(_time) {
      let stamp = Number(_time);
      if (_time.length === 10) {
        stamp = stamp * 1000;
      }
      let res = new Date(Number(stamp)).format('yyyy-MM-dd hh:mm:ss');
      if (_time.length !== 10 && _time.length !== 13 && isNaN(stamp) === true) {
        res = '时间戳格式不正确';
      }
      return _time === '' ? '' : res;
    }
  }
};
</script>

<style lang="less" scoped>
.tool_box {
  font-size: 20px;
  padding: 20px;
  color: #000;
  .stringFormat{
    margin-bottom: 30px;
  }
  .form-inline {
    margin-bottom: 10px;
    max-width: 600px;
  }
  .btn-primary {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
  }
  .p1{
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    color: #409EFF;
    margin-bottom: 10px;
  }
}
</style>