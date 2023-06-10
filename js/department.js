const wrap = document.querySelector('.department .wrap');

dummyData();

async function dummyData() {
	const data = await fetch('DB/department.json');
	const json = await data.json();
	console.log(json.members);

	creatListD(json.members);
}

function creatListD(arr) {
	let tags = '';
	arr.map((el) => {
		tags += `
      <article>
        <div class="pic">
          <img src="img/${el.pic}" />
					<div class="ex"> 
						<h2>${el.name}</h2>
						<p>${el.position}</p>
						<span class="sns">
							<i class="fa-brands fa-twitter"></i>
							<i class="fa-brands fa-facebook-f"></i>
						</span>
					</div>
        </div>				       
      </article>
      `;
	});
	wrap.innerHTML = tags;
}
