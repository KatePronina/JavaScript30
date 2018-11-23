const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipBtns = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressFill = document.querySelector('.progress__filled');
const fullBtn = document.querySelector('.player__full');
const player = document.querySelector('.player');

function togglePlay (e) {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function changeButton (e) {
	if (video.paused) {
		toggle.textContent = '►';
	} else {
		toggle.textContent = '❚ ❚';
	}
}

function skip (e) {
	video.currentTime += +e.target.dataset.skip;
}

function handleRange (e) {
	video[e.target.name] = e.target.value;
}

function videoUpdate (e) {
	const currentTime = (video.currentTime / video.duration) * 100;
	progressFill.style.flexBasis = `${currentTime}%`;
}

function handleProgress (e) {
	const time = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = time;
}

function fullscreen (e) {
	player.webkitRequestFullScreen();
}

video.addEventListener('click', togglePlay);
video.addEventListener('pause', changeButton);
video.addEventListener('play', changeButton);
video.addEventListener('timeupdate', videoUpdate);
toggle.addEventListener('click', togglePlay);
skipBtns.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));
progress.addEventListener('click', handleProgress);

let isMouseDown = false;
progress.addEventListener('mousemove', e => isMouseDown && handleProgress(e));
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);

fullBtn.addEventListener('click', fullscreen);