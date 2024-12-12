const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")  // Choose 2D(2d) or 3D(other)
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;

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
    console.log(event.target.value);
    ctx.lineWidth = event.target.value;
}

lineWidth.addEventListener("change", onLineWidthChange);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);