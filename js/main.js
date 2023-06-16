const secs = document.querySelectorAll('section');
const list = document.querySelector('.indicate');
const btns = list.querySelectorAll('li');
const speed = 500;
let enableEvent = true;
let autoScroll = true;
let eventBlocker = null;
const baseline = -window.innerHeight / 2;

window.addEventListener('scroll', () => {
	if (eventBlocker) return;
	eventBlocker = setTimeout(() => {
		activation();
		eventBlocker = null;
	}, speed);
});

window.addEventListener('resize', () => {
	if (eventBlocker) return;
	eventBlocker = setTimeout(() => {
		modifyPos();
		eventBlocker = null;
	}, speed);
});

autoScroll && window.addEventListener('mousewheel', moveAuto, { passive: false });

btns.forEach((btn, idx) => {
	btn.addEventListener('click', () => enableEvent && moveScroll(idx));
});

function activation() {
	const scroll = window.scrollY;

	secs.forEach((_, idx) => {
		if (scroll >= secs[idx].offsetTop + baseline) {
			for (const el of btns) el.classList.remove('on');
			btns[idx].classList.add('on');
			for (const el of secs) el.classList.remove('on');
			secs[idx].classList.add('on');
		}
	});
}

function moveScroll(idx) {
	enableEvent = false;
	new Anime(window, {
		prop: 'scroll',
		value: secs[idx].offsetTop,
		duration: speed,
		callback: () => (enableEvent = true),
	});
}

function modifyPos() {
	const active = list.querySelector('li.on');
	const active_index = Array.from(btns).indexOf(active);

	window.scrollTo({ top: secs[active_index].offsetTop, behavior: 'smooth' });
}

function moveAuto(e) {
	e.preventDefault();
	const active = list.querySelector('li.on');
	const active_index = Array.from(btns).indexOf(active);

	if (e.deltaY > 0) {
		console.log('다운');
		if (active_index === btns.length - 1) return;
		moveScroll(active_index + 1);
	} else {
		console.log('업');
		if (active_index === 0) return;
		moveScroll(active_index - 1);
	}
}
