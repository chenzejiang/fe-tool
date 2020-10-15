<template>
  <section class="content clearfix" style="height: calc(100vh - 120px);">
    <div class="menu">
      <ul>
        <li v-for="item in routerArr" :key="item.icon">
          <router-link :to="{path: item.path}">
            <span :class="item.meta.icon"></span>
            {{ item.meta.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <router-view class="contBox"></router-view>
  </section>
</template>

<script>
import routes from '../../Router';
export default {
  data() {
    return {
      routerArr: routes
    };
  },
  mounted: function() {}
};
</script>

<!-- 这里特地去掉 scoped私有 -->
<style lang="less">
@li_bg: rgb(64, 158, 255);
.content {
  width: 100%;
  font-size: 0;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  .menu {
    display: inline-block;
    min-width: 220px;
    height: 100%;
    background: #f2f2ea;
    background-color: rgb(48, 65, 86);
    overflow-y: auto;
    li {
      width: 100%;
      min-height: 50px;
      line-height: 50px;
      text-align: left;
      position: relative;
      a {
        display: inline-block;
        color: rgb(191, 203, 217);
        height: 100%;
        width: 100%;
        font-size: 14px;
        vertical-align: top;
        white-space: nowrap;
        overflow: hidden;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      a.router-link-exact-active {
        color: @li_bg;
        span {
          color: @li_bg;
        }
      }
      span {
        vertical-align: middle;
        display: inline-block;
        margin: 0 10px 0 20px;
        color: rgb(191, 203, 217);
        transition: all 0.3s ease;
      }
    }
    li:hover {
      a {
        background: rgb(38, 52, 69);
      }
      span {
        color: #fff;
      }
    }
  }
  .contBox {
    font-size: 20px;
    display: inline-block;
    flex: 1;
    min-width: 850px;
    height: 100%;
    overflow-y: auto;
    vertical-align: top;
    padding: 20px;
    h1 {
      font-size: 20px;
      border-bottom: 4px solid #646464;
      /*font-weight: bold;*/
      color: #646464;
      line-height: 30px;
      padding: 5px 0;
      margin-bottom: 20px;
    }
    textarea {
      width: 100%;
      height: 220px;
      font-size: 16px;
      padding: 5px;
    }
  }
}
</style>
