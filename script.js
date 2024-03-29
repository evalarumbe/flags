const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = {
    red: '#fc5050',
    blue: '#415f77',
    white: '#d1e9ea',
};

const renderWaves = (wavelength) => {
    const maxRows = Math.ceil(canvas.height / (wavelength * 2));
    const yGap = wavelength * 2.5;  // arbitrary proportion just happens to look nice
    let yOffset = Math.floor(yGap / 2); // start with only a small space up top
    let rowIndex = 0; // this allows us to alternate which rows start offscreen

    const renderRow = (rowIndex) => {
        // periods are the number of wavelengths drawn per wave.
        // randomly decide how big each wave should be, 
        // based on some arbitrary values that look nice
        const periods = [2, 3, 5];
        const getPeriods = () => periods[Math.floor(Math.random() * 3)];
        let periodCount = getPeriods(); 

        let xOffset = (rowIndex % 2 === 0) ? (- wavelength) : wavelength; // start offscreen for even rows
        const xGap = wavelength * 3; // arbitrary value just looks nice
        let waveWidth = 0; // used to decide when we're done rendering each row

        const drawWave = (x, y, periods) => {
            for (let i = 0; i < periods; i++) {
                c.beginPath();
                c.arc(x, y, wavelength / 2, 0, Math.PI, false);
                c.strokeStyle = colors.blue;
                c.stroke();

                x += wavelength;
            }
        };

        // render waves until we reach the end of the canvas
        for (let widthDrawn = 0; widthDrawn < canvas.width; widthDrawn += waveWidth) {
            drawWave(xOffset, yOffset, periodCount);
            // update the waveWidth to stop looping when the screen is full
            waveWidth = (wavelength * periodCount) + xGap;
            // update the xOffset so the next wave knows where to start
            xOffset += (wavelength * periodCount) + xGap;
            // update the periodCount so the next wave knows how long to be
            periodCount = getPeriods();
        }
    };

    // render rows until we reach the end of the canvas
    for (let i = 0; i < maxRows; i++) {
        renderRow(rowIndex);
        yOffset += yGap;
        rowIndex += 1;
    }
};

const renderFlags = () => {
    const flags = [
        {
            letter: 'e',
            render: (x, y, size) => {
                // top part, blue
                c.fillStyle = colors.blue;
                c.fillRect(x, y, size, size / 2);
                // bottom part, red
                c.fillStyle = colors.red;
                c.fillRect(x, y + (size / 2), size, size / 2);
            }
        },
        {
            letter: 'v',
            render: (x, y, size) => {
                // background, white
                c.fillStyle = colors.white;
                c.fillRect(x, y, size, size);
                
                // X, red
                c.fillStyle = colors.red;
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
                c.fillStyle = colors.white;
                c.fillRect(x, y, size / 2, size);
        
                // right part, blue
                c.fillStyle = colors.blue;
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
};
    
renderWaves(30);
renderFlags();