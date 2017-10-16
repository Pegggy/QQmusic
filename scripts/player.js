import ProgressBar from './progress_bar.js'
import LyricsPlayer from './lyrics.js'
export default class MusicPlayer{
  constructor(ct){
    this.$ct = ct;
    this.$ct.addEventListener('click',this.handleClick.bind(this));
    this.$audio = this.createAudio();
    this.progress = new ProgressBar(this.$ct.querySelector('.progress'));
    this.lyrics = new LyricsPlayer(this.$ct.querySelector('.player-lyrics'),this.$audio);
  }
  handleClick(event){
    let target = event.target;
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
    let audio = document.createElement('audio');
    audio.addEventListener('ended', () => {
      this.$audio.play()
      this.lyrics.restart()
      this.progress.restart()
    });
    document.body.appendChild(audio);
    return audio;
  }
  play(options){
    if(!options) return;
    this.$ct.querySelector('.song-name').innerText = options.songname;
    this.$ct.querySelector('.singer-name').innerText = options.artist;
    this.progress.reset(options.duration);
    let imgUrl = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${options.albummid}.jpg`;
    this.$ct.querySelector('.album-cover').src = imgUrl;
    this.$ct.querySelector('.play-background').style.backgroundImage = `url(${imgUrl})`;
    if(options.songid){
      // if(options.songid !== this.songid){

      // }
      this.songid = options.songid;
      this.$audio.src = `http://ws.stream.qqmusic.qq.com/${this.songid}.m4a?fromtag=46`;
      const url = `http://localhost:4000/lyrics?id=${this.songid}`;
      fetch(url)
        .then(res =>  res.json())
        .then(json => json.lyric)
        .then(text => this.lyrics.reset(text))
        .catch(()=>{})
    }
    this.show();
  }
  onPlay(event){
    event.target.classList.remove('icon-bofang');
    event.target.classList.add('icon-zanting');
    this.progress.start();
    this.lyrics.start();
    this.$audio.play();
  }
  onPause(event){
    event.target.classList.add('icon-bofang');
    event.target.classList.remove('icon-zanting');
    this.progress.pause();
    this.lyrics.pause();
    this.$audio.pause();
  }
  show(){
    this.$ct.classList.remove('hide') || this.$ct.classList.remove('remove');

  }

  hide(){
    this.$ct.classList.add('remove');
  }
}