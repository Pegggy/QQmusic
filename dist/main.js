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

__webpack_require__(2);

fetch('http://localhost:4000/').then(function (res) {
  return res.json();
}).then(render);

fetch('http://localhost:4000/toplist').then(function (res) {
  return res.json();
}).then(renderRank);
function render(json) {
  renderslider(json.data.slider);
  renderRadioList(json.data.radioList);
}

function renderslider(slides) {
  var $swiper = document.querySelector('.swiper-container');
  $swiper.innerHTML = ' <div class="swiper-wrapper"></div><div class="swiper-pagination" id="swiper-pagination"></div>';
  var $swiperWrapper = $swiper.querySelector('.swiper-wrapper');
  $swiperWrapper.innerHTML = slides.map(function (slide) {
    return '<div class="swiper-slide">\n        <a href="' + slide.linkUrl + '" >\n        <img src="' + slide.picUrl + '" style="width: 100%;height: 100%;">\n        </a>\n      </div>';
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
  var recTab = document.querySelector('.rec-tab');
  var songsListRadio = document.createElement('div');
  songsListRadio.classList.add('songs-list');
  songsListRadio.classList.add('radio');
  songsListRadio.innerHTML = '<h2>电台</h2><ul class="radio-wrap clearfix"></ul>';
  var radioWrap = songsListRadio.querySelector('.radio-wrap');
  radioWrap.innerHTML = radioList.map(function (item) {
    return '<li class="radio-item">\n        <a href="javascript:;">\n          <div class="media-wrap">\n            <img src=' + item.picUrl + ' alt="">\n            <i class="iconfont icon-play"></i>\n          </div>\n          <div class="media-info">\n            <h3 class="media-title">' + item.Ftitle + '</h3>\n          </div>\n        </a>\n    </li>';
  }).join('');
  var songsListHot = document.createElement('div');
  songsListHot.classList.add('songs-list');
  songsListHot.classList.add('hot-lists');
  songsListHot.innerHTML = '<h2>热门歌单</h2><div class="more-list"><a href="#">去客户端发现更多好音乐 ></a></div>';
  recTab.appendChild(songsListRadio);
  recTab.appendChild(songsListHot);
  var footer = document.createElement('div');
  footer.classList.add('footer');
  footer.innerHTML = '<div class="web-vision">\n    <a href="http://y.qq.com/?ADTAG=myqq&nomobile=1#type=index">\u67E5\u770B\u7535\u8111\u7248\u7F51\u9875</a>\n  </div>\n  <div class="footer-logo"></div>\n  <div class="copyright">\n    <p>Copyright \xA9 1998 - 2017 PenFan. All Rights Reserved.</p>\n    <a href="mailto:fangpei9212@163.com" class="e-link">\u8054\u7CFB\u90AE\u7BB1: fangpei9212@163.com</a>\n  </div>';
  recTab.appendChild(footer);
}

function renderRank(json) {
  var topList = json.data.topList;
  var rankTab = document.querySelector('.rank-tab');
  var rankList = document.createElement('ul');
  rankList.innerHTML = topList.map(function (item) {
    return '<li class="rank-item">\n    <div class="item-wrap">\n      <a href="javascript:;" class="rank-media">\n        <img data-src=' + item.picUrl + ' class="lazyload">\n        <i class="iconfont icon-1"></i>\n        <span class="rank-count">' + rankCount(item.listenCount) + '\u4E07</span>\n      </a>\n      <div class="rank-list">\n        <h3 class="rank-list-title text-hide">' + item.topTitle + '</h3>\n        ' + rankItem(item.songList) + '\n      </div>\n      <span class="rightt-arrow"></span>\n    </div>\n  </li>';
  }).join('');
  rankTab.appendChild(rankList);
  var moreMusic = document.createElement('div');
  moreMusic.innerHTML = ' <a href="#">去客户端发现更多好音乐 ></a>';
  moreMusic.classList.add('more-list');
  rankTab.appendChild(moreMusic);
  lazyload();
}
function rankCount(num) {
  num = num / 10000;
  return num.toFixed(1);
}
function rankItem(songList) {
  songList = songList.map(function (song, index) {
    return '\n  <p class="text-hide">' + (index + 1) + '<span>' + song.songname + '</span>' + song.singername + '</p>\n  ';
  }).join('');
  return songList;
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Lazy Load 2.0.0-beta.2 - MIT license - Copyright 2007-2017 Mika Tuupola */
!function (t, e) {
  "object" == ( false ? "undefined" : _typeof(exports)) ? module.exports = e(t) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e(t)),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : t.LazyLoad = e(t);
}("undefined" != typeof global ? global : undefined.window || undefined.global, function (t) {
  "use strict";
  function e(t, e) {
    this.settings = r(s, e || {}), this.images = t || document.querySelectorAll(this.settings.selector), this.observer = null, this.init();
  }var s = { src: "data-src", srcset: "data-srcset", selector: ".lazyload" },
      r = function r() {
    var t = {},
        e = !1,
        s = 0,
        o = arguments.length;"[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0], s++);for (; s < o; s++) {
      !function (s) {
        for (var _o in s) {
          Object.prototype.hasOwnProperty.call(s, _o) && (e && "[object Object]" === Object.prototype.toString.call(s[_o]) ? t[_o] = r(!0, t[_o], s[_o]) : t[_o] = s[_o]);
        }
      }(arguments[s]);
    }return t;
  };if (e.prototype = { init: function init() {
      if (!t.IntersectionObserver) return void this.loadImages();var e = this,
          s = { root: null, rootMargin: "0px", threshold: [0] };this.observer = new IntersectionObserver(function (t) {
        t.forEach(function (t) {
          if (t.intersectionRatio > 0) {
            e.observer.unobserve(t.target);var _s = t.target.getAttribute(e.settings.src),
                _r = t.target.getAttribute(e.settings.srcset);"img" === t.target.tagName.toLowerCase() ? (_s && (t.target.src = _s), _r && (t.target.srcset = _r)) : t.target.style.backgroundImage = "url(" + _s + ")";
          }
        });
      }, s), this.images.forEach(function (t) {
        e.observer.observe(t);
      });
    }, loadAndDestroy: function loadAndDestroy() {
      this.settings && (this.loadImages(), this.destroy());
    }, loadImages: function loadImages() {
      if (!this.settings) return;var t = this;this.images.forEach(function (e) {
        var s = e.getAttribute(t.settings.src),
            r = e.getAttribute(t.settings.srcset);"img" === e.tagName.toLowerCase() ? (s && (e.src = s), r && (e.srcset = r)) : e.style.backgroundImage = "url(" + s + ")";
      });
    }, destroy: function destroy() {
      this.settings && (this.observer.disconnect(), this.settings = null);
    } }, t.lazyload = function (t, s) {
    return new e(t, s);
  }, t.jQuery) {
    var _s2 = t.jQuery;_s2.fn.lazyload = function (t) {
      return t = t || {}, t.attribute = t.attribute || "data-src", new e(_s2.makeArray(this), t), this;
    };
  }return e;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map