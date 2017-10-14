
export default class LyricsPlayer{
  constructor($ct){
    this.$ct = $ct;
    this.$lines = this.$ct.querySelector('.lyrics-lines');
    this.text = "[ti&#58;明明就]&#10;[ar&#58;周杰伦]&#10;[al&#58;十二新作]&#10;[by&#58;]&#10;[offset&#58;0]&#10;[00&#58;00&#46;47]明明就&#32;&#45;&#32;周杰伦&#10;[00&#58;01&#46;78]词：方文山&#10;[00&#58;04&#46;22]曲：周杰伦&#10;[00&#58;06&#46;56]编曲：黄雨勋&#10;[00&#58;06&#46;80]&#10;[00&#58;19&#46;26]糖果罐里好多颜色&#10;[00&#58;23&#46;56]微笑却不甜了&#10;[00&#58;27&#46;74]你的某些快乐&#10;[00&#58;30&#46;92]在没有我的时刻&#10;[00&#58;34&#46;67]&#10;[00&#58;36&#46;29]中古世纪的城市里&#10;[00&#58;40&#46;53]我想就走到这&#10;[00&#58;44&#46;77]海鸥不再眷恋大海&#10;[00&#58;49&#46;02]可以飞更远&#10;[00&#58;51&#46;58]远方传来风笛&#10;[00&#58;55&#46;94]我只在意有你的消息&#10;[01&#58;00&#46;12]城堡为爱守着秘密&#10;[01&#58;04&#46;37]而我为你守着回忆&#10;[01&#58;08&#46;05]明明就&#32;不习惯&#32;牵手&#10;[01&#58;12&#46;42]为何却主动把手勾&#10;[01&#58;16&#46;54]你的心事太多&#10;[01&#58;20&#46;28]我不会戳破&#10;[01&#58;23&#46;71]&#10;[01&#58;25&#46;09]明明就&#32;他比较&#32;温柔&#10;[01&#58;29&#46;39]也许他能给你更多&#10;[01&#58;34&#46;63]不用抉择&#32;我会自动变朋友&#10;[01&#58;40&#46;56]&#10;[01&#58;56&#46;97]糖果罐里好多颜色&#10;[02&#58;01&#46;21]微笑却不甜了&#10;[02&#58;05&#46;52]你的某些快乐&#10;[02&#58;08&#46;64]在没有我的时刻&#10;[02&#58;12&#46;26]&#10;[02&#58;13&#46;95]中古世纪的城市里&#10;[02&#58;18&#46;19]我想就走到这&#10;[02&#58;22&#46;37]海鸥不再眷恋大海&#10;[02&#58;26&#46;61]可以飞更远&#10;[02&#58;29&#46;36]远方传来风笛&#10;[02&#58;33&#46;47]我只在意有你的消息&#10;[02&#58;37&#46;78]城堡为爱守着秘密&#10;[02&#58;42&#46;09]而我为你守着回忆&#10;[02&#58;45&#46;77]明明就&#32;不习惯&#32;牵手&#10;[02&#58;50&#46;14]为何却主动把手勾&#10;[02&#58;54&#46;19]你的心事太多&#32;我不会戳破&#10;[03&#58;02&#46;75]明明就&#32;他比较&#32;温柔&#10;[03&#58;07&#46;05]也许他能给你更多&#10;[03&#58;12&#46;29]不用抉择&#32;我会自动变朋友&#10;[03&#58;18&#46;41]&#10;[03&#58;35&#46;56]明明就&#32;明明就&#10;[03&#58;37&#46;37]明明就&#32;他比较&#32;温柔&#10;[03&#58;41&#46;37]也许他能给你更多&#10;[03&#58;46&#46;38]不用抉择&#32;我会自动变朋友";
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