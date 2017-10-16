import throttle from './throttle.js'
export class Search{
  constructor(ct){
    this.$ct = ct;
    this.$input = this.$ct.querySelector('#search-input');
    this.$songs = this.$ct.querySelector('.search-content');
    this.$cancelBtn = this.$ct.querySelector('.cancel-btn');
    this.$searchRecord = this.$ct.querySelector('.search-record');
    this.$input.addEventListener('focus',this.onFocus.bind(this));
    this.$cancelBtn.addEventListener('click',this.onBtnClick.bind(this));
    this.$input.addEventListener('keyup',this.onKeyUp.bind(this));
    this.$searchRecord.addEventListener('click',this.onRecordClick.bind(this));
    this.onscroll = throttle(this.onScrollFn.bind(this),500);
    this.keyword = '';
    this.searchRecord = [];
    window.localStorage.setItem("search_record",this.searchRecord);
    this.page = 1;
    this.perpage = 20;
    this.cancel = false;
    this.end = false;
    this.isLoading = false;
    window.addEventListener('scroll',this.onscroll);
  }
  searchHistory(keyword){
    this.searchRecord.push(keyword);
    window.localStorage["search_record"] = this.searchRecord;
  }
  showRecord(){
    this.$searchRecord.innerHTML = '';
    if(!window.localStorage["search_record"])return;
    let records = window.localStorage["search_record"];
    let keywords = records.split(',');
    let html = keywords.map(keyword => `
      <li>
        <a href="javascript:;" class="record-keyword" data-key="${keyword}">
          <i class="iconfont icon-shijian"></i>
          <span>${keyword}</span>
          <i class="iconfont icon-cuowu"></i>
        </a>
      </li>
    `).join('');
    this.$searchRecord.insertAdjacentHTML('beforeend',html);
  }
  onFocus(event){
    this.$ct.querySelector('.hot-search').classList.add('hide');
    this.$ct.querySelector('.result-wrap').classList.remove('hide');
    this.$cancelBtn.classList.remove('hide');
    this.$searchRecord.classList.remove('hide');
    this.showRecord();
  }
  onBtnClick(event){
    this.cancel = !this.cancel;
    this.reset();
    if(this.cancel){
      this.$ct.querySelector('.hot-search').classList.remove('hide');
      this.$ct.querySelector('.result-wrap').classList.add('hide');
      this.$ct.querySelector('.cancel-btn').classList.add('hide');
      this.$ct.querySelector('.nomore').classList.add('hide');
      this.$searchRecord.classList.add('hide');
    }
  }
  onKeyUp(event){
    let keyword = event.target.value.trim();
    if(!keyword) this.reset();
    if(event.keyCode !== 13 || this.isLoading ) return;
    this.searchHistory(keyword);
    this.search(keyword); 
    this.$searchRecord.classList.add('hide'); 
  }
  onScrollFn(event){
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
    this.$input.value = '';
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
        return json.data;
      })
      .then(data => this.renderResult(data))
      .then(() => {
        this.isLoading = false;
        this.hideLoading();
      })
  }
  onRecordClick(event){
    let value = event.target.dataset.key;
    this.search(value);
    this.$searchRecord.classList.add('hide');
  }
  showLoading(){
    this.$ct.querySelector('.loading').classList.remove('hide');
  }
  hideLoading(){
    this.$ct.querySelector('.loading').classList.add('hide');
  }
  renderSinger(zhida,type){
    let imgUrl;
    if(type === 2){
      imgUrl = zhida.singermid;
      return  `
        <a class="singer-info clearfix" data-singermid=${zhida.singermid}>
          <span>
            <img src="https://y.gtimg.cn/music/photo_new/T001R68x68M000${imgUrl}.jpg?max_age=2592000">
          </span>
          <h6 class="result-title">${zhida.singername}</h6>
          <p class="result-content text-hide">
            <span>单曲：${zhida.songnum}</span>
            <span>专辑：${zhida.albumnum}</span>
          </p>
        </a> 
      `;
    }else if( type === 3){
      imgUrl = zhida.albummid;
      return `
        <a class="singer-info clearfix" data-albummid=${zhida.albummid}>
          <span>
            <img src="https://y.gtimg.cn/music/photo_new/T002R68x68M000${imgUrl}.jpg?max_age=2592000">
          </span>
          <h6 class="result-title">${zhida.albumname}</h6>
          <p class="result-content text-hide">
            <span>${zhida.singername}</span>
          </p>
        </a> 
      `
    }
    else return '' 
  }
  renderResult(data){
    let zhida = data.zhida;
    let type = zhida.type;
    let tophtml = this.renderSinger(zhida,type);
    let lists = data.song.list;
    let html = lists.map(list => {
      let artist = list.singer.map(singer => singer.name).join(' / ');
      return `<a class="song clearfix" href="#player?artist=${artist}&songid=${list.songid}&songname=${list.songname}&albummid=${list.albummid}&duration=${list.interval}">
          <i class="iconfont icon-music"></i>
          <h6 class="result-title">${list.songname}</h6>
          <p class="result-content">
            <span>${artist}</span>
          </p>
       </a>`}).join('');
    this.$songs.insertAdjacentHTML('beforeend',tophtml + html);
  }
}