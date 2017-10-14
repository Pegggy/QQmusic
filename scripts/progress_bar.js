export default class ProgressBar{
  constructor(ct,duration){
    this.$ct = ct;
    this.elapsed = 0;
    this.progress = 0;
    this.duration = duration || 0;
    this.render();
    this.$elapsed = this.$ct.querySelector('.elapsed');
    this.$duration = this.$ct.querySelector('.duration');
    this.$progress = this.$ct.querySelector('.progress-play');
    this.$elapsed.innerText = this.formatTime(this.elapsed);
    this.$duration.innerText = this.formatTime(this.duration);
    this.start()
  }
  start(){
    this.intervalId = setInterval(this.update.bind(this),1000);
  }
  pause(){
    clearInterval(this.intervalId)
  }
  update(){
    this.elapsed += 1;
    this.progress = this.elapsed / this.duration ;
    this.$progress.style.transform = `translate(${this.progress * 100 -100}%)`;
    this.$elapsed.innerText = this.formatTime(this.elapsed);
  }
  formatTime(seconds){
    let min = Math.floor( seconds / 60 );
    let sec = Math.floor( seconds % 60 );
    min = min < 10 ? ('0' + min ) : min;
    sec = sec < 10 ? ('0' + sec ) : sec;
    return `${min}:${sec}`
  }
  render(){
    this.$ct.innerHTML = `
      <div class="progress-time elapsed"></div>
      <div class="progress-bar">
        <div class="progress-play"></div>
      </div>
      <div class="progress-time duration"></div>`
  }
}