import throttle from './throttle.js'
export class Search{
  constructor(ct){
    this.$ct = ct;
    this.$input = this.$ct.querySelector('#search-input');
    this.$songs = this.$ct.querySelector('.search-content');
    this.$cancelBtn = this.$ct.querySelector('.cancel-btn');
    this.$input.addEventListener('focus',this.onFocus.bind(this));
    this.$cancelBtn.addEventListener('click',this.onBtnClick.bind(this));
    this.$input.addEventListener('keyup',this.onKeyUp.bind(this));
    this.onscroll = throttle(this.onScrollFn.bind(this),500);
    this.keyword = '';
    this.page = 1;
    this.perpage = 20;
    this.cancel = false;
    this.end = false;
    this.isLoading = false;
    window.addEventListener('scroll',this.onscroll);

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
    if(event.keyCode !== 13 || this.isLoading ) return
    this.search(keyword)
  }
  onScrollFn(event){
    console.log(this.end);
    if(this.end) {
      this.$ct.querySelector('.nomore').classList.remove('hide');
      return window.removeEventListener('scroll',this.onscroll);
    }
    if(document.documentElement.clientHeight + window.pageYOffset > document.body.scrollHeight - 50 ){
      this.search(this.keyword, this.page + 1 )
    }
  }
  reset(){
    this.keyword = '';
    this.page = 1;
    this.$songs.innerHTML = '';
  }
  search(keyword,page){
    if(this.isLoading){
      return
    }
    this.onFocus();
    this.isLoading = true;
    this.showLoading()
    this.keyword = keyword;
    fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${page||this.page}`)
      .then(res => res.json())
      .then(json => {
        this.page = json.data.song.curpage;
        this.end = (json.message === "no results");
        return json.data.song.list;
      })
      .then(list => this.renderResult(list))
      .then(() => {
        this.isLoading = false;
        this.hideLoading();
      })
    }
  showLoading(){
    this.$ct.querySelector('.loading').classList.remove('hide');
  }
  hideLoading(){
    this.$ct.querySelector('.loading').classList.add('hide');
  }
  // renderSinger(zhida){
  //   let imgUrl = zhida.singermid || zhida.albummid;
  //   let html = `
  //     <li class="singer-info clearfix">
  //       <span>
  //         <img src="https://y.gtimg.cn/music/photo_new/T001R68x68M000${imgUrl}.jpg?max_age=2592000">
  //       </span>
  //       <h6 class="result-title">${zhida.singername}</h6>
  //       <p class="result-content text-hide">
  //         ${zhida.singerid ? <span>单曲：${zhida.songnum}</span> : ''}
  //         <span>专辑：${zhida.albumnum}</span>
  //       </p>
  //     </li> 
  //   `;
  //   this.$songs.insertAdjacentHTML('afterbegin',html);
  // }
  renderResult(lists){
    let html = lists.map(list => {
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