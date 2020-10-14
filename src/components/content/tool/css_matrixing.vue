<template>
  <div class="tool_box">
    <h1>{{ this.$route.meta.title }}</h1>

    <div class="textarea">
      <textarea title="请输入文字" id="textarea_01"></textarea>
    </div>

    <div class="column">
      <a href="javascript:void(0);" :click="css_matrixing" class="column_a1">确定</a>

      <div class="column_box1">
        <!--倍数-->
        <p class="column_num">
          <b>倍数：</b>
          <label>
            <input type="radio" name="column_num" value="0" id checked="checked" />
            <span>1.5倍</span>
          </label>
          <label>
            <input type="radio" name="column_num" value="1" id />
            <span>2倍</span>
          </label>
          <label>
            <input type="radio" name="column_num" value="2" id />
            <span>其他</span>
            <input name type="text" placeholder id="column_num" />
          </label>
        </p>
      </div>
      <div class="column_box2">
        <label class="column_checkbox">
          <span>过滤非像素设置的CSS属性</span>
          <input type="checkbox" name value id="column_checkbox" checked="checked" />
        </label>
        <label class="column_checkbox">
          <span>删除过滤后产生空白的CLASS</span>
          <input type="checkbox" name value id="column_checkbox2" checked="checked" />
        </label>
        <label class="column_checkbox">
          <span>过滤text-indent为负</span>
          <input type="checkbox" name value id="column_checkbox3" checked="checked" />
        </label>
        <label class="column_checkbox">
          <span>过滤border边框</span>
          <input type="checkbox" name value id="column_checkbox4" />
        </label>
        <br />
        <label class="column_checkbox">
          <span>自定义过滤CSS属性，多个用 " : " 隔开</span>
          <input type="checkbox" name value id="column_checkbox5" />
          <input type="text" name value id="column_checkbox5_val" />
        </label>
      </div>
    </div>

    <div class="textarea">
      <textarea title="请输入文字" id="textarea_02"></textarea>
    </div>

    <div class="api_p">
      <p>
        <span>1.倍数：</span>默认有3单选的倍数，分别是1.5倍与2倍，如非这个倍数的，则勾选上‘其他’的单选输入相应的倍数即可，支持小数点但是输入的数字必须大于1，如果小于1的则不做倍数计算.
      </p>
      <p>
        <span>倍数计算结果的取整方式为：</span>因为计算结果如果存在奇数，有些安卓设备会出现兼容性问题，比如字体为奇数时在安卓设备会出现毛边现象，所以这里的计算结果都会取整位偶数，当计算结果非偶数时，则把结果除以2.余数大于或等于1则向上取整为偶数，如果余数小于1则向下取值为偶数.
      </p>
      <p>
        <span>2.单选-过滤非像素设置的CSS属性：</span>默认：勾选
      </p>
      <p>在换算代码过程中是否对非像素的CSS属性进行筛选，如：a{ display: block; font-size: 18px;},如果勾选后的结果为a{ font-size: 18px;},跟像素无关的CSS属性则被过滤掉了</p>
      <p>
        <span>3.删除过滤后产生空白的CLASS：</span>默认：勾选
      </p>
      <p>在换算过程中如果勾选了②的‘过滤非像素设置的CSS属性’，然后刚好该CLASS 里全是非像素的CSS，这时候CLASS里的CSS全都被过滤删除后会生成一个只有CLASS名字然后CSS为空的情况，如a{ display: block; white-space: normal; font-weight: bold; }此时如果勾选了②的‘过滤非像素设置的CSS属性’，则生成a{},代码换算后只有a{}对响应式是没意义的，因此，如果在勾选了‘删除过滤后产生空白的CLASS’后，遇到a{}这种情况，a{}则会被删掉</p>
      <p>
        <span>4过滤text-indent为负：</span>默认：勾选
      </p>
      <p>因为项目需要，有时需要设置text-indent为负的情况，如a { font-size: 18px; text-indent:-9999px;}，如果这时候做代码换算，这个属性会被列为跟像素有关的CSS进行计算~如果-9999px还再去计算倍数，没什么意义，所以这里设置多一个选项，如果打勾，则忽略掉text-indent为负的情况并把text-indent属性删掉，如a { font-size: 18px; text-indent:-9999px;}打勾后筛选后为a { font-size: 18px;}</p>
      <b>代码换算1.1-API 扩展功能 2015-08</b>
      <p>
        <span>5.过滤border边框</span>默认：不勾选
      </p>
      <p>在有些项目的换算中有特殊要求不需要换算border边框的值，因此勾选此项后换算过程中会把border属性删除不做换算，包括border的扩展属性，如 border-top/ border -bottom/ border-left / border-right / border-top-width / border-bottom-width / border-left-width / border-right-width 仅限以上属性，不包括border- radius圆角</p>
      <p>
        <span>6.自定义过滤属性" : " 隔开：</span>默认：不勾选
      </p>
      <p>需要在此属性打勾勾选才有功能，勾选后在后面的输入要自定义过滤的CSS属性即可，支持输入多个CSS属性，中间用“ : ”括号里面的冒号隔开，如同时要过滤 font- size 与 line-height 属性，则输入 “font-size：line-height”即可，如只需要过滤 font-size 一个，则直接输入font-size</p>
    </div>

    <!-- 主内容 end -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted: function() {},
  methods: {
    // 所有浏览器
    css_matrixing: function() {
      var agoVal = $('#textarea_01').val();
      var r_checkbox = $('#column_checkbox').prop('checked');
      var r_checkbox2 = $('#column_checkbox2').prop('checked');
      var r_checkbox3 = $('#column_checkbox3').prop('checked');
      var r_checkbox4 = $('#column_checkbox4').prop('checked');
      var r_checkbox5 = $('#column_checkbox5').prop('checked');
      var numVal;
      var unitRadioVal = Number($('.column_num input[name=column_num]:checked').val());
      if (unitRadioVal === 0) {
        numVal = 1.5;
      } else if (unitRadioVal === 1) {
        numVal = 2;
      } else if (unitRadioVal === 2) {
        numVal = $.trim($('#column_num').val());
      }
      agoVal = agoVal.replace(/:\s*[^:;]*\s*}/g, function(r_word90) {
        return r_word90.slice(0, -1) + ';}';
      });
      agoVal = agoVal.replace(/{[^}]*}/g, function(r_word100) {
        r_word100 = r_word100.replace(/\/\*[\s\S]*\*\//g, '');
        return r_word100;
      });
      if (r_checkbox3) {
        agoVal = agoVal.replace(/\s*text-indent\s*:\s*-\s*\d+px\s*;/g, '');
      }
      if (r_checkbox4) {
        agoVal = agoVal
          .replace(/\s*border\s*:[^;]*;/g, '')
          .replace(/\s*border-top[^:]*:[^;]*;/g, '')
          .replace(/\s*border-bottom[^:]*:[^;]*;/g, '')
          .replace(/\s*border-right[^:]*:[^;]*;/g, '')
          .replace(/\s*border-left[^:]*:[^;]*;/g, '');
      }
      if (r_checkbox5) {
        var rb5_val = $('#column_checkbox5_val').val();
        if ($.trim(rb5_val.replace(/:/g, '')) !== '') {
          console.log('不为空');
          var rb5_array, rb5_length;
          rb5_array = rb5_val.split(':');
          rb5_length = rb5_array.length;
          for (var i = 0; i < rb5_length; i++) {
            var rb5_arrayVal = $.trim(rb5_array[i]);
            if (rb5_arrayVal !== '') {
              var rb5_regexp = new RegExp(
                '\\s*' + rb5_arrayVal + '\\s*:[^;]*;'
              );
              agoVal = agoVal.replace(rb5_regexp, '');
            }
          }
        }
      }
      if (r_checkbox) {
        agoVal = agoVal.replace(/[-*|\w*]*\b:\s*[^;{}]*;/g, function(r_word0) {
          var b_sign = false;
          r_word0.replace(/:\s*[^;{}]*;/g, function(r_word2) {
            r_word2.replace(/\d+px/gi, function(r_word3) {
              r_word3 = r_word3.replace(/(^0px)+/gi, '');
              r_word3.replace(/\d+px/gi, function() {
                b_sign = true;
              });
            });
          });
          if (b_sign) {
            return r_word0;
          } else {
            return '';
          }
        });
      }
      if (numVal !== '' && numVal !== 0 && numVal > 1) {
        agoVal = agoVal.replace(/\d+px/gi, function(r_word1) {
          var a_nun = parseInt(r_word1) * numVal;
          var a_divide = parseInt(a_nun / 2);
          var a_surplus = a_nun % 2;
          if (a_surplus !== 0) {
            if (a_divide !== 0) {
              if (a_surplus > 1) {
                return (a_divide * 1 + 1) * 2 + 'px';
              } else {
                return a_divide * 2 + 'px';
              }
            } else {
              return '2px';
            }
          } else {
            return a_nun + 'px';
          }
        });
      }
      if (r_checkbox2) {
        agoVal = agoVal.replace(/[^/;{}]*{\s*}/g, '');
      }
      $('#textarea_02').val(agoVal);
    }
  }
};
</script>

<style lang="less" scoped>
.textarea textarea {
  font-size: 14px !important;
}
.column {
  padding-left: 80px;
  position: relative;
  font-size: 0;
  min-height: 30px;
  margin: 5px 0;
}
.column .column_a1 {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -15px;
  display: block;
  width: 60px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  background-color: rgb(64, 158, 255);
  color: #fff;
  text-align: center;
}
/*尺寸*/
.column_box1 {
  font-size: 0;
  padding: 6px 6px 6px 0px;
  margin-bottom: 6px;
}
.column_num {
  display: inline-block;
  font-size: 0;
  vertical-align: top;
  height: 30px;
  vertical-align: top;
}
.column_num label {
  display: inline-block;
  white-space: nowrap;
  height: 30px;
  margin: 0 6px;
  vertical-align: top;
}
.column_num label span {
  display: inline-block;
  vertical-align: top;
  height: 30px;
  line-height: 30px;
  margin-right: 4px;
  font-size: 16px;
  color: #000;
}
.column_num label input[type="radio"] {
  display: inline-block;
  vertical-align: top;
  border: 1px solid #000;
  margin-top: 8px;
}
.column_num b {
  display: inline-block;
  vertical-align: top;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #000;
  font-weight: normal;
}
.column_num input[type="text"] {
  display: inline-block;
  vertical-align: top;
  width: 60px;
  height: 28px;
  line-height: 28px;
  font-size: 16px;
  color: #000;
  overflow: hidden;
  text-indent: 10px;
  border: 1px solid #8f8f8f;
}
/*单位*/
.column_unit {
  display: inline-block;
  font-size: 0;
  vertical-align: top;
  height: 30px;
  vertical-align: top;
  border-right: 1px solid #808080;
  margin-right: 10px;
}
.column_unit label {
  display: inline-block;
  white-space: nowrap;
  height: 30px;
  margin: 0 6px;
  vertical-align: top;
}
.column_unit label span {
  display: inline-block;
  vertical-align: top;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
  font-size: 16px;
  color: #000;
}
.column_unit label input[type="radio"] {
  display: inline-block;
  vertical-align: top;
  border: 1px solid #000;
  margin-top: 8px;
}
.column_unit b {
  display: inline-block;
  vertical-align: top;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #000;
  font-weight: normal;
}
/*选择*/
.column_box2 {
}
.column_checkbox {
  display: inline-block;
  white-space: nowrap;
  height: 30px;
  margin-right: 30px;
  vertical-align: top;
}
.column_checkbox span {
  display: inline-block;
  vertical-align: top;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
  font-size: 16px;
  color: #000;
}
.column_checkbox input[type="checkbox"] {
  display: inline-block;
  vertical-align: top;
  border: 1px solid #000;
  margin-top: 8px;
}
.column_checkbox input[type="text"] {
  display: inline-block;
  vertical-align: top;
  width: 310px;
  height: 28px;
  line-height: 28px;
  font-size: 16px;
  color: #000;
  overflow: hidden;
  text-indent: 6px;
  border: 1px solid #8f8f8f;
  margin-left: 10px;
}
/*API*/
.api_p {
  padding-bottom: 50px;
}
.api_p b {
  display: block;
  font-size: 20px;
  line-height: 35px;
}
.api_p p {
  display: block;
  font-size: 18px;
  line-height: 32px;
  white-space: normal;
}
.api_p span {
  font-weight: bold;
}
</style>