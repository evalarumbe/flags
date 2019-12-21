const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/* TODO: resize */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* sizing */
const size = 100;
// TODO: rename xStart to offset
// TODO: const gap = size / 20;

/* colors */

const drawE = (xStart = 0) => {
    // top part, blue
    c.fillStyle = `rgb(0, 0, 255)`;
    c.fillRect(xStart, 0, size, size / 2);
    // bottom part, red
    c.fillStyle = `rgb(255, 0, 0)`;
    c.fillRect(xStart, (size / 2), size, size / 2);
};

const drawV = (xStart = 0) => {
    // background, white
    c.fillStyle = `rgb(255, 255, 255)`;
    c.fillRect(xStart, 0, size, size);
    c.strokeRect(xStart, 0, size, size);
    // X, red
    c.fillStyle = `rgb(255, 0, 0)`;
    c.beginPath();
    // top
    c.moveTo(xStart, 0);
    c.lineTo(xStart + size / 6, 0);
    c.lineTo(xStart + size / 2, size / 3);
    c.lineTo(xStart + size * 5 / 6, 0);
    c.lineTo(xStart + size, 0);
    // right
    c.lineTo(xStart + size, size / 6);
    c.lineTo(xStart + size * 2 / 3, size / 2);
    c.lineTo(xStart + size, size * 5 / 6);
    c.lineTo(xStart + size, size);
    // bottom
    c.lineTo(xStart + size * 5 / 6, size);
    c.lineTo(xStart + size / 2, size * 2 / 3);
    c.lineTo(xStart + size / 6, size);
    c.lineTo(xStart, size);
    // // left
    c.lineTo(xStart, size * 5 / 6);
    c.lineTo(xStart + size / 3, size / 2);
    c.lineTo(xStart, size / 6);
    c.lineTo(xStart, 0);
    c.fill();
};

const drawA = (xStart = 0) => {
    // left part, white
    c.fillStyle = `rgb(255, 255, 255)`;
    c.fillRect(xStart, 0, size / 2, size);

    // right part, blue
    c.fillStyle = `rgb(0, 0, 255)`;
    c.beginPath();
    c.moveTo(xStart + size * 0.5, 0);
    c.lineTo(xStart + size, 0);
    c.lineTo(xStart + size * 0.75, size / 2);
    c.lineTo(xStart + size, size);
    c.lineTo(xStart + size * 0.5, size);
    c.lineTo(xStart + size * 0.5, 0);
    c.fill();
};

drawE();
drawV(size);
drawA(size * 2);