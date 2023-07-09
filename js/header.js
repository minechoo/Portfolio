const menu = document.querySelector('#menu');
const gnb = document.querySelector('.gnb_wrap');
const btnG = document.querySelector('#close_button');

menu.addEventListener('click', () => {
	gnb.classList.remove('off');
	gnb.classList.add('on');
	document.body.style.overflow = 'hidden';
});

btnG.addEventListener('click', () => {
	gnb.classList.remove('on');
	gnb.classList.add('off');
	document.body.style.overflow = 'auto';
});
