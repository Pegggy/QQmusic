// export class Record{
//   constructor($ct){
//     this.$ct = $ct;
//     this.searchRecord = [];
//     this.storage = window.localStorage;
//     this.storage.setItem("search_record",this.searchRecord);
//     this.$ct.addEventListener('click',this.handleClick.bind(this));
//   }
//   show(){
//     this.$ct.classList.remove('hide');
//   }
//   hide(){
//     this.$ct.classList.add('hide');
//   }
//   deleteRecord(keyword){
//     let index = this.searchRecord.indexOf(keyword);
//     this.searchRecord.splice(index,1);
//     this.storage.setItem("search_record",this.searchRecord);
//   }
//   addRecord(keyword){
//     this.searchRecord.push(keyword);
//     this.storage.setItem("search_record",this.searchRecord);
//   }
//   handleClick(event){
//     let target = event.target;
//     if(target === this.$ct.querySelector('.icon-cuowu')){
//       let keyword = target.parentNode.dataset.key;
//       this.deleteRecord(keyword)
//       this.render();
//     }
//     let value = event.target.dataset.key;
//     this.search(value);
//     this.hide();
//   }
//   render(){
//     this.$searchRecord.innerHTML = '';
//     if(!this.storage["search_record"])return;
//     let records = this.storage["search_record"];
//     let keywords = records.split(',');
//     let html = keywords.map(keyword => `
//       <li>
//         <a href="javascript:;" class="record-keyword" data-key="${keyword}">
//           <i class="iconfont icon-shijian"></i>
//           <span>${keyword}</span>
//           <i class="iconfont icon-cuowu"></i>
//         </a>
//       </li>
//     `).join('');
//     this.$ct.insertAdjacentHTML('beforeend',html);
//   }
// }