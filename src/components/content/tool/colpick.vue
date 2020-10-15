<template>
  <div class="tool_box color_picker">
    <h1>{{ this.$route.meta.title }}</h1>
    <el-row>
      <el-color-picker
        color-format="hex"
        v-model="hexColor"
        @active-change="onChangeColor"
      >
      </el-color-picker>
    </el-row>

    <ul>
      <li>
        <span class="text">16进制颜色：</span>
        <el-input v-model="hexColor"></el-input>
      </li>
      <li>
        <span class="text">RGB颜色：</span>
        <el-input v-model="rgbColor"></el-input>
      </li>
      <li>
        <span class="text">RGBA颜色：</span>
        <el-input v-model="rgbaColor" @change="onRgbaChange"></el-input>
        <div class="colorBolck" :style="{background: rgbaColor}"></div>
      </li>
      <li>
        <span class="text">透明度：</span>
        <div class="el-slider">
          <el-slider
            v-model="alpha"
            show-stops
            :step="0.1"
            :min="0"
            :max="1"
          >
          </el-slider>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import color from './../../../utils/color';

export default {
  data() {
    return {
      hexColor: '#000000',
      rgbColor: 'rgb(0, 0, 0)',
      rgbaColor: 'rgba(0, 0, 0, 1)',
      alpha: 1
    };
  },
  watch: {
    rgbColor(n) {
      let newStr = n.replace('rgb', 'rgba');
      newStr = newStr.replace(')', `, ${this.alpha})`);
      this.rgbaColor = newStr;
      this.hexColor = color.rgb2Hex(n);
    },
    hexColor(n) {
      this.rgbColor = color.hex2rgb(n);
    },
    alpha(n) {
      console.log(n);
      let newStr = this.rgbColor.replace('rgb', 'rgba');
      newStr = newStr.replace(')', `, ${n})`);
      this.rgbaColor = newStr;
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 修改rgba
     */
    onRgbaChange(v) {
      const reg = /(?<=rgba\().*?(?=\))/gi;
      const newStrArr = reg.exec(v);
      if (newStrArr) {
        const newStr = newStrArr[0];
        const colorArr = newStr.split(', ');
        const rgbStr = `rgb(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]})`;
        this.rgbColor = rgbStr;
        this.alpha = Number(colorArr[3]);
      }
    },
    /**
     * 更改颜色
     */
    onChangeColor(value) {
      this.rgbColor = value;
      const hexStr = color.rgb2Hex(value);
      this.hexColor = hexStr;
    }
  }
};
</script>

<style lang="less">
.color_picker .el-color-picker__trigger{
  width: 400px;
  height: 100px;
}
</style>

<style lang="less" scoped>
.tool_box {
  font-size: 20px;
  padding: 20px;
  color: #000;
  /deep/ .el-color-picker{
    height: 100px;
  }
  /deep/ .el-input{
    width: 300px
  }
  ul{
    width: 100%;
    li{
      font-size: 14px;
      height: 50px;
      border-bottom: 2px solid rgba(100, 100, 100, 0.3);
      vertical-align: top;
      display: flex;
      align-items: center;
      .el-slider{
        display: inline-block;
        width: 296px
      }
      span{
        width: 100px;
        text-align: right;
        margin-right: 20px;
        display: inline-block;
      }
      .colorBolck{
        display: inline-block;
        margin-left: 20px;
        width: 70px;
        border-radius: 4px;
        height: 80%;
      }
    }
  }
}

</style>