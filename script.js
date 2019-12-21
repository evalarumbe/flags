const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// wave logic
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

drawWaves(50);

// flag logic
const flags = [
    {
        letter: 'e',
        render: (x, y, size) => {
            // top part, blue
            c.fillStyle = `rgb(0, 0, 255)`;
            c.fillRect(x, y, size, size / 2);
            // bottom part, red
            c.fillStyle = `rgb(255, 0, 0)`;
            c.fillRect(x, y + (size / 2), size, size / 2);
        }
    },
    {
        letter: 'v',
        render: (x, y, size) => {
            // background, white
            c.fillStyle = `rgb(255, 255, 255)`;
            c.fillRect(x, y, size, size);
            
            // X, red
            c.fillStyle = `rgb(255, 0, 0)`;
            c.beginPath();
            // top
            c.moveTo(x, y + 0);
            c.lineTo(x + size / 6, y + 0);
            c.lineTo(x + size / 2, y + size / 3);
            c.lineTo(x + size * 5 / 6, y + 0);
            c.lineTo(x + size, y + 0);
            // right
            c.lineTo(x + size, y + size / 6);
            c.lineTo(x + size * 2 / 3, y + size / 2);
            c.lineTo(x + size, y + size * 5 / 6);
            c.lineTo(x + size, y + size);
            // bottom
            c.lineTo(x + size * 5 / 6, y + size);
            c.lineTo(x + size / 2, y + size * 2 / 3);
            c.lineTo(x + size / 6, y + size);
            c.lineTo(x, y + size);
            // // left
            c.lineTo(x, y + size * 5 / 6);
            c.lineTo(x + size / 3, y + size / 2);
            c.lineTo(x, y + size / 6);
            c.lineTo(x, y + 0);
            c.fill();
        }
    },
    {
        letter: 'a',
        render: (x, y, size) => {
            // left part, white
            c.fillStyle = `rgb(255, 255, 255)`;
            c.fillRect(x, y, size / 2, size);
    
            // right part, blue
            c.fillStyle = `rgb(0, 0, 255)`;
            c.beginPath();
            c.moveTo(x + size * 0.5, y + 0);
            c.lineTo(x + size, y + 0);
            c.lineTo(x + size * 0.75, y + size / 2);
            c.lineTo(x + size, y + size);
            c.lineTo(x + size * 0.5, y + size);
            c.lineTo(x + size * 0.5, y + 0);
            c.fill();
        }
    }
];

// flags are square. flagSize represents height and width
const flagSize = 200;
const flagGap = 15;
const flagsWidth = (flagSize * flags.length) + (flagGap * (flags.length - 1));
const flagsXOffset = canvas.width - (canvas.width + flagsWidth) / 2;

const flagsYOffset = canvas.height - (canvas.height + flagSize) / 2;

flags.forEach((flag, i) => {
    // This freaky logic sets the x offset for each flag based on its index.
    // The first flag gets only a little offset, second flag starts a bit
    // further to the right, the third flag even further, etc.
    flag.render(flagsXOffset + i * (flagGap + flagSize), flagsYOffset, flagSize)
});
