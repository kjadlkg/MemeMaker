const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")  // Choose 2D(2d) or 3D(other)
canvas.width = 800;
canvas.height = 800;

// torso
ctx.fillRect(210, 200, 15, 100);
ctx.fillRect(350, 200, 15, 100);
ctx.fillRect(260, 200, 60, 200);

// head
ctx.arc(290, 130, 50, 0, 2 * Math.PI);  // Ref: img of the endAngle
ctx.fill();

// face
ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(270 - 5, 130, 10, Math.PI, 2 * Math.PI);
ctx.arc(320 - 5, 130, 10, Math.PI, 2 * Math.PI);
ctx.fill();