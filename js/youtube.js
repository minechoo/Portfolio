const wrapY = document.querySelector('.youtube .content_wrap');

fetchDataY();

document.body.addEventListener('click', (e) => {
	if (e.target.className === 'thumb') createPopY(e.target.getAttribute('alt'));
	if (e.target.className === 'close') removePopY();
});

async function fetchDataY() {
	// wrapY.classList.remove('on');
	const key = 'AIzaSyANMdnk7q2cBX8tqGJZXpVFH9bGJMOwmEc';
	const list = 'PLMafzyXZ12TPBYgeplFEdJeSMcJvb3v5u';
	const num = 8;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const data = await fetch(url);
	const json = await data.json();

	createListY(json.items);
}

function createListY(arr) {
	let tags = '';

	arr.forEach((item, idx) => {
		let number = idx + 1;
		let tit = item.snippet.title;
		let desc = item.snippet.description;
		let date = item.snippet.publishedAt;

		tags += `
      <article>
        <div>
          <div class="number">.0${number}</div>
          <h2>${tit.length > 25 ? tit.substr(0, 25) + '...' : tit}</h2>
          <p>${desc.length > 100 ? desc.substr(0, 100) + '...' : desc}</p>
          <span>${date.split('T')[0].split('-').join('.')}</span>
          <div class="pic">
            <img class="thumb" src =${item.snippet.thumbnails.standard.url} alt=${
			item.snippet.resourceId.videoId
		}>
          </div>
        </div>
      </article>
    `;
	});
	wrapY.innerHTML = tags;
	// wrapY.classList.add('on');
}

function createPopY(id) {
	const tags = `
    <div class="con">
      <iframe src="https://www.youtube.com/embed/${id}"></iframe>
    </div>
    <span class="close">close</span>
  `;
	const pop = document.createElement('aside');
	pop.className = 'pop';
	pop.innerHTML = tags;
	document.body.append(pop);
	setTimeout(() => {
		document.querySelector('.pop').classList.add('on');
	}, 0);
	document.body.style.overflow = 'hidden';
}

function removePopY() {
	document.querySelector('.pop').classList.remove('on');
	setTimeout(() => {
		document.querySelector('.pop').remove();
	}, 1000);
	document.body.style.overflow = 'auto';
}
