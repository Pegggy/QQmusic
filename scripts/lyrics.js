
export default class LyricsPlayer{
  constructor($ct){
    this.$ct = $ct;
    this.$lines = this.$ct.querySelector('.lyrics-lines');
    this.text = '';
    this.index = 0;
    this.elapsed = 0;
    this.lyrics  = [];
    this.reset(this.formatText(this.text));
    this.render();
    this.start();
  }
  start(){
    this.pause();
    this.intervalId = setInterval(this.update.bind(this),1000);
  }
  pause(){
    clearInterval(this.intervalId);
  }
  update(){
    this.elapsed += 1
    if(this.index === this.lyrics.length - 1) return
    for(let i = this.index + 1; i < this.lyrics.length; i++){
      let seconds = this.getSeconds(this.lyrics[i])
      if(this.elapsed === seconds && (!this.lyrics[i+1] || 
        this.getSeconds(this.lyrics[i+1]) > this.elapsed)){
          this.$lines.children[this.index].classList.remove('active');
          this.$lines.children[i].classList.add('active');
          this.index = i;
        }
      }
    if(this.index > 2){
      let topY = -(this.index - 2) * this.LINE_HEIGHT;
      this.$lines.style.transform = `translateY(${topY}px)`
    }
  }
  reset(text){
    this.lyrics = text.match(/^\[(\d{2}:\d{2}.\d{2})\].+$/gm) || [];
    console.log(this.lyrics);
  }
  getSeconds(line){
    return +line.replace(/\[(\d{2})\:(\d{2}).*/,(match,p1,p2)=>
      (+p1) * 60 + (+p2)
    )
  }
  render(){
    let html = this.lyrics.map( line =>`
      <p class="lyrics-line">${line.slice(10)}</p>
    `).join('');
    console.log(html);
    this.$lines.innerHTML = html;
  }
  formatText(text){
    let div = document.createElement('div')
    div.innerHTML = text
    return div.innerText
  }
}
LyricsPlayer.prototype.LINE_HEIGHT = 42