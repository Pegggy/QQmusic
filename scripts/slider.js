class Slider{
  constructor(options){
    this.$ct = options.ct;
    this.slides = options.slides;
    this.index = 0;
    this.interval = options.interval || 3000;
    this.render()
    this.start()
  }
  render(){
    this.$ct.innerHTML = '<div class="slider-wrap"></div><div class="slider-nav"></div>'
    this.$wrap = this.$ct.firstElementChild
    this.$nav = this.$ct.lastElementChild
    this.$wrap.style.width = `${100 * this.slides.length}%`
    this.$wrap.innerHTML = this.slides.map(slide =>
      `<div class="slider-item">
        <a href="${slide.link}" class="">
          <img src="${slide.img}" alt="">
        </a>
      </div>`
    ).join('');
    this.$nav.innerHTML = this.slides.map(slide =>
      `<a href="#" class="dots"></a>`
    ).join('')
  }
  start(){
    setInterval(this.next.bind(this),this.interval)
  }
  addDots(index){
    this.$nav.querySelectorAll('.dots').forEach(dot => dot.classList.remove('active'))
    this.$nav.querySelectorAll('.dots')[index].classList.add('active')
  }
  next(){
    this.index += 1;
    let length = this.slides.length;
    if(this.index === length){
      this.index = 0;
      this.$wrap.style.transform = `translate(0)`;
      this.addDots(this.index)
      return
    }
    let X = `-${this.index  / this.slides.length * 100}%`;
    this.$wrap.style.transform = `translate(${X})`;
    this.addDots(this.index)
  }

}