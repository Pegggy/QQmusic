(function () {
  let nav = document.querySelector('.nav')
  nav.addEventListener('click',function (e) {
    let target = e.target;
    [].forEach.call(target.parentElement.children, children =>
      children.classList.remove('active')
    );
    target.classList.add('active');
    let currentTab = document.querySelector(target.dataset.tab)
    if(currentTab){
      [].forEach.call(currentTab.parentElement.children, children=>
        children.classList.add('hide')
      )
      currentTab.classList.remove('hide')
    }
  })
})()