export default function throttle(func,wait){
  let timer,prev
  return function (){
    let curr = +new Date(); 
    let diff = curr - prev;
    if(!prev || diff > wait){
      func()
      prev = curr;
    }else if( diff < wait){
      clearTimeout(timer);
      timer = setTimeout(func,wait - diff)
    }
  }
} 