<template>
  <div class="tool_box">
    <h1>{{ this.$route.meta.title }}</h1>
    <div id="container">
      <el-button
        onclick="document.getElementById('input_file').click();"
        type="primary"
      >选择图片</el-button>

      <input
        type="file"
        id="input_file"
        size="10"
        style="display:none;"
        @change="selectImage($event['path'][0])"
      />
      <div id="wrapper">
        <!-- 原图 -->
        <div class="artwork">
          <p class="pic_info_p">
            width：
            <strong>{{ picWidth }}</strong>px height：
            <strong>{{ picHeight }}</strong>px size：
            <strong>{{ picSize }}</strong>kb
          </p>
          <div class="">

          </div>
          <canvas id="cropper"></canvas>

          <p class="p_btn" style="display:none;">
            <a
              class="_btn"
              id="rotateLeftBtn"
              href="javascript:void(0);"
              @click="rotateImage($event);"
            >向左旋转</a>
            <a
              class="_btn"
              id="rotateRightBtn"
              href="javascript:void(0);"
              @click="rotateImage($event);"
            >向右旋转</a>
          </p>
        </div>

        <!-- input 输入框 -->
        <div class="input_div">
          <p class="p_config">图片配置项：</p>
          <p class="radio_p">
            <input type="radio" class="imgType" id="type_png" value="image/png" v-model="imgType" />
            <label for="type_png">png</label>
          </p>
          <p class="radio_p">
            <input type="radio" class="imgType" id="type_jpg" value="image/jpeg" v-model="imgType" />
            <label for="type_jpg">jpg</label>
          </p>

          <!-- 滑块 -->
          <div class="range_div" style="display:none;">
            <input type="range" min="1" max="10" value="10" />
            <span>品质:100</span>
          </div>

          <div class="input_box">
            <strong>缩略图名称：</strong>
            <input type="text" v-model="small_pic_name" placeholder="图片名称" />
          </div>

          <div class="input_box">
            <strong>缩略图宽度：</strong>
            <input type="number" v-model="small_pic_width" placeholder="width" />
          </div>

          <div class="input_box">
            <strong>缩略图高度：</strong>
            <input type="number" v-model="small_pic_height" placeholder="height" />
          </div>
          <button class="create_pic" @click="selectImage('input_file')">生成图片</button>

          <p class="p_ps">PS：改变图片选项后要记得生成图片</p>
        </div>
        <!-- 放缩略图的元素  -->
        <div id="thumbnail" class="thumbnail">
          <div class="thumbnail_box">
            <el-button type="success">
              <a :href="small_base64" :download="small_pic_name">Download</a>
            </el-button>
            <canvas
              id="smallPic"
              :width="small_pic_width"
              :height="small_pic_height"
              class="preview"
            ></canvas>
          </div>
        </div>
      </div>
    </div>

    <div id="test_pic"></div>
    <img :src="small_base64" style="display:none;" />
  </div>
</template>

<script>
import '../../../assets/js/createImg';

export default {
  data() {
    return {
      imgType: 'image/png', // 图片类型
      picWidth: 0, // 原图宽度
      picHeight: 0, // 原图高度
      picSize: 0, // 原图大小
      small_pic_width: 100, // 缩略图宽度
      small_pic_height: 100, // 缩略图高度
      small_pic_name: 'test', // 缩略图随即名称
      small_base64: '', // 缩略图的下载地址
      aaa: 100
    };
  },
  // 加载生成图片需要的方法插件
  beforeCreate: function() {
    /* 多尺寸 zc*/
  },
  // 成功后
  mounted: function() {
    // 绑定  canvas-width:300, canvas-height:300, 中间那个裁剪的方块 180 * 180
    // this.cropper = new ImageCropper(300, 300, 180, 180);
    // this.cropper.setCanvas("cropper");
    // this.cropper.addPreview("preview180");
    // this.cropper.addPreview("preview100");
  },
  methods: {
    // 生成文件
    readFile: function() {
      console.log(this.aaa);
    },
    // change触发
    selectImage: function(fileList) {
      if (fileList === 'input_file') {
        fileList = document.getElementById('input_file');
      }
      if (fileList['files'].length === 0) {
        return false;
      }
      // vue 元素
      var that = this;
      // 选择的files
      var ele_files = fileList['files'][0];
      that.picSize = (ele_files['size'] / 1024).toFixed(2);

      // 把file文件的类型 赋值给 data
      // that.imgType = ele_files['type'];
      // // 文件名用时间戳
      // that.small_pic_name = Date.parse(new Date());
      // 生成base64
      var reader = new FileReader();
      reader.readAsDataURL(ele_files);
      var base64_str = '';
      // 生成base64成功后执行
      reader.onload = function(e) {
        base64_str = this.result;
        // 获取图片的宽高
        var new_image = new Image();
        new_image.src = base64_str;
        // base64图片加载成功后，执行
        new_image.onload = function() {
          var img_height = new_image.height; // 图片的高度
          var img_width = new_image.width; // 图片的宽度

          that.picWidth = img_width;
          that.picHeight = img_height;
          // 设置画布的大小  (画布的width, 画布的height, 裁剪的方块的width，裁剪的方块的height)
          // eslint-disable-next-line no-undef
          that.cropper = new ImageCropper(
            img_width,
            img_height,
            img_width,
            img_height
          );
          that.cropper.setCanvas('cropper');
          that.cropper.addPreview('smallPic');
          that.cropper.loadImage(fileList['files'][0]);
          // canvas 转换为 图片
          function convertCanvasToImage(canvas) {
            var image = new Image();
            image.src = canvas.toDataURL(that.imgType);
            return image;
          }
          // 延长0.1秒去截取图片
          setTimeout(function() {
            // 获取缩略图的 canvas
            var smallPic = document.getElementById('smallPic');
            that.small_base64 = convertCanvasToImage(smallPic).src;
            console.log('生成下载');
          }, 100);
        };
      };
    },
    // 旋转图片
    rotateImage: function(e) {
      console.log(e);
      switch (e.target.id) {
        case 'rotateLeftBtn':
          this.cropper.rotate(-90);
          break;
        case 'rotateRightBtn':
          this.cropper.rotate(90);
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.tool_box {
  font-size: 12px;
  padding: 20px;
  color: #000;
  position: relative;
  .artwork {
    display: block;
  }
  .radio_p {
    display: inline-block;
    vertical-align: middle;
    input {
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    label {
      font-size: 16px;
      padding-left: 4px;
      vertical-align: middle;
    }
  }
  .input_div {
    margin: 20px 0;
    width: auto;
    .p_ps {
      color: #ed2e49;
      font-size: 14px;
    }
    .p_config {
      font-weight: bolder;
      color: #0da0e4;
      margin-bottom: 20px;
    }
    .create_pic {
      width: auto;
      padding: 0 20px;
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      border-radius: 5px;
      background: #51a3dd;
      border: none;
      font-family: "Microsoft YaHei";
    }
    .input_box {
      text-align: center;
      margin: 10px 0;
      height: 34px;
      display: table;
      strong {
        padding: 6px 12px;
        font-size: 14px;
        height: 34px;
        font-weight: 400;
        line-height: 1;
        color: #555;
        text-align: center;
        background-color: #eee;
        border: 1px solid #ccc;
        border-right: none;
        border-radius: 4px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      input {
        width: 250px;
        display: table-cell;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
  .pic_info_p {
    margin: 10px 0;
    strong {
      color: #e73e11;
    }
  }
  #cropper {
    border: 1px solid #ccc;
  }

  .preview {
    border: 1px solid #ccc;
  }
  .p_btn {
    margin: 10px 0;
  }
  ._btn {
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

  #saveBtn {
    width: 67px;
    height: 27px;
  }
  .thumbnail {
    p {
      margin: 5px 0;
    }
  }
}
</style>

