class Slider{
  constructor(options){
    this.$ct = options.ct;
    this.slides = options.slides;
    this.render()
  }
  render(){
    this.$ct.innerHTML = '<div class="slider-wrap"></div>'
    this.$wrap = this.$ct.firstElementChild
    this.$wrap.style.width = `${100 * this.slides.length}%`
    this.$wrap.innerHTML = this.slides.map(slide =>
      `<div class="slider-item">
        <a href="${slide.link}" class="">
          <img src="${slide.img}" alt="">
        </a>
      </div>`
    ).join('')
  }
}