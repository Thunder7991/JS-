// 装饰器模式 又名 装饰者模式
// 在不改变原对象的基础上,通过对其进行包装拓展,对原有对象可以满足用户更复杂的需求

//站室的逻辑单独封装
function openModal() {
  const modal = new Modal();
  modal.style.display = 'block';
}

//编写新的逻辑
//按钮文案修改逻辑
function changeButtonText() {
  const btn = document.getElementById('open');
  btn.innerText = '快去登录';
}

//按钮置灰逻辑
function disableButton() {
  const btn = document.getElementById('open');
  btn.setAttribute('disabled', true);
}
//新版本功能逻辑整合
function changeButtonStatus() {
  changeButtonText();
  disableButton();
}

document.getElementById('open').addEventListener('click',function () {
    openModal()
    changeButtonStatus()
})