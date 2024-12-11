const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")  // Choose 2D(2d) or 3D(other)
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;

const colors = [    // flatuicolors.com
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
];

function onMouseMove(event) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}

canvas.addEventListener("mousemove", onMouseMove);