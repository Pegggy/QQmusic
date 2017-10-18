import './tab.js'
import './lazyload.js'
import RankList from './rank.js'
import Search from './search.js'
import '../scss/app.scss'
import LyricsPlayer from './lyrics.js'
import MusicPlayer from'./player.js'

fetch('/json/rec.json')
  .then(res => res.json())
  .then(render);

function render(json){
  renderslider(json.data.slider);
  renderRadioList(json.data.radioList);
}

let ranklist = new RankList(document.querySelector('.rank-tab'));
let search = new Search(document.querySelector('.search-tab'));
let player = new MusicPlayer(document.querySelector('#player'));
let playBtn = document.querySelector('.player-btn');

onHashChange();
window.addEventListener('hashchange',onHashChange);

playBtn.addEventListener('click',()=>{
  player.show();
})
function onHashChange(){
  let hash = location.hash;
  let options = {};
  if(/^#player\?.+/.test(hash)){
    let keys = hash.slice(hash.slice(hash.indexOf('?') + 1)).match(/(\w+)=([^&]+)/g);
    keys.map(key =>{
      let obj = {},
          attr = key.split('=')[0],
          value = decodeURIComponent(key.split('=')[1]);
      obj[attr] = value;
      options = Object.assign({},options,obj);
    })
    player.play(options);
  }else{
    player.hide();
  } 
}

function renderslider(slides){
  let $swiper = document.querySelector('.swiper-container');
  $swiper.innerHTML = '<div class="swiper-wrapper"></div><div class="swiper-pagination" id="swiper-pagination"></div>';
  let $swiperWrapper = $swiper.querySelector('.swiper-wrapper');
    $swiperWrapper.innerHTML = slides.map(slide =>
    `<div class="swiper-slide">
        <a href="${slide.linkUrl}" >
        <img src="${slide.picUrl}" style="width: 100%;height: 100%;">
        </a>
      </div>`
  ).join('');
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: 3000,
    speed: 400,
    pagination: '.swiper-pagination',
    loop: true,
    setWrapperSize: true,
  });
}

function renderRadioList(radioList){
  let recTab = document.querySelector('.rec-tab');
  let songsListRadio = document.createElement('div');
  songsListRadio.classList.add('songs-list');
  songsListRadio.classList.add('radio');
  songsListRadio.innerHTML = '<h2>电台</h2><ul class="radio-wrap clearfix"></ul>';
  let radioWrap = songsListRadio.querySelector('.radio-wrap');
  radioWrap.innerHTML = radioList.map( item =>
    `<li class="radio-item">
        <a href="javascript:;">
          <div class="media-wrap">
            <img src=${item.picUrl} alt="">
            <i class="iconfont icon-bofang"></i>
          </div>
          <div class="media-info">
            <h3 class="media-title">${item.Ftitle}</h3>
          </div>
        </a>
    </li>`).join('');
  let songsListHot = document.createElement('div');
  songsListHot.classList.add('songs-list');
  songsListHot.classList.add('hot-lists');
  songsListHot.innerHTML = '<h2>热门歌单</h2><div class="more-list"><a href="#">去客户端发现更多好音乐 ></a></div>';
  recTab.appendChild(songsListRadio);
  recTab.appendChild(songsListHot);
  let footer = document.createElement('div');
  footer.classList.add('footer');
  footer.innerHTML = 
  `<div class="web-vision">
    <a href="http://y.qq.com/?ADTAG=myqq&nomobile=1#type=index">查看电脑版网页</a>
  </div>
  <div class="footer-logo"></div>
  <div class="copyright">
    <p>Copyright © 1998 - 2017 PenFan. All Rights Reserved.</p>
    <a href="mailto:fangpei9212@163.com" class="e-link">联系邮箱: fangpei9212@163.com</a>
  </div>`;
  recTab.appendChild(footer);
}



 



