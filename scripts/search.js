export class Search{
  constructor(ct){
    this.$ct = ct;
    this.$input = this.$ct.querySelector('#search-input');
    this.$songs = this.$ct.querySelector('.search-content');
    this.$input.addEventListener('keyup',this.onKeyUp.bind(this));
    this.keyword = '';
    this.page = 1;
    this.perpage = 20;
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
    this.keyword = keyword;
    fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${this.page}`)
      .then(res => res.json())
      .then(json => this.renderResult(json))
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