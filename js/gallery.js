const wrapG = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btn_search');
const btnInterest = document.querySelector('.gallery .btnInterest');
const btnMine = document.querySelector('.gallery .btnMine');

const api_key = '86fbba2c96b5252a51879bc23af1f41e';
const num = 30;
const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;

const method_interest = 'flickr.interestingness.getList';
const url_interest = `${baseURL}${method_interest}`;

const myId = '194260994@N06';
const method_user = 'flickr.people.getPhotos';
const url_user = `${baseURL}${method_user}&user_id=${myId}`;

const method_search = 'flickr.photos.search';

fetchDataG(url_interest);

document.body.addEventListener('click', (e) => {
	if (e.target.className === 'pic') {
		const imgSrc = e.target.getAttribute('alt');
		createPopG(imgSrc);
	}
	if (e.target.className === 'close') removePopG();
});

btnSearch.addEventListener('click', (e) => {
	e.preventDefault(e);
	const value = input.value.trim();
	input.value = '';

	if (value === '') return alert('검색어를 입력하세요');

	const url_search = `${baseURL}${method_search}&tags=${value}`;
	fetchDataG(url_search);
});

btnInterest.addEventListener('click', () => {
	fetchDataG(url_interest);
});

btnMine.addEventListener('click', () => {
	fetchDataG(url_user);
});

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
              <img class='pic' src='https://live.staticflickr.com/${item.server}/${item.id}_${
			item.secret
		}_m.jpg' alt='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'/>
            <p>${item.title === '' ? 'Have a good day!!' : item.title}</p>

						<article class='profile'>	
							<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />				
							<span>${item.owner}</span>
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
