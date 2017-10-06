import './tab.js'
fetch('/json/rec.json')
  .then(res => res.json())
  .then(render);

function render(json){
  let slides = json.data.slider.map(slide =>({
    link: slide.linkUrl,
    img: slide.picUrl
    }))
  let $swiper = document.querySelector('.swiper-container');
  $swiper.innerHTML = ' <div class="swiper-wrapper"></div><div class="swiper-pagination" id="swiper-pagination"></div>';
  let $swiperWrapper = $swiper.querySelector('.swiper-wrapper');
    $swiperWrapper.innerHTML = slides.map(slide =>
    `<div class="swiper-slide">
        <a href="${slide.link}" >
        <img src="${slide.img}" style="width: 100%;height: 100%;">
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







 



