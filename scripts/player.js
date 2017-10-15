import ProgressBar from './progress_bar.js'
import LyricsPlayer from './lyrics.js'
export default class MusicPlayer{
  constructor(ct){
    this.$ct = ct;
    this.$ct.addEventListener('click',this.handleClick.bind(this));
    this.$audio = this.createAudio();
    this.progress = new ProgressBar(this.$ct.querySelector('.progress'),61,true);
    this.lyrics = new LyricsPlayer(this.$ct.querySelector('.player-lyrics'));
  }
  handleClick(event){
    let target = event.target;
    console.log(target);
    switch(true){
      case target.matches('.icon-bofang'):
        this.onPlay(event);
        this.progress.start();
        break;
      case target.matches('.icon-zanting'):
        this.onPause(event);
        this.progress.pause();
        break;
      case target.matches('.icon-icon-music-lsit'):
        this.hide();
        break;
      default:
      return
    }
  }
  createAudio(){
    let audio = document.createElement('audio');
    document.body.appendChild(audio);
    return audio;
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
    this.$ct.classList.add('remove');
  }
}