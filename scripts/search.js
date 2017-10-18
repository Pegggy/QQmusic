import throttle from './throttle.js'
export default class Search{
  constructor(ct){
    this.$ct = ct;
    this.$input = this.$ct.querySelector('#search-input');
    this.$songs = this.$ct.querySelector('.search-content');
    this.$cancelBtn = this.$ct.querySelector('.cancel-btn');
    this.$record = this.$ct.querySelector('.search-record');
    this.searchRecord = [];
    this.storage = window.localStorage;
    this.storage.setItem("search_record",this.searchRecord);
    this.onscroll = throttle(this.onScrollFn.bind(this),500);

    this.$record.addEventListener('click',this.recordClick.bind(this));
    this.$input.addEventListener('focus',this.onFocus.bind(this));
    this.$cancelBtn.addEventListener('click',this.onBtnClick.bind(this));
    this.$input.addEventListener('keyup',this.onKeyUp.bind(this));
    window.addEventListener('scroll',this.onscroll);
    
    this.keyword = '';
    this.searchRecord = [];
    this.page = 1;
    this.perpage = 20;
    this.cancel = false;
    this.end = false;
    this.isLoading = false;
    this.getHotkey();
  }
  getHotkey(){
    fetch('http://localhost:4000/hotkey')
      .then(res => res.json())
      .then(json =>this.renderHotkey(json.data))
  }
  renderHotkey(data){
    let specialhtml = `<a href="${data.special_url}" class="hot-key tags">${data.special_key}</a>`;
    let hotkey = data.hotkey;
    if(hotkey.length > 6){
      hotkey = hotkey.slice(0,6);
    }
    let html = hotkey.map(key => `
      <a href="#n=${key.n}" class="tags">${key.k}</a>
    `).join('');
    this.$ct.querySelector('.hot-tags').insertAdjacentHTML('beforeend',specialhtml + html);
  }
  recordClick(event){
    let target = event.target;
    if(target === this.$ct.querySelector('.icon-cuowu')){
      let keyword = target.parentNode.dataset.key;
      this.deleteRecord(keyword)
      this.recordrender();
    }
    let value = target.dataset.key;
    this.search(value);
    hide(this.$record);
  }
  recordrender(){
    this.$record.innerHTML = '';
    if(!this.storage["search_record"])return;
    let records = this.storage["search_record"];
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
    this.$record.insertAdjacentHTML('beforeend',html);
  }
  deleteRecord(keyword){
    let index = this.searchRecord.indexOf(keyword);
    this.searchRecord.splice(index,1);
    this.storage.setItem("search_record",this.searchRecord);
    this.recordrender();
  }
  addRecord(keyword){
    this.searchRecord.push(keyword);
    this.storage.setItem("search_record",this.searchRecord);
  }

  onFocus(event){
    this.$ct.querySelector('.hot-search').classList.add('hide');
    show(this.$cancelBtn);
    this.recordrender();
    show(this.$record);
  }
  onBtnClick(event){
    this.cancel = !this.cancel;
    this.reset();
    if(this.cancel){
      show(this.$ct.querySelector('.hot-search'));
      hide(this.$ct.querySelector('.result-wrap'))
      hide(this.$ct.querySelector('.cancel-btn'));
      hide(this.$ct.querySelector('.nomore'));
      hide(this.$record);
    }
  }

  onKeyUp(event){
    let keyword = event.target.value.trim();
    if(!keyword) this.reset();
    if(event.keyCode !== 13 || this.isLoading ) return;
    this.addRecord(keyword);
    this.search(keyword); 
    hide(this.$record);
  }
  onScrollFn(event){
    if(this.end) {
      show(this.$ct.querySelector('.nomore'));
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
    show(this.$ct.querySelector('.result-wrap'));
    this.isLoading = true;
    show(this.$ct.querySelector('.loading'));
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
        hide(this.$ct.querySelector('.loading'))
      })
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

function hide(element,cls){
  let className = cls || 'hide';
  element.classList.add(className);
}
function show(element,cls){
  let className = cls || 'hide';
  element.classList.remove(className);
}