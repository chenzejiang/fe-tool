<template>
  <div class="tool_box">
    <el-tabs v-model="activeName">
      <el-tab-pane label="生成二维码" name="create">
        <creat-code />
      </el-tab-pane>

      <el-tab-pane label="识别二维码" name="recognition">
        <reader-code />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CreatCode from './components/create_code.vue';
import ReaderCode from './components/reader_code.vue';

export default {
  components: {
    CreatCode,
    ReaderCode
  },
  data() {
    return {
      activeName: 'create'
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.tool_box {
  font-size: 20px;
  padding: 20px;
  color: #000;
}
</style>
