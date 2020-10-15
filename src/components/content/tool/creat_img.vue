<template>
  <div class="tool_box">
    <h1>{{ this.$route.meta.title }}</h1>
    <div id="container">
      <a
        id="selectBtn"
        class="myButton"
        href="javascript:void(0);"
        onclick="document.getElementById('input_file').click();"
      >选择图片</a>
      <!-- <a id="saveBtn" href="javascript:void(0);" onclick="saveImage();">保存</a> -->
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
            <!-- <p>180*180</p> -->
            <p>
              <a
                :href="small_base64"
                :download="small_pic_name"
                class="download"
              >Download</a>
            </p>
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
    (function(i) {
      var c = function(a, b, d, e) {
        this.width = a;
        this.height = b;
        // 这里是关键
        this.cropWidth = d;
        this.cropHeight = e;
        // this.cropWidth = d;
        // this.cropHeight = e;
        this.imageContext = this.imageCanvas = this.image = null;
        this.imageScale = 1;
        this.imageViewTop = this.imageViewLeft = this.imageTop = this.imageLeft = this.imageRotation = 0;
        this.context = this.canvas = null;
        this.previews = [];
        this.maskGroup = [];
        this.maskAlpha = 0.4;
        this.maskColor = '#fff';
        this.cropTop = this.cropLeft = 0;
        this.cropViewWidth = d;
        this.cropViewHeight = e;
        this.dragSize = 7;
        this.dragColor = '#fff';
        this.mouseY = this.mouseX = this.dragTop = this.dragLeft = 0;
        this.isResizing = this.isMoving = this.inDragger = this.inCropper = false;
        this.cropStartHeight = this.cropStartWidth = this.cropStartTop = this.cropStartLeft = this.mouseStartY = this.mouseStartX = 0;
      };
      i.ImageCropper = c;
      c.prototype.setCanvas = function(a) {
        this.canvas = document.getElementById(a) || a;
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.oncontextmenu = this.canvas.onselectstart = function() {
          return false;
        };
        this.imageCanvas = document.createElement('canvas');
        this.imageContext = this.imageCanvas.getContext('2d');
        this.imageCanvas.width = this.width;
        this.imageCanvas.height = this.height;
      };
      c.prototype.addPreview = function(a) {
        this.previews.push((document.getElementById(a) || a).getContext('2d'));
      };
      c.prototype.loadImage = function(a) {
        if (this.isAvaiable() && this.isImage(a)) {
          var b = new FileReader();
          var d = this;
          b.readAsDataURL(a);
          b.onload = function(e) {
            if (!d.image) d.image = new Image();
            d.image.onload = function() {
              d._init();
            };
            d.image.src = e.target.result;
          };
        }
      };
      c.prototype._init = function() {
        var a = Math.min(
          this.width / this.image.width,
          this.height / this.image.height
        );
        if (a > 1) {
          a = Math.min(
            this.cropViewWidth / this.image.width,
            this.cropViewHeight / this.image.height
          );
        }
        if (this.image.width * a < this.cropViewWidth) { a = Math.min(a, this.cropViewWidth / this.image.width); }
        if (this.image.height * a < this.cropViewHeight) { a = Math.min(a, this.cropViewHeight / this.image.height); }
        this.imageViewLeft = this.imageLeft =
          (this.width - this.image.width * a) / 2;
        this.imageViewTop = this.imageTop =
          (this.height - this.image.height * a) / 2;
        this.imageScale = a;
        this.imageRotation = 0;
        a = Math.min(this.image.width * a, this.image.height * a);
        // 注释掉部分是裁剪正方形
        // this.cropViewWidth = Math.min(a, this.cropWidth);
        // this.cropViewHeight = Math.min(a, this.cropHeight);
        this.cropViewWidth = this.cropWidth;
        this.cropViewHeight = this.cropHeight;

        this.cropLeft = (this.width - this.cropViewWidth) / 2;
        this.cropTop = (this.height - this.cropViewHeight) / 2;
        this.dragLeft = this.cropLeft + this.cropViewWidth - this.dragSize / 2;
        this.dragTop = this.cropTop + this.cropViewHeight - this.dragSize / 2;
        this._update();
        var b = this;
        this.canvas.onmousedown = function(d) {
          b._mouseHandler.call(b, d);
        };
        this.canvas.onmouseup = function(d) {
          b._mouseHandler.call(b, d);
        };
        this.canvas.onmousemove = function(d) {
          b._mouseHandler.call(b, d);
        };
      };
      // 这是移动的函数
      c.prototype._mouseHandler = function(a) {
        if (a.type == 'mousemove') {
          var b = this.canvas.getClientRects()[0];
          this.mouseX = a.pageX - b.left - $(window).scrollLeft();
          this.mouseY = a.pageY - b.top - $(window).scrollTop();
          this._checkMouseBounds();
          this.canvas.style.cursor =
            this.inCropper || this.isMoving
              ? 'move'
              : this.inDragger || this.isResizing
                ? 'se-resize'
                : '';
          this.isMoving ? this._move() : this.isResizing && this._resize();
        } else if (a.type == 'mousedown') {
          this.mouseStartX = this.mouseX;
          this.mouseStartY = this.mouseY;
          this.cropStartLeft = this.cropLeft;
          this.cropStartTop = this.cropTop;
          this.cropStartWidth = this.cropViewWidth;
          this.cropStartHeight = this.cropViewHeight;
          this.inCropper
            ? (this.isMoving = true)
            : this.inDragger && (this.isResizing = true);
        } else if (a.type == 'mouseup') this.isMoving = this.isResizing = false;
      };
      c.prototype._checkMouseBounds = function() {
        this.inCropper =
          this.mouseX >= this.cropLeft &&
          this.mouseX <= this.cropLeft + this.cropViewWidth &&
          this.mouseY >= this.cropTop &&
          this.mouseY <= this.cropTop + this.cropViewHeight;
        this.inDragger =
          this.mouseX >= this.dragLeft &&
          this.mouseX <= this.dragLeft + this.dragSize &&
          this.mouseY >= this.dragTop &&
          this.mouseY <= this.dragTop + this.dragSize;
        this.inCropper = this.inCropper && !this.inDragger;
      };
      c.prototype._move = function() {
        var a = this.mouseY - this.mouseStartY;
        this.cropLeft = Math.max(
          this.imageViewLeft,
          this.cropStartLeft + (this.mouseX - this.mouseStartX)
        );
        this.cropLeft = Math.min(
          this.cropLeft,
          this.width - this.imageViewLeft - this.cropViewWidth
        );
        this.cropTop = Math.max(this.imageViewTop, this.cropStartTop + a);
        this.cropTop = Math.min(
          this.cropTop,
          this.height - this.imageViewTop - this.cropViewHeight
        );
        this.dragLeft = this.cropLeft + this.cropViewWidth - this.dragSize / 2;
        this.dragTop = this.cropTop + this.cropViewHeight - this.dragSize / 2;
        this._update();
      };
      c.prototype._resize = function() {
        var a = Math.min(
          this.mouseX - this.mouseStartX,
          this.mouseY - this.mouseStartY
        );
        var b = Math.max(10, this.cropStartWidth + a);
        a = Math.max(10, this.cropStartHeight + a);
        b = Math.min(b, this.width - this.cropStartLeft - this.imageViewLeft);
        a = Math.min(a, this.height - this.cropStartTop - this.imageViewTop);
        this.cropViewWidth = this.cropViewHeight = Math.round(Math.min(b, a));
        // this.cropViewHeight =
        this.dragLeft = this.cropLeft + this.cropViewWidth - this.dragSize / 2;
        this.dragTop = this.cropTop + this.cropViewHeight - this.dragSize / 2;
        this._update();
      };
      c.prototype.rotate = function(a) {
        if (this.image) {
          this.imageRotation += a;
          this.imageViewLeft = (a = Math.abs(this.imageRotation % 180) == 90)
            ? this.imageTop
            : this.imageLeft;
          this.imageViewTop = a ? this.imageLeft : this.imageTop;
          this.cropLeft = (this.width - this.cropViewWidth) / 2;
          this.cropTop = (this.height - this.cropViewHeight) / 2;
          this.dragLeft =
            this.cropLeft + this.cropViewWidth - this.dragSize / 2;
          this.dragTop = this.cropTop + this.cropViewHeight - this.dragSize / 2;
          this._update();
        }
      };
      c.prototype._update = function() {
        this.context.clearRect(0, 0, this.width, this.height);
        this._drawImage();
        this._drawMask();
        this._drawDragger();
        this._drawPreview();
      };
      c.prototype._drawImage = function() {
        this.imageContext.clearRect(0, 0, this.width, this.height);
        this.imageContext.save();
        var a = this.imageRotation % 360;
        this.imageContext.translate(this.imageViewLeft, this.imageViewTop);
        this.imageContext.scale(this.imageScale, this.imageScale);
        this.imageContext.rotate((this.imageRotation * Math.PI) / 180);
        switch ((360 - a) % 360) {
          case 90:
            this.imageContext.drawImage(this.image, -this.image.width, 0);
            break;
          case 180:
            this.imageContext.drawImage(
              this.image,
              -this.image.width,
              -this.image.height
            );
            break;
          case 270:
            this.imageContext.drawImage(this.image, 0, -this.image.height);
            break;
          default:
            this.imageContext.drawImage(this.image, 0, 0);
        }
        this.imageContext.restore();
        this.context.drawImage(this.imageCanvas, 0, 0);
      };
      // 画预览
      c.prototype._drawPreview = function() {
        for (var a = 0; a < this.previews.length; a++) {
          var b = this.previews[a];
          b.clearRect(0, 0, b.canvas.width, b.canvas.height);
          b.save();
          b.drawImage(
            this.imageCanvas,
            this.cropLeft,
            this.cropTop,
            this.cropViewWidth,
            this.cropViewHeight,
            0,
            0,
            b.canvas.width,
            b.canvas.height
          );
          b.restore();
        }
      };
      // 画遮罩层的样式
      c.prototype._drawMask = function() {
        this._drawRect(
          this.imageViewLeft,
          this.imageViewTop,
          this.cropLeft - this.imageViewLeft,
          this.height,
          this.maskColor,
          null,
          this.maskAlpha
        );
        this._drawRect(
          this.cropLeft + this.cropViewWidth,
          this.imageViewTop,
          this.width - this.cropViewWidth - this.cropLeft + this.imageViewLeft,
          this.height,
          this.maskColor,
          null,
          this.maskAlpha
        );
        this._drawRect(
          this.cropLeft,
          this.imageViewTop,
          this.cropViewWidth,
          this.cropTop - this.imageViewTop,
          this.maskColor,
          null,
          this.maskAlpha
        );
        this._drawRect(
          this.cropLeft,
          this.cropTop + this.cropViewHeight,
          this.cropViewWidth,
          this.height - this.cropViewHeight - this.cropTop + this.imageViewTop,
          this.maskColor,
          null,
          this.maskAlpha
        );
      };
      // 画滑块
      c.prototype._drawDragger = function() {
        this._drawRect(
          this.dragLeft,
          this.dragTop,
          this.dragSize,
          this.dragSize,
          null,
          this.dragColor,
          null
        );
      };
      // 画物体的方法
      c.prototype._drawRect = function(a, b, d, e, f, g, h) {
        this.context.save();
        if (f !== null) this.context.fillStyle = f;
        if (g !== null) this.context.strokeStyle = g;
        if (h !== null) this.context.globalAlpha = h;
        this.context.beginPath();
        this.context.rect(a, b, d, e);
        this.context.closePath();
        f !== null && this.context.fill();
        g !== null && this.context.stroke();
        this.context.restore();
      };
      c.prototype.getCroppedImageData = function(a, b, d) {
        var e = document.createElement('canvas');
        e.width = a || this.cropWidth;
        e.height = b || this.cropHeight;
        e.getContext('2d').drawImage(
          this.imageCanvas,
          this.cropLeft,
          this.cropTop,
          this.cropViewWidth,
          this.cropViewHeight,
          0,
          0,
          e.width,
          e.height
        );
        return e.toDataURL(d || 'image/jpeg');
      };
      c.prototype.isAvaiable = function() {
        return typeof FileReader !== 'undefined';
      };
      c.prototype.isImage = function(a) {
        return /image/i.test(a.type);
      };
    })(window);
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
        var fileList = document.getElementById('input_file');
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
          }, 100);
        };
      };
      // that.$emit('aaaaaa',that.aaa);
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
  .myButton {
    margin: 20px 0;
    -moz-box-shadow: 0px 10px 14px -7px #276873;
    -webkit-box-shadow: 0px 10px 14px -7px #276873;
    box-shadow: 0px 10px 14px -7px #276873;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0.05, #599bb3),
      color-stop(1, #408c99)
    );
    background: -moz-linear-gradient(top, #599bb3 5%, #408c99 100%);
    background: -webkit-linear-gradient(top, #599bb3 5%, #408c99 100%);
    background: -o-linear-gradient(top, #599bb3 5%, #408c99 100%);
    background: -ms-linear-gradient(top, #599bb3 5%, #408c99 100%);
    background: linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#599bb3', endColorstr='#408c99',GradientType=0);
    background-color: #599bb3;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-size: 18px;
    padding: 13px 50px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #3d768a;
  }
  .myButton:hover {
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0.05, #408c99),
      color-stop(1, #599bb3)
    );
    background: -moz-linear-gradient(top, #408c99 5%, #599bb3 100%);
    background: -webkit-linear-gradient(top, #408c99 5%, #599bb3 100%);
    background: -o-linear-gradient(top, #408c99 5%, #599bb3 100%);
    background: -ms-linear-gradient(top, #408c99 5%, #599bb3 100%);
    background: linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#408c99', endColorstr='#599bb3',GradientType=0);
    background-color: #408c99;
  }
  .myButton:active {
    position: relative;
    top: 1px;
  }

  #saveBtn {
    width: 67px;
    height: 27px;
  }
  .thumbnail {
    .download {
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0.05, #89c403),
        color-stop(1, #77a809)
      );
      background: -moz-linear-gradient(top, #89c403 5%, #77a809 100%);
      background: -webkit-linear-gradient(top, #89c403 5%, #77a809 100%);
      background: -o-linear-gradient(top, #89c403 5%, #77a809 100%);
      background: -ms-linear-gradient(top, #89c403 5%, #77a809 100%);
      background: linear-gradient(to bottom, #89c403 5%, #77a809 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#89c403', endColorstr='#77a809',GradientType=0);
      background-color: #89c403;
      -moz-border-radius: 6px;
      -webkit-border-radius: 6px;
      border-radius: 6px;
      display: inline-block;
      cursor: pointer;
      color: #ffffff;
      font-family: Trebuchet MS;
      font-size: 15px;
      font-weight: bold;
      padding: 5px 18px;
      text-decoration: none;
    }
    .download:hover {
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0.05, #77a809),
        color-stop(1, #89c403)
      );
      background: -moz-linear-gradient(top, #77a809 5%, #89c403 100%);
      background: -webkit-linear-gradient(top, #77a809 5%, #89c403 100%);
      background: -o-linear-gradient(top, #77a809 5%, #89c403 100%);
      background: -ms-linear-gradient(top, #77a809 5%, #89c403 100%);
      background: linear-gradient(to bottom, #77a809 5%, #89c403 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#77a809', endColorstr='#89c403',GradientType=0);
      background-color: #77a809;
    }
    .download:active {
      position: relative;
      top: 1px;
    }
    p {
      margin: 5px 0;
    }
  }
}
</style>

