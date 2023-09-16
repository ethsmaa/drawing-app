const canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    tools = document.querySelectorAll(".tool"),
    sizeSlider = document.querySelector("#size-slider"),
    colorPicker = document.querySelector("#color-picker"),
    colorButton = document.querySelector(".color"),
    clearButton = document.querySelector("button")

let isDrawing = false,
    brushSize = 5,
    selectedTool = "brush",
    selectedColor = "#CBEEF4"

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})


tools.forEach(tool => {
    tool.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active")
        tool.classList.add("active") // yeni toola tıklandiginda karartma
        selectedTool = tool.id
        console.log(selectedTool)
    });
});
const startDraw = () => {
    isDrawing = true
    ctx.beginPath();
    ctx.lineWidth = brushSize;
    ctx.strokeStyle=selectedColor;
    ctx.fillStyle=selectedColor;
}

const drawing = (e) => {
    if (!isDrawing) return;

    ctx.strokeStyle = selectedTool === "eraser" ? "#fff": selectedColor;


    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

sizeSlider.addEventListener("change", () => {
    brushSize = sizeSlider.value
})

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);



colorPicker.addEventListener("change" , () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click()
})

colorButton.addEventListener("click", () => {
    selectedColor= window.getComputedStyle(colorButton).getPropertyValue("background-color");

})

clearButton.addEventListener("click" , () => {
    ctx.clearRect(0,0, canvas.width, canvas.height)
})