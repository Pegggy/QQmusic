import './tab.js'
import './lazyload.js'
import Search from './search.js'
import Recommend from './rec.js'
import RankList from './rank.js'
import '../scss/app.scss'
import LyricsPlayer from './lyrics.js'
import MusicPlayer from'./player.js'


let recommend = new Recommend(document.querySelector('.rec-tab'));
let rank = new RankList(document.querySelector('.rank-tab'));
let search = new Search(document.querySelector('.search-tab'));
let player = new MusicPlayer(document.querySelector('#player'));
let playBtn = document.querySelector('.player-btn');
onHashChange();
playBtn.addEventListener('click',()=>{
  player.show();
})

function render(json){
  renderslider(json.data.slider);
  renderRadioList(json.data.radioList);
}


function onHashChange(){
  let hash = location.hash;
  let options = {};
  if(/^#player\?.+/.test(hash)){
    let keys = hash.slice(hash.slice(hash.indexOf('?') + 1)).match(/(\w+)=([^&]+)/g);
    keys.map(key =>{
      let obj = {},
          attr = key.split('=')[0],
          value = decodeURIComponent(key.split('=')[1]);
      obj[attr] = value;
      options = Object.assign({},options,obj);
    })
    player.play(options);
  }else{
    player.hide();
  } 
}

