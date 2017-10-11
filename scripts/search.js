export class Search{
  constructor(ct){
    this.$ct = ct;
    this.$input = this.$ct.querySelector('#search-input');
    this.$songs = this.$ct.querySelector('.search-content');
    this.$cancelBtn = this.$ct.querySelector('.cancel-btn');
    this.$input.addEventListener('focus',this.onFocus.bind(this));
    this.$cancelBtn.addEventListener('click',this.onBtnClick.bind(this));
    this.$input.addEventListener('keyup',this.onKeyUp.bind(this));
    this.keyword = '';
    this.page = 1;
    this.perpage = 20;
    this.cancel = false;
  }
  onFocus(event){
    this.$ct.querySelector('.hot-search').classList.add('hide');
    this.$ct.querySelector('.result-wrap').classList.remove('hide');
    this.$cancelBtn.classList.remove('hide');
  }
  onBtnClick(event){
    this.cancel = !this.cancel;
    this.reset();
    if(this.cancel){
      this.$ct.querySelector('.hot-search').classList.remove('hide');
      this.$ct.querySelector('.result-wrap').classList.add('hide');
      this.$ct.querySelector('.cancel-btn').classList.add('hide');
    }
  }
  onKeyUp(event){
    let keyword = event.target.value.trim();
    if(!keyword) this.reset();
    if(event.keyCode !== 13) return
    this.search(keyword)
  }
  reset(){
    this.keyword = '';
    this.page = 1;
    this.$songs.innerHTML = '';
  }
  search(keyword){
    this.onFocus();
    this.keyword = keyword;
    fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${this.page}`)
      .then(res => res.json())
      .then(json => {
        this.renderSinger(json.data.zhida);
        this.renderResult(json)
      })
  }
  renderSinger(zhidao){
    let imgUrl = zhidao.singermid;
    let html = `
      <li class="singer-info clearfix">
        <span>
          <img src="https://y.gtimg.cn/music/photo_new/T001R68x68M000${imgUrl}.jpg?max_age=2592000">
        </span>
        <h6 class="result-title">${zhidao.singername}</h6>
        <p class="result-content text-hide">
          <span>单曲：${zhidao.singerid}</span>
          <span>专辑：${zhidao.albumnum}</span>
        </p>
      </li> 
    `;
    this.$songs.insertAdjacentHTML('afterbegin',html);
  }
  renderResult(json){
    let list = json.data.song.list;
    let html = list.map(list => {
      let artist = list.singer.map(singer => singer.name).join(' / ');
      return ` <li class="song clearfix">
      <i class="iconfont icon-music"></i>
      <h6 class="result-title">${list.songname}</h6>
      <p class="result-content">
        <span>${artist}</span>
      </p>
    </li>
    `}).join('');
    this.$songs.insertAdjacentHTML('beforeend',html);
  }
}