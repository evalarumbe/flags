const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// flags are square. flagSize represents height and width
const flags = ['e', 'v', 'a'];
const flagSize = 200;
const flagGap = 15;
const flagsWidth = (flagSize * flags.length) + (flagGap * (flags.length - 1));
const flagsXoffset = canvas.width - (canvas.width + flagsWidth) / 2;

const flagYoffset = canvas.height - (canvas.height + flagSize) / 2;

const drawWaves = (wavelength) => {
    const yGap = wavelength * 2.5;  // this proportion just happens to look nice
    let yOffset = Math.floor(yGap / 2); // start with only a small space up top
    const maxRows = Math.ceil(canvas.height / (wavelength * 2));
    let rowIndex = 0;

    const drawRow = (rowIndex) => {
        // periods = number of wavelengths drawn per wave
        const periods = [2, 3, 5];
        const getPeriods = () => periods[Math.floor(Math.random() * 3)];
        let periodCount = getPeriods();
        let xOffset = (rowIndex % 2 === 0) ? (- wavelength) : wavelength; // start offscreen for odd rows
        const xGap = wavelength * 3;
        let waveWidth = 0;

        const drawWave = (x, y, periods) => {
            for (let i = 0; i < periods; i++) {
                c.beginPath();
                c.arc(x, y, wavelength / 2, 0, Math.PI, false);
                c.strokeStyle = 'rgba(0, 0, 255)';
                c.stroke();

                x += wavelength;
            }
        };

        for (let widthDrawn = 0; widthDrawn < canvas.width; widthDrawn += waveWidth) {
            drawWave(xOffset, yOffset, periodCount);
            // update the waveWidth to stop looping when the screen is full
            waveWidth = (wavelength * periodCount) + xGap;
            // update the xOffset so the next wave knows where to start
            xOffset += (wavelength * periodCount) + xGap;
            // update the perdioCount so the next wave knows how long to be
            periodCount = getPeriods();
        }
    };

    for (let i = 0; i < maxRows; i++) {
        drawRow(rowIndex);
        yOffset += yGap;
        rowIndex += 1;
    }
};

const drawFlags = (size, gap) => {

    const drawE = (xOffset) => {
        // top part, blue
        c.fillStyle = `rgb(0, 0, 255)`;
        c.fillRect(xOffset, 0, size, size / 2);
        // bottom part, red
        c.fillStyle = `rgb(255, 0, 0)`;
        c.fillRect(xOffset, (size / 2), size, size / 2);
    };

    const drawV = (xOffset) => {
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

    const drawA = (xOffset) => {
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

    drawE(flagsXoffset);
    drawV(flagsXoffset + gap + size);
    drawA(flagsXoffset + (gap * 2) + (size * 2));
};

drawWaves(50);
drawFlags(flagSize, flagGap);