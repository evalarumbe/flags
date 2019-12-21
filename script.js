const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/* TODO: resize */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drawWaves = (radius = 50) => {
    let xOffset = radius * 3;
    let yOffset = radius * 2;

    const drawWave = (x, y, troughCount) => {
        for (let i = 0; i < troughCount; i++) {
            c.beginPath();
            c.arc(x, y, radius, 0, Math.PI, false);
            c.strokeStyle = 'rgba(0, 0, 255)';
            c.stroke();
    
            x += radius * 2;
        }
    };
    
    // Randomize number of troughs (wavelets)
    // const troughCounts = [3, 5, 7];
    // const random = Math.floor(Math.random() * 3);
    // drawWave(troughCounts[random]);

    let wavesDrawnPerRow = 0;
    for (let i = 0; i < 10; i++) {
        drawWave(xOffset, yOffset, 3);
        wavesDrawnPerRow += 1;
    }
    console.log(wavesDrawnPerRow);


};

const drawFlags = (size, gap) => {
    /* TODO: colors */

    const drawE = (xOffset = 0) => {
        // top part, blue
        c.fillStyle = `rgb(0, 0, 255)`;
        c.fillRect(xOffset, 0, size, size / 2);
        // bottom part, red
        c.fillStyle = `rgb(255, 0, 0)`;
        c.fillRect(xOffset, (size / 2), size, size / 2);
    };

    const drawV = (xOffset = 0) => {
        // background, white
        c.fillStyle = `rgb(255, 255, 255)`;
        c.fillRect(xOffset, 0, size, size);
        
        // X, red
        c.fillStyle = `rgb(255, 0, 0)`;
        c.beginPath();
        // top
        c.moveTo(xOffset, 0);
        c.lineTo(xOffset + size / 6, 0);
        c.lineTo(xOffset + size / 2, size / 3);
        c.lineTo(xOffset + size * 5 / 6, 0);
        c.lineTo(xOffset + size, 0);
        // right
        c.lineTo(xOffset + size, size / 6);
        c.lineTo(xOffset + size * 2 / 3, size / 2);
        c.lineTo(xOffset + size, size * 5 / 6);
        c.lineTo(xOffset + size, size);
        // bottom
        c.lineTo(xOffset + size * 5 / 6, size);
        c.lineTo(xOffset + size / 2, size * 2 / 3);
        c.lineTo(xOffset + size / 6, size);
        c.lineTo(xOffset, size);
        // // left
        c.lineTo(xOffset, size * 5 / 6);
        c.lineTo(xOffset + size / 3, size / 2);
        c.lineTo(xOffset, size / 6);
        c.lineTo(xOffset, 0);
        c.fill();
    };

    const drawA = (xOffset = 0) => {
        // left part, white
        c.fillStyle = `rgb(255, 255, 255)`;
        c.fillRect(xOffset, 0, size / 2, size);

        // right part, blue
        c.fillStyle = `rgb(0, 0, 255)`;
        c.beginPath();
        c.moveTo(xOffset + size * 0.5, 0);
        c.lineTo(xOffset + size, 0);
        c.lineTo(xOffset + size * 0.75, size / 2);
        c.lineTo(xOffset + size, size);
        c.lineTo(xOffset + size * 0.5, size);
        c.lineTo(xOffset + size * 0.5, 0);
        c.fill();
    };

    drawE(200);
    drawV(200 + gap + size);
    drawA(200 + (gap * 2) + (size * 2));
};

drawWaves();
// drawFlags(200, 15);