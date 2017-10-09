import './tab.js'
import './lazyload.js'

fetch('/json/rec.json')
  .then(res => res.json())
  .then(render);

function render(json){
  renderslider(json.data.slider);
  renderRadioList(json.data.radioList);
}

function renderslider(slides){
  let $swiper = document.querySelector('.swiper-container');
  $swiper.innerHTML = ' <div class="swiper-wrapper"></div><div class="swiper-pagination" id="swiper-pagination"></div>';
  let $swiperWrapper = $swiper.querySelector('.swiper-wrapper');
    $swiperWrapper.innerHTML = slides.map(slide =>
    `<div class="swiper-slide">
        <a href="${slide.linkUrl}" >
        <img src="${slide.picUrl}" style="width: 100%;height: 100%;">
        </a>
      </div>`
  ).join('');
  let mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    autoplay: 3000,
    speed: 400,
    pagination: '.swiper-pagination',
    loop: true,
    setWrapperSize: true
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
            <i class="iconfont icon-play"></i>
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

fetch('/json/toplist.json')
  .then(res => res.json())
  .then(renderRank)

function renderRank(json){
  let topList = json.data.topList;
  let rankTab = document.querySelector('.rank-tab');
  let rankList = document.createElement('ul');
  rankList.innerHTML = topList.map( item => 
  `<li class="rank-item">
    <div class="item-wrap">
      <a href="javascript:;" class="rank-media">
        <img data-src=${item.picUrl} class="lazyload">
        <i class="iconfont icon-1"></i>
        <span class="rank-count">${rankCount(item.listenCount)}万</span>
      </a>
      <div class="rank-list">
        <h3 class="rank-list-title text-hide">${item.topTitle}</h3>
        ${rankItem(item.songList)}
      </div>
      <span class="rightt-arrow"></span>
    </div>
  </li>`).join('');
  rankTab.appendChild(rankList);
  let moreMusic = document.createElement('div');
  moreMusic.innerHTML = ' <a href="#">去客户端发现更多好音乐 ></a>';
  moreMusic.classList.add('more-list');
  rankTab.appendChild(moreMusic);
  lazyload();
}
function rankCount(num){
  num = num / 10000;
  return num.toFixed(1);
}
function rankItem(songList){
  songList = songList.map((song,index) => `
  <p class="text-hide">${(index+1)}<span>${song.songname}</span>${song.singername}</p>
  `).join('');
  return songList;
}


 



