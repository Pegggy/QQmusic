import '../src/swiper-3.4.2.min.js'

export default class Recommend{
  constructor($ct){
    this.$ct = $ct;
    this.start();
  }
  start(){
    fetch('http://localhost:4000/')
      .then(res => res.json())
      .then(json => this.render(json));
  }
  render(json){
    this.renderslider(json.data.slider);
    this.renderRadioList(json.data.radioList);
    this.swiper(this.$ct.querySelector('.swiper-container'));
  }
  renderslider(slides){
    let $swiper = this.$ct.querySelector('.swiper-container');
    $swiper.innerHTML = ' <div class="swiper-wrapper"></div><div class="swiper-pagination" id="swiper-pagination"></div>';
    let $swiperWrapper = $swiper.querySelector('.swiper-wrapper');
    $swiperWrapper.innerHTML = slides.map(slide =>
      `<div class="swiper-slide">
          <a href="${slide.linkUrl}" >
          <img src="${slide.picUrl}" style="width: 100%;height: 100%;">
          </a>
        </div>`
    ).join('');
  }
  renderRadioList(radioList){
    let songsListRadio = document.createElement('div');
    songsListRadio.classList.add('songs-list','radio');
    songsListRadio.innerHTML = '<h2>电台</h2><ul class="radio-wrap clearfix"></ul>';
    let radioWrap = songsListRadio.querySelector('.radio-wrap');
    radioWrap.innerHTML = radioList.map( item =>
      `<li class="radio-item">
          <a href="javascript:;">
            <div class="media-wrap">
              <img src=${item.picUrl}>
              <i class="iconfont icon-bofang"></i>
            </div>
            <div class="media-info">
              <h3 class="media-title">${item.Ftitle}</h3>
            </div>
          </a>
      </li>`).join('');
    let songsListHot = document.createElement('div');
    songsListHot.classList.add('songs-list','hot-lists');
    songsListHot.innerHTML = '<h2>热门歌单</h2><div class="more-list"><a href="#">去客户端发现更多好音乐 ></a></div>';
    this.$ct.appendChild(songsListRadio);
    this.$ct.appendChild(songsListHot);
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
    this.$ct.appendChild(footer);
  }
  swiper(node){
    new Swiper(node, {
      direction: 'horizontal',
      autoplay: 3000,
      speed: 400,
      pagination: '.swiper-pagination',
      loop: true,
      // setWrapperSize: true
    });
  }
}
