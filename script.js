const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/* TODO: resize */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* sizing */
const size = 100;
// TODO: const gap = size / 20;

/* colors */

const drawE = () => {
    // top part, blue
    c.fillStyle = `rgb(0, 0, 255)`;
    c.fillRect(0, 0, size, size / 2);
    // bottom part, red
    c.fillStyle = `rgb(255, 0, 0)`;
    c.fillRect(0, (size / 2), size, size / 2);
};

const drawV = () => {
    // background, white
    c.fillStyle = `rgb(255, 255, 255)`;
    c.fillRect(size, 0, size, size);
    c.strokeRect(size, 0, size, size);
    // X, red
    // TODO
};

const drawA = () => {
    // left part, white
    c.fillStyle = `rgb(255, 255, 255)`;
    c.fillRect(size * 2, 0, size / 2, size);
    // right part, blue
    c.fillStyle = `rgb(0, 0, 255)`;
    c.beginPath();
    c.moveTo(size * 2.5, 0);
    c.lineTo(size * 3, 0);
    c.lineTo(size * 2.75, size / 2);
    c.lineTo(size * 3, size);
    c.lineTo(size * 2.5, size);
    c.lineTo(size * 2.5, 0);
    c.fill();
};

drawE();
drawV();
drawA();