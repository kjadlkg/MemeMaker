const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save-btn");
const fontSize = document.getElementById("font-size");
const fontFamily = document.getElementById("font-family");
const modeFill = document.getElementById("mode-fill");
const modeStroke = document.getElementById("mode-stroke");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")  // Choose 2D(2d) or 3D(other)

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round";
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;
let isTextFill = false;

function onMove(event) {
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event) {
    // console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    // console.dir(event.target);
    const colorVaule = event.target.dataset.color;
    ctx.strokeStyle = colorVaule;
    ctx.fillStyle = colorVaule;
    color.value = colorVaule;
}

function onModeClick() {
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event){
    // console.dir(event.target);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    // console.log(url);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}

function onDoubleClick(event) {
    const text = textInput.value;
    const fontSizeValue = fontSize.value;
    const fontFamilyValue = fontFamily.options[fontFamily.selectedIndex].value;

    if(text !== "") {
        ctx.save();     // Save current status, color, size, etc
        ctx.lineWidth = 1;
        ctx.font = `${fontSizeValue}px ${fontFamilyValue}`;
        if(isTextFill) {
            ctx.fillText(text, event.offsetX, event.offsetY);
        } else {
            ctx.strokeText(text, event.offsetX, event.offsetY);
        }
        ctx.restore();  // Return to save state
    }
}

function onSaveClick(event) {
    // console.log(canvas.toDataURL());
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.jpg";
    a.click();
}

function onFillText() {
    isTextFill = true;
}

function onStrokeText() {
    isTextFill = false;
}

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
modeFill.addEventListener("click", onFillText);
modeStroke.addEventListener("click", onStrokeText);

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("mousedown", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);