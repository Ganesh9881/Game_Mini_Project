function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}

const boy = document.querySelector('#player');
const coin = document.querySelector('#coin');
const scoredisplay = document.querySelector('#score');
var score = 0;


window.addEventListener('keydown', function(e){
	if (e.key === 'ArrowDown' || e.key === 'Down'){
		const currTop = unpx(boy.style.top);
		boy.style.top = `${currTop + 50}px`;
	}
	else if (e.key === 'ArrowUp' || e.key === 'Up'){
		const currTop = unpx(boy.style.top);
		boy.style.top = `${currTop -50}px`;
	}
	else if (e.key === 'ArrowLeft' || e.key === 'Left'){
		const currTop = unpx(boy.style.left);
		boy.style.left = `${currTop -50}px`;
		boy.style.transform = 'scale(-1, 1)';
	}
	else if (e.key === 'ArrowRight' || e.key === 'Right'){
		const currTop = unpx(boy.style.left);
		boy.style.left = `${currTop + 50}px`;
		boy.style.transform = 'scale(1, 1)';
	}

	if (isTouching(boy, coin)) {
		moveCoin();
		score = score + 1;
		scoredisplay.innerText = `Score : ${score}`;
		body.appendChild(scoredisplay);
	};
})

const unpx = (pos) => {
	if (!pos) return 100;
	return parseInt(pos.slice(0, -2));
}

const moveCoin = () => {
	const x = Math.floor(Math.random() * window.innerWidth);
	const y = Math.floor(Math.random() * window.innerHeight);
	coin.style.top  = `${y}px`;
	coin.style.left = `${x}px`; 
}
moveCoin();
