const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cellSize = 20;
let grid;
let gridWidth = parseInt(getValue("gridWidth"));
let gridHeight = parseInt(getValue("gridHeight"));
let cellColors = ["#FFFFFF", "#000000"];

function getValue(documentID) {
    return document.getElementById(documentID).value;
}

function createGrid() {
    gridWidth = parseInt(getValue("gridWidth"));
    gridHeight = parseInt(getValue("gridHeight"));
    grid = Array.from({ length: gridHeight}, () => Array(gridWidth).fill(0));
    drawGrid();
}

function updateGridSize() {
    let currentWidth = grid[0].length;
    let currentHeight = grid.length;
    gridWidth = parseInt(getValue("gridWidth"));
    gridHeight = parseInt(getValue("gridHeight"));

    if (gridHeight > currentHeight) {
        grid = grid.concat(Array.from({ length: gridHeight - currentHeight}, () => Array(gridWidth).fill(0)));
    } else {
        grid = grid.splice(0, gridHeight);
    }

    for (let row = 0; row < gridHeight; row++) {
        if (gridWidth > currentWidth) {
            grid[row] = grid[row].concat(Array(gridWidth - currentWidth).fill(0));
        } else {
            grid[row] = grid[row].splice(0, gridWidth);
        }
    }
    drawGrid();
}

function drawGrid() {
    canvas.width = gridWidth * cellSize;
    canvas.height = gridHeight * cellSize;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            ctx.fillStyle = cellColors[grid[y][x]];
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

function updateColors() {
    let cellTypes = parseInt(getValue("cellTypes"));
    let difference = cellTypes - cellColors.length;
    if (difference > 0) {
        cellColors = cellColors.concat(Array(difference).fill("#888888"));
    } else {
        cellColors = cellColors.splice(0, cellTypes);
    }
    updateCellColorPicker();
    drawGrid();
}

function updateCellColorPicker() {
    const cellColorsPicker = document.getElementById("cellColorPicker");
    cellColorsPicker.innerHTML = "";
    cellColors.forEach((color, index) => {
        const colorLabel = document.createElement("label");
        colorLabel.textContent = `Value ${index}: `;
        cellColorsPicker.append(colorLabel);

        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = color;
        colorInput.addEventListener("input", (e) => {
            cellColors[index] = e.target.value;
            drawGrid();
        });
        cellColorsPicker.append(colorInput);
    });
}

function exportOutput(output) {
    navigator.clipboard.writeText(output);
    console.log('Text copied to clipboard');
    alert(output);
    console.log(output);
}

function export2DArray() {
    let output = "";
    grid.forEach((row) => {
        output = `${output}[${row.join(", ")}],\n`;
    });
    // Strip trailing comma and new line
    output = output.slice(0, output.length-2);
    exportOutput(output);
}

function exportString() {
    let output = "";
    grid.forEach((row) => {
        output = `${output}${row.join("")}\n`;
    });
    exportOutput(output);
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    let x = Math.floor((event.clientX - rect.left) / cellSize);
    let y = Math.floor((event.clientY - rect.top) / cellSize);
    grid[y][x] = (grid[y][x] + 1) % cellColors.length;
    drawGrid();
});

createGrid();
updateColors();
