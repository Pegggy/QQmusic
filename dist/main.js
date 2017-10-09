/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

fetch('/json/rec.json').then(function (res) {
  return res.json();
}).then(render);

function render(json) {
  renderslider(json.data.slider);
  renderRadioList(json.data.radioList);
}

function renderslider(slides) {
  slides = slides.map(function (slide) {
    return {
      link: slide.linkUrl,
      img: slide.picUrl
    };
  });
  var $swiper = document.querySelector('.swiper-container');
  $swiper.innerHTML = ' <div class="swiper-wrapper"></div><div class="swiper-pagination" id="swiper-pagination"></div>';
  var $swiperWrapper = $swiper.querySelector('.swiper-wrapper');
  $swiperWrapper.innerHTML = slides.map(function (slide) {
    return '<div class="swiper-slide">\n        <a href="' + slide.link + '" >\n        <img src="' + slide.img + '" style="width: 100%;height: 100%;">\n        </a>\n      </div>';
  }).join('');
  var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    autoplay: 3000,
    speed: 400,
    pagination: '.swiper-pagination',
    loop: true,
    setWrapperSize: true
  });
}

function renderRadioList(radioList) {
  radioList = radioList.map(function (item) {
    return {
      picUrl: item.picUrl,
      title: item.Ftitle
    };
  });
  var recTab = document.querySelector('.rec-tab');
  var songsListRadio = document.createElement('div');
  songsListRadio.classList.add('songs-list');
  songsListRadio.classList.add('radio');
  songsListRadio.innerHTML = '<h2>电台</h2><ul class="radio-wrap clearfix"></ul>';
  var radioWrap = songsListRadio.querySelector('.radio-wrap');
  radioWrap.innerHTML = radioList.map(function (item) {
    return '<li class="radio-item">\n        <a href="javascript:;">\n          <div class="media-wrap">\n            <img src=' + item.picUrl + ' alt="">\n            <i class="iconfont icon-play"></i>\n          </div>\n          <div class="media-info">\n            <h3 class="media-title">' + item.title + '</h3>\n          </div>\n        </a>\n    </li>';
  }).join('');
  var songsListHot = document.createElement('div');
  songsListHot.classList.add('songs-list');
  songsListHot.classList.add('hot-lists');
  songsListHot.innerHTML = '<h2>热门歌单</h2><div class="more-list"><a href="#">去客户端发现更多好音乐 ></a></div>';
  recTab.appendChild(songsListRadio);
  recTab.appendChild(songsListHot);
  var footer = document.createElement('div');
  footer.classList.add('footer');
  footer.innerHTML = '<div class="web-vision">\n      <a href="http://y.qq.com/?ADTAG=myqq&nomobile=1#type=index">\u67E5\u770B\u7535\u8111\u7248\u7F51\u9875</a>\n  </div>\n  <div class="footer-logo"></div>\n  <div class="copyright">\n    <p>Copyright \xA9 1998 - 2017 PenFan. All Rights Reserved.</p>\n    <a href="mailto:fangpei9212@163.com" class="e-link">\u8054\u7CFB\u90AE\u7BB1: fangpei9212@163.com</a>\n  </div>';
  recTab.appendChild(footer);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var nav = document.querySelector('.nav');
  nav.addEventListener('click', function (e) {
    var target = e.target;
    [].forEach.call(target.parentElement.children, function (children) {
      return children.classList.remove('active');
    });
    target.classList.add('active');
    var currentTab = document.querySelector(target.dataset.tab);
    if (currentTab) {
      [].forEach.call(currentTab.parentElement.children, function (children) {
        return children.classList.add('hide');
      });
      currentTab.classList.remove('hide');
    }
  });
})();

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map