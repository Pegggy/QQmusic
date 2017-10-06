(function () {
  let slider = {
    slides: [
      {link: '#', img: 'imgs/slide1.jpg'},
      {link: '#', img: 'imgs/slide2.jpg'},
      {link: '#', img: 'imgs/slide3.jpg'},
      {link: '#', img: 'imgs/slide4.jpg'},
      {link: '#', img: 'imgs/slide5.jpg'}
    ]
  };
  let $swiper = document.querySelector('.swiper-container');
  $swiper.innerHTML = ' <div class="swiper-wrapper"></div><div class="swiper-pagination" id="swiper-pagination"></div>';
  let $swiperWrapper = $swiper.querySelector('.swiper-wrapper');
  $swiperWrapper.innerHTML = slider.slides.map(slide =>
    `<div class="swiper-slide">
      <a href="${slide.link}" >
      <img src="${slide.img}" style="width: 100%;height: 100%;">
      </a>
    </div>`
  ).join('');
  let mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    autoplay : 3000,
    speed: 400,
    pagination : '.swiper-pagination',
    loop: true,
    setWrapperSize :true
  });
})()

