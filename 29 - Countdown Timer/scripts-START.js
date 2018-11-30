let showLeft;
const timeContainer = document.querySelector('.display__time-left');
const backAt = document.querySelector('.display__end-time');
const formTime = document.querySelector('#custom');
const formInput = document.querySelector('#input');
const buttons = document.querySelectorAll('.timer__button');

function timer (seconds) {
	clearInterval(showLeft);
	const now = Date.now();
	const then = now + seconds * 1000;
	showTime((then - now) / 1000);

	const back = new Date(then);
	const backHours = back.getHours();
	let backMins = back.getMinutes();
	if (backMins < 10) {
		backMins = '0' + backMins;
	}
	backAt.textContent = `Be back at ${backHours}:${backMins}`;

	showLeft = setInterval(() => {
		const left = Math.round((then - Date.now()) / 1000);
		showTime(left);
		if (left <= 0) {
			clearInterval(showLeft);
			return;
		}
	}, 1000)
}

function showTime (secs) {
	const hours = Math.floor(secs / 3600);
	let mins = Math.floor((secs % 3600) / 60);	
	let seconds = (secs % 3600) % 60;
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	if (mins < 10) {
		mins = '0' + mins;
	}
	const timeLeft = `${hours}:${mins}:${seconds}`;
	timeContainer.textContent = timeLeft;
	document.title = timeLeft;
}

formTime.addEventListener('submit', (e) => {
	e.preventDefault();
	timer(formInput.value * 60);
})

buttons.forEach(button => button.addEventListener('click', (e) => {
	timer(parseInt(e.target.dataset.time));
}))
