'use strict';

class DrawBoard {
    constructor(options){
        var sCanvas = options.el;
        if(sCanvas){
            this.initDOM(sCanvas);
        }
        this.drawType = 1; // 1：画 2：橡皮
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }
    initDOM(sCanvas){
        this.canvas = document.querySelector(sCanvas);
        this.canvasBox = this.canvas.getBoundingClientRect();
        // console.log(this.canvas);
        console.log(this.canvasBox);
        // console.log(this.canvas.offsetWidth);
        // console.log(this.canvas.offsetHeight);
        this.canvas.width = this.canvasBox.width;
        this.canvas.height = this.canvasBox.height;
    }
    init(){
        this.draw();
    }
    draw(){
        var _this = this;
        this.canvas.addEventListener('touchstart', function(e){

            console.log(_this.ctx);
            _this.ctx.lineCap = 'round';
            _this.ctx.lineJoin = 'round';

            _this.mouseStart(e);
            _this.canvas.addEventListener('touchmove', _this.mouseMove.bind(_this));
            _this.canvas.addEventListener('touchend', _this.mouseEnd.bind(_this));
        });
    }
    mouseStart(e){
        var _this = this;
        var touch = e.touches[0];
        var startPoint = {
            x: touch.pageX - _this.canvasBox.left,
            y: touch.pageY - _this.canvasBox.top
        }
        console.log(touch);

        _this.ctx.beginPath();
        _this.ctx.moveTo(startPoint.x, startPoint.y);
    }
    mouseMove(e){
        var _this = this;
        var touch = e.touches[0];
        var movePoint = {
            x: touch.pageX - _this.canvasBox.left,
            y: touch.pageY - _this.canvasBox.top
        }
        _this.ctx.lineTo(movePoint.x, movePoint.y);

        if(_this.drawType == 1){
            _this.ctx.stroke();
        }else{
            _this.rubber(movePoint.x, movePoint.y, _this.ctx.lineWidth);
        }
    }
    mouseEnd(e){
        var _this = this;
        this.canvas.removeEventListener('touchmove', _this.mouseMove.bind(_this));
        this.canvas.removeEventListener('touchend', _this.mouseEnd.bind(_this));
    }
    // clip裁剪模拟橡皮
    rubber(x, y, lw){
        console.log(lw);
        this.ctx.clearRect(x, y, lw+10, lw+10);
    }
    changeColor(sColor){
        this.ctx.strokeStyle = sColor;
    }
    changeSize(nSize){
        this.ctx.lineWidth = nSize;
    }
    clear(){
        this.ctx.clearRect(0, 0, this.canvasBox.width, this.canvasBox.height);
    }
    setDrawType(num){  // 1：画 2：橡皮
        this.drawType = num;
    }
    getDrawType(){
        return this.drawType;
    }
}