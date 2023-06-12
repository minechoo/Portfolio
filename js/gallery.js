const wrapG = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btn_search');
const btnInterest = document.querySelector('.gallery .btnInterest');
const btnMine = document.querySelector('.gallery .btnMine');

const api_key = '86fbba2c96b5252a51879bc23af1f41e';
const num = 30;
const myId = '194260994@N06';

fetchDataG(setURL('interest'));

btnSearch.addEventListener('click', () => getSearch());
input.addEventListener('keypress', (e) => e.code === 'Enter' && getSearch());

document.body.addEventListener('click', (e) => {
	if (e.target.className === 'userid') fetchDataG(setURL('user', e.target.innerText));
	if (e.target.className === 'pic') createPopG(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePopG();
});

btnInterest.addEventListener('click', () => {
	fetchDataG(setURL('interest'));
});

btnMine.addEventListener('click', () => {
	fetchDataG(setURL('user', myId));
});

function setURL(type, opt) {
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;

	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	if (type === 'interest') return `${baseURL}${method_interest}`;
	if (type === 'search') return `${baseURL}${method_search}&tags=${opt}`;
	if (type === 'user') return `${baseURL}${method_user}&user_id=${opt}`;
}

function getSearch() {
	const value = input.value.trim();
	input.value = '';
	if (value === '') return alert('검색어를 입력하세요');
	fetchDataG(setURL('search', value));
}

async function fetchDataG(url) {
	loading.classList.remove('off');
	wrapG.classList.remove('on');

	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;
	console.log(items);

	createListG(items);
}

function createListG(arr) {
	let tags = '';

	arr.forEach((item) => {
		tags += `
        <li class='item'>
          <div>
              <img class='pic' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' alt='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'/>
            <p>${item.title === '' ? 'Have a good day!!' : item.title}</p>

						<article class='profile'>	
							<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />				
							<span class="userid">${item.owner}</span>
						</article>
          </div>
        </li>
      `;
	});
	wrapG.innerHTML = tags;

	setLoading();
}

function setLoading() {
	const imgs = wrapG.querySelectorAll('img');
	let count = 0;

	for (const el of imgs) {
		el.onerror = () => {
			el.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};
		el.onload = () => {
			count++;
			count === imgs.length && isoLayout();
		};
	}
}

function isoLayout() {
	new Isotope(wrapG, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrapG.classList.add('on');
	loading.classList.add('off');
}

function createPopG(imgSrc) {
	const tags = `
    <div class="con">
      <img src ="${imgSrc}">
    </div>
    <span class="close">close</span>
  `;
	const aside = document.createElement('aside');
	aside.classList.add('pop');
	aside.innerHTML = tags;
	document.body.append(aside);
	setTimeout(() => aside.classList.add('on'));
	document.body.style.overflow = 'hidden';
}

function removePopG() {
	document.querySelector('.pop').classList.remove('on');
	setTimeout(() => {
		document.querySelector('.pop').remove();
	}, 1000);
	document.body.style.overflow = 'auto';
}
