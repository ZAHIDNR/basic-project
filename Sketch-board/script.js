const contain = document.querySelector(".container");
let currentsize = 16;
let colorChanged = false;
let gridCreated = false;
let brushSelected = false;
let eraserSelected = false;
let coloringEnabled = false; // Toggle coloring mode
let Shortcut = false;

// for size
const sizeInput = document.querySelector(".size-input");
const sizeBtn = document.querySelector(".size-btn");

sizeBtn.addEventListener("click", sizeChange);

function sizeChange() {
    const sizes = sizeInput.value;
    currentsize = sizes;
    createGrid(currentsize, colorChanged);
}

// for color
const colorInput = document.querySelector(".color-input");
const colorBtn = document.querySelector(".color-btn");

colorBtn.addEventListener("click", changeColor);

function changeColor() {
    colorChanged = colorInput.value;
    // Disable eraser mode when color is selected
    eraserSelected = false;
    brushSelected = true;
}

// clear button
const clearBtn = document.querySelector(".clear-btn");

clearBtn.addEventListener("click", clearTheBoard);

function clearTheBoard() {
    createGrid(currentsize, colorChanged);
}

// Function to color a cube
function colorCube(cube) {
    if (coloringEnabled) {
        if (eraserSelected) {
            cube.style.backgroundColor = "rgb(15, 17, 8)";
        } else if (colorChanged) {
            cube.style.backgroundColor = colorChanged;
        } else {
            cube.style.backgroundColor = randomColor();
        }
    }
}

// Creates cubes in the container
function createGrid(size, color) {
    contain.innerHTML = "";
    for (let i = 0; i < size; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('rows');
        
        for (let j = 0; j < size; j++) {
            const cubes = document.createElement('div');
            cubes.classList.add('cubes');
            cubes.style.width = `${600 / size}px`;
            cubes.style.aspectRatio = "1 / 1";
            
            // Mouse and touch events
            cubes.addEventListener("click", () => {
                coloringEnabled = !coloringEnabled; // Toggle coloring mode
            });
            
            cubes.addEventListener("mouseover", (e) => {
                colorCube(e.target);
            });
            
            // Add touch events for mobile
            cubes.addEventListener("touchstart", (e) => {
                e.preventDefault(); // Prevent scrolling when touching the grid
                coloringEnabled = true;
                colorCube(e.target);
            });
            
            cubes.addEventListener("touchmove", (e) => {
                e.preventDefault(); // Prevent scrolling
                
                // Get the touch position
                const touch = e.touches[0];
                
                // Find the element at the touch position
                const elementAtTouch = document.elementFromPoint(
                    touch.clientX,
                    touch.clientY
                );
                
                // If the element is a cube, color it
                if (elementAtTouch && elementAtTouch.classList.contains('cubes')) {
                    colorCube(elementAtTouch);
                }
            });
            
            cubes.addEventListener("touchend", (e) => {
                e.preventDefault(); // Prevent default behavior
            });
            
            gridRow.appendChild(cubes);
        }
        contain.appendChild(gridRow);
        gridCreated = true;
    }
}

// eraser btn
const eraserBtn = document.querySelector(".eraser-btn");

eraserBtn.addEventListener("click", startEraserMode);

function startEraserMode() {
    eraserSelected = true;
    brushSelected = false;
}

// brush btn
const brushBtn = document.querySelector(".brush-btn");

brushBtn.addEventListener("click", startBrushMode);

function startBrushMode() {
    brushSelected = true;
    eraserSelected = false;
}

// generate random color
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const showShortcut = document.querySelector(".shortcut-btn");
showShortcut.addEventListener("click", ()=>{
    Shortcut = !Shortcut
    const getShortcut = document.querySelector(".content1")
    getShortcut.style.display = Shortcut ? "flex" : "none";
})

// KEYBOARD SHORTCUTS
document.body.addEventListener("keydown", function (e) {
    if (e.key == "e") { startEraserMode(); }
    if (e.key == "b") { startBrushMode(); }
    if (e.key == "c") { clearTheBoard(); }
});

createGrid(currentsize, colorChanged);