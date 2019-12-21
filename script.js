const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/* TODO: resize */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drawWaves = (wavelength, gap = 0) => {
    let yOffset = wavelength; // keeping these proportional happens to look nice
    const maxRows = 10; // TODO: calc based on height

    const drawRow = () => {
        // 3-5 periods (wavelengths) per wave
        const getPeriods = () => Math.floor((Math.random() * 3) + 3);
        const periodCount = getPeriods();
        let xOffset = wavelength / -2; // start offscreen
        const maxWavesPerRow = Math.ceil(canvas.width / ((periodCount * wavelength) + gap));

        const drawWave = (x, y, periods) => {
            for (let i = 0; i < periods; i++) {
                c.beginPath();
                c.arc(x, y, wavelength / 2, 0, Math.PI, false);
                c.strokeStyle = 'rgba(0, 0, 255)';
                c.stroke();

                x += wavelength;
            }
        };

        for (let i = 0; i < maxWavesPerRow; i++) {
            drawWave(xOffset, yOffset, periodCount);
            xOffset += (wavelength * periodCount) + gap;
        }
    };

    for (let i = 0; i < maxRows; i++) {
        drawRow();
        yOffset += (wavelength * 2);
    }


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

drawWaves(50, 300);
// drawFlags(200, 15);