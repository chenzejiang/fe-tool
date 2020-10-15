/* 首页 */
import index from './components/content/tool/index';
/* html 转为js字符串 */
import js_str from './components/content/tool/js_str';
/* css3兼容 */
import css3 from './components/content/tool/css3';
/* html格式化 */
import html_reset from './components/content/tool/html_reset';
/* CSS换算 */
import css_matrixing from './components/content/tool/css_matrixing';
/* 二维码生成 */
import qr_code from './components/content/tool/qrCode/qr_code';
/* 生成缩略图 */
import creat_img from './components/content/tool/creat_img';
/* animate.css */
import animate from './components/content/tool/animate';
/* 颜色选取 */
import colpick from './components/content/tool/colpick';
/* css压缩格式化 */
import css_format from './components/content/tool/css_format';
/* json压缩格式化 */
import json_format from './components/content/tool/json_format';
/* js压缩格式化 */
import js_format from './components/content/tool/js_format';
/* css生成三角形 */
import css_triangle from './components/content/tool/css_triangle';
/* 生成md的api */
import md_api from './components/content/tool/md_api';
/* 字符串格式化为多种类型 */
import string_format from './components/content/tool/string_format';

// { path: '/', component: () => import('./components/content/tool/index.vue') },

const routes = [
  {
    path: '/',
    component: index,
    meta: {
      title: 'Home',
      icon: 'icon-home'
    }
  },
  {
    path: '/tool/string_format',
    component: string_format,
    meta: {
      icon: 'icon-swap',
      title: '字符多种格式转换'
    }
  },
  {
    path: '/tool/md_api',
    component: md_api,
    meta: {
      icon: 'icon-news',
      title: 'Api 转 MackDown'
    }
  },
  {
    path: '/tool/js_str',
    component: js_str,
    meta: {
      icon: 'icon-tools',
      title: 'HTML转为JS字符串'
    }
  },
  {
    path: '/tool/css3',
    component: css3,
    meta: {
      icon: 'icon-layers',
      title: 'CSS3 兼容'
    }
  },
  {
    path: '/tool/html_reset',
    component: html_reset,
    meta: {
      icon: 'icon-code',
      title: 'HTML格式化'
    }
  },
  {
    path: '/tool/css_matrixing',
    component: css_matrixing,
    meta: {
      icon: 'icon-documents',
      title: 'CSS适配换算'
    }
  },
  {
    path: '/tool/qr_code',
    component: qr_code,
    meta: {
      icon: 'icon-eye',
      title: '二维码生成与解码'
    }
  },
  {
    path: '/tool/creat_img',
    component: creat_img,
    meta: {
      icon: 'icon-images',
      title: '生成图片缩略图'
    }
  },
  {
    path: '/tool/animate',
    component: animate,
    meta: {
      icon: 'icon-air',
      title: 'Animate.css'
    }
  },
  {
    path: '/tool/colpick',
    component: colpick,
    meta: {
      icon: 'icon-brush',
      title: '颜色选取与转换'
    }
  },
  {
    path: '/tool/css_format',
    component: css_format,
    meta: {
      icon: 'icon-flow-tree',
      title: 'CSS压缩格式化'
    }
  },
  {
    path: '/tool/json_format',
    component: json_format,
    meta: {
      icon: 'icon-flow-branch',
      title: 'JSON压缩格式化'
    }
  },
  {
    path: '/tool/js_format',
    component: js_format,
    meta: {
      icon: 'icon-flow-parallel',
      title: 'JS压缩格式化'
    }
  },
  {
    path: '/tool/css_triangle',
    component: css_triangle,
    meta: {
      icon: 'icon-triangle-up',
      title: 'CSS生成三角形'
    }
  }
];

export default routes;