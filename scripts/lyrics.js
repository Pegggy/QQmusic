export default class LyricsPlayer{
  constructor($ct){
    this.$ct = $ct;
  }
  start(){

  }
  pause(){

  }
  reset(){

  }
  formatText(){
    let div = document.createElement('div')
    div.innerHTML = text
    return div.innerText
  }
}