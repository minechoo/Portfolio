const mapContainer = document.querySelector('#map');
const btns = document.querySelectorAll('.branch li');

const markerInfo = [
	{
		title: '아샘타워',
		position: new kakao.maps.LatLng(37.513061828815815, 127.05982069241152),
		imgSrc: 'img/marker.png',
		imgSize: new kakao.maps.Size(70, 60),
		imgPos: { offset: new kakao.maps.Point(15, 60) },
		button: btns[0],
	},
	{
		title: '덕수궁',
		position: new kakao.maps.LatLng(37.565074, 126.976582),
		imgSrc: 'img/marker.png',
		imgSize: new kakao.maps.Size(70, 60),
		imgPos: { offset: new kakao.maps.Point(15, 60) },
		button: btns[1],
	},
	{
		title: '카카오본사',
		position: new kakao.maps.LatLng(33.450701, 126.570667),
		imgSrc: 'img/marker.png',
		imgSize: new kakao.maps.Size(70, 60),
		imgPos: { offset: new kakao.maps.Point(15, 60) },
		button: btns[2],
	},
];

const map = new kakao.maps.Map(mapContainer, { center: markerInfo[0].position, level: 3 });

markerInfo.forEach((info) => {
	const marker = new kakao.maps.Marker({
		position: info.position,
		image: new kakao.maps.MarkerImage(info.imgSrc, info.imgSize, info.imgPos),
	});
	marker.setMap(map);
	info.button.addEventListener('click', () => map.panTo(info.position));
});
