'use strict';

var colorSelect = document.querySelector('#colorSelectInput');
var thickSize = document.querySelector('#thickSize');
var middleSize = document.querySelector('#middleSize');
var boldSize = document.querySelector('#boldSize');
var clearAll = document.querySelector('#clearAll');
var penType = document.querySelector('#penType');

document.addEventListener('DOMContentLoaded', function(){
    var board = new DrawBoard({
        el: '#canvas'
    });

    colorSelect.onchange = function(){
        console.log(colorSelect.value);
        board.changeColor(colorSelect.value);
    };

    thickSize.onclick = function(){
        board.changeSize(1);
    };

    middleSize.onclick = function(){
        board.changeSize(5);
    };

    boldSize.onclick = function(){
        board.changeSize(12);
    };

    clearAll.onclick = function(){
        board.clear();
    };

    penType.onclick = function(){
        if(board.getDrawType() == 1){
            penType.innerHTML = '画笔';
            board.setDrawType(2);
        }else{
            penType.innerHTML = '橡皮擦';
            board.setDrawType(1);
        }
    }
});

