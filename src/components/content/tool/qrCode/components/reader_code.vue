<template>
  <el-row>
    <Loading v-show="loading" />
    <!-- <div class="tag-group">
      <span class="tag-group__title">错误信息：</span>
      <el-tag type="danger">{{ error }}</el-tag>
    </div> -->

    <div class="tag-group">
      <span class="tag-group__title">识别结果：</span>
      <el-tag>{{ result }}</el-tag>
    </div>

    <qrcode-drop-zone @detect="onDetect" @dragover="onDragOver">
      <div class="drop-area" :class="{ 'dragover': dragover }">
        拖拽图片到这个位置
      </div>
    </qrcode-drop-zone>

  </el-row>
</template>

<script>
import {
  QrcodeDropZone
} from 'vue-qrcode-reader';

export default {
  components: {
    QrcodeDropZone
  },
  data() {
    return {
      loading: false,
      dragover: false,
      result: '暂无',
      error: '暂无'
    };
  },
  mounted() {
  },
  methods: {

    async onDetect(promise) {
      try {
        this.loading = true;
        const { content } = await promise;
        this.result = content;
        this.error = null;
      } catch (error) {
        if (error.name === 'DropImageFetchError') {
          this.error = 'Sorry, you can\'t load cross-origin images :/';
        } else if (error.name === 'DropImageDecodeError') {
          this.error = 'Ok, that\'s not an image. That can\'t be decoded.';
        } else {
          this.error = 'Ups, what kind of error is this?! ' + error.message;
        }
      } finally {
        this.loading = false;
      }
    },

    logErrors(promise) {
      promise.catch(console.error);
    },
    onDragOver(isDraggingOver) {
      this.dragover = isDraggingOver;
    }
  }
};
</script>

<style lang="less" scoped>
.drop-area {
  height: 300px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px;
  background-color: rgba(0,0,0,.5);
}

.dragover {
  background-color: rgba(0,0,0,.8);
}

.drop-error {
  color: red;
  font-weight: bold;
}

.tag-group{
  margin-bottom: 10px;
  .tag-group__title{
    font-size: 14px;
  }
}
</style>
