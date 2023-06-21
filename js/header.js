const menu = document.querySelector('#menu');
const gnb = document.querySelector('.gnb_wrap');
const btnG = document.querySelector('#close_button');

menu.addEventListener('click', () => {
	gnb.classList.remove('off');
	gnb.classList.add('on');
});

btnG.addEventListener('click', () => {
	gnb.classList.remove('on');
	gnb.classList.add('off');
});
