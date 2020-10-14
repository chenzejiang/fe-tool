<template>
  <el-row>
    <p>
      <span>生成二维码的地址:</span>
      <input
        type="text"
        :value="qrOption.text"
        placeholder="http://tool.chenzejiang.com"
      />
    </p>
    <p>
      <span>宽度:</span>
      <input type="number" v-model="qrOption.width" />
    </p>
    <p>
      <span>高度:</span>
      <input type="number" v-model="qrOption.height" />
    </p>
    <p>
      <span>前景色: {{ qrOption.colorDark }}</span>
      <el-color-picker v-model="qrOption.colorDark"></el-color-picker>
    </p>
    <p>
      <span>背景色: {{ qrOption.colorLight }}</span>
      <el-color-picker v-model="qrOption.colorLight"></el-color-picker>
    </p>
    <el-button type="primary" @click="qr_code">点击生成二维码</el-button>
    <div class="qrcode" id="qrcode"></div>
  </el-row>
</template>

<script>
import QRCode from 'qrcodejs2';

export default {
  data() {
    return {
      qrOption: {
        text: 'https://tool.chenzejiang.com',
        width: 200,
        height: 200,
        colorDark: '#000',
        colorLight: '#fff'
      }
    };
  },
  mounted() {
    this.qr_code();
  },
  methods: {
    /* 生成二维码 */
    qr_code: function() {
      document.getElementById('qrcode').innerHTML = '';
      new QRCode('qrcode', {
        ...this.qrOption,
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }
};
</script>

<style lang="less" scoped>
p {
  margin-bottom: 10px;
  span {
    display: block;
  }
  input {
    width: 400px;
    height: 40px;
    margin: 5px 0;
    font-size: 18px;
    color: #666666;
    padding: 0 5px;
  }
}
.qrcode {
  margin: 20px 0;
}
.qrcode_btn {
  display: inline-block;
  padding: 0 20px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: #51a3dd;
  border: none;
}
</style>
