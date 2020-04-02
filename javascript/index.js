//var buffer = document.createElement('canvas');
//var bufferCtx = buffer.getContext('2d');
//buffer.width = 1000;
//buffer.height = 200;

//var grd = bufferCtx.createLinearGradient(0, 0, buffer.width, buffer.height);
//grd.addColorStop(0, "red");
//grd.addColorStop(1, "white");

//// Fill with gradient
//bufferCtx.fillStyle = grd;
//bufferCtx.fillRect(0, 0, buffer.width, buffer.height);

//var canvas = document.getElementById('myCanvas');
//var canvasCtx = canvas.getContext('2d');
//canvasCtx.drawImage(buffer, 0, 0, canvas.width, canvas.height, -750, 0, buffer.width, buffer.height);

//document.body.appendChild(buffer);

// To do: set up a child class that handles what we're going to draw to this.canvas

class NavigableCanvas
{
    constructor(InCanvas) {
        this.canvas = document.createElement('canvas');
        this.canvasContext = this.canvas.getContext('2d');
        this.canvas.width = 2000;
        this.canvas.height = 2000;
        this.mouseDown = false;
        this.mouseOver = false;
        this.translateX = 0.0;
        this.translateY = 0.0;
        this.scale = 1.0;
        this.outputCanvas = InCanvas;
        this.outputCanvasContext = InCanvas.getContext('2d');


        var grd = this.canvasContext.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "white");
        this.canvasContext.fillStyle = grd;
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // bind events
        InCanvas.addEventListener("mouseover", this.OnMouseOver.bind(this));
        InCanvas.addEventListener("mouseout", this.OnMouseOut.bind(this));
        InCanvas.addEventListener("mousemove", this.OnMouseMove.bind(this));
        InCanvas.addEventListener("mousedown", this.OnMouseDown.bind(this));
        InCanvas.addEventListener("mouseup", this.OnMouseUp.bind(this));
        InCanvas.addEventListener("wheel", this.OnMouseWheel.bind(this));
    }

    Render() {
        this.outputCanvasContext.clearRect(0, 0, this.outputCanvas.width, this.outputCanvas.height);
        this.outputCanvasContext.drawImage(this.canvas, 0, 0, this.outputCanvas.width, this.outputCanvas.height, this.translateX, this.translateY, this.canvas.width * this.scale, this.canvas.height * this.scale);
    }

    // Event methods
    OnMouseOver(InEvent) {
        this.mouseOver = true;        
    }

    OnMouseOut(InEvent) {
        this.mouseOver = false;
    }

    OnMouseMove(InEvent) {
        if (this.mouseOver && this.mouseDown) {
            console.log(this.mouseDown, this.translateX, this.translateY);
            this.translateX += InEvent.movementX;
            this.translateY += InEvent.movementY;
        }
    }

    OnMouseDown(InEvent) {
        this.mouseDown = true;
    }

    OnMouseUp(InEvent) {
        this.mouseDown = false;       
    }

    OnMouseWheel(InEvent) {
        this.scale += -InEvent.deltaY * 0.0005;
        InEvent.preventDefault(); // prevent page scrolling
    }
}

var fancyCanvas = new NavigableCanvas(document.getElementById('myCanvas'));
var renderInterval = setInterval(fancyCanvas.Render.bind(fancyCanvas), 10);