const wrap = document.querySelector('.department .wrap');

dummyData();

async function dummyData() {
	const data = await fetch('/DB/department.json');
	const json = await data.json();
	console.log(json.members);

	const mamberData = json.members;

	creatListD(json.members);
}

function creatListD(arr) {
	let tags = '';
	arr.map((el) => {
		tags += `
      <article>
        <div class="pic">
        <div class="deco_line"></div>
          <img src="img/${el.pic}" />
        </div>
        <h2>${el.name}</h2>
        <p>${el.position}</p>
      </article>
      `;
	});
	wrap.innerHTML = tags;
}
