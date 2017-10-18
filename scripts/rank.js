import './lazyload.js'
export default class RankList{
  constructor($ct){
    this.$ct = $ct;
    this.start();
  }
  start(){
    fetch('http://localhost:4000/toplist')
      .then(res => res.json())
      .then(json => this.render(json))
  }
  render(json){
    let _this = this;
    let topList = json.data.topList;
    let rankList = document.createElement('ul');
    rankList.innerHTML = topList.map( item => 
    `<li class="rank-item">
      <div class="item-wrap">
        <a href="javascript:;" class="rank-media">
          <img data-src=${item.picUrl} class="lazyload">
          <i class="iconfont icon-1"></i>
          <span class="rank-count">${_this.rankCount(item.listenCount)}万</span>
        </a>
        <div class="rank-list">
          <h3 class="rank-list-title text-hide">${item.topTitle}</h3>
          ${_this.rankItem(item.songList)}
        </div>
        <span class="rightt-arrow"></span>
      </div>
    </li>`).join('');
    this.$ct.appendChild(rankList);
    let moreMusic = document.createElement('div');
    moreMusic.innerHTML = ' <a href="#">去客户端发现更多好音乐 ></a>';
    moreMusic.classList.add('more-list');
    this.$ct.appendChild(moreMusic);
    lazyload();
  }
  rankItem(songList){
    songList = songList.map((song,index) => `
    <p class="text-hide">${(index+1)}<span>${song.songname}</span>${song.singername}</p>
    `).join('');
    return songList;
  }
  rankCount(num){
    num = num / 10000;
    return num.toFixed(1);
  }
}
// fetch('/json/toplist.json')
//   .then(res => res.json())
//   .then(renderRank)


// function renderRank(json){
//   let topList = json.data.topList;
//   let rankTab = document.querySelector('.rank-tab');
//   let rankList = document.createElement('ul');
//   rankList.innerHTML = topList.map( item => 
//   `<li class="rank-item">
//     <div class="item-wrap">
//       <a href="javascript:;" class="rank-media">
//         <img data-src=${item.picUrl} class="lazyload">
//         <i class="iconfont icon-1"></i>
//         <span class="rank-count">${rankCount(item.listenCount)}万</span>
//       </a>
//       <div class="rank-list">
//         <h3 class="rank-list-title text-hide">${item.topTitle}</h3>
//         ${rankItem(item.songList)}
//       </div>
//       <span class="rightt-arrow"></span>
//     </div>
//   </li>`).join('');
//   rankTab.appendChild(rankList);
//   let moreMusic = document.createElement('div');
//   moreMusic.innerHTML = ' <a href="#">去客户端发现更多好音乐 ></a>';
//   moreMusic.classList.add('more-list');
//   rankTab.appendChild(moreMusic);
//   lazyload();
// }
function rankCount(num){
  num = num / 10000;
  return num.toFixed(1);
}
function rankItem(songList){
  songList = songList.map((song,index) => `
  <p class="text-hide">${(index+1)}<span>${song.songname}</span>${song.singername}</p>
  `).join('');
  return songList;
}
