import ProgressBar from './progress_bar.js'
export default class MusicPlayer{
  constructor(ct){
    this.$ct = ct;
    this.$ct.addEventListener('click',this.handleClick.bind(this))
    // this.lyrics = new LyricsPlayer(this.$ct.querySelector('.player-lyrics'))
    this.progress = new ProgressBar(this.$ct.querySelector('.progress'),288);
  }
  handleClick(event){
    let target = event.target;
    console.log(target);
    switch(true){
      case target.matches('.icon-bofang'):
        this.onPlay(event);
        break;
      case target.matches('.icon-zanting'):
        this.onPause(event);
        break;
      case target.matches('.icon-icon-music-lsit'):
        this.hide();
        break;
      default:
      return
    }
  }
  createAudio(){

  }
  onPlay(event){
    event.target.classList.remove('icon-bofang');
    event.target.classList.add('icon-zanting');
  }
  onPause(event){
    event.target.classList.add('icon-bofang');
    event.target.classList.remove('icon-zanting');
  }
  show(){

  }
  hide(){
    this.$ct.classList.add('hide');
  }
}