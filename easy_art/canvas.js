/*
    Author: Ben Orrvick
    Class: CIS 270
    Purpose: This project will allow the user to input numbers in various text boxes while
    also clicking buttons to generate shapes. The user can also draw on the canvas with their mouse, or w, a, s, d
    Date: April 20th, 2018

    */
var canvas, context,
    x, y, sz, mouseWidth, keyWidth;
drawing = false;

//creates shortcut for get element by id
function $(id) {
    return document.getElementById(id);
}

window.onload = function () {
    canvas = $("myCanvas");
    context = canvas.getContext("2d");
    x = canvas.width / 2;
    y = canvas.height / 2;
    //draws a giant white rectangle the size of the canvas to create the illusion we changed the background color
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    //allows the user to click on the buttons labeled boxes and circles to generate an amount of boxes or circles
    $("box").addEventListener('click', DrawBoxes);
    $("circle").addEventListener('click', DrawCircles);
    //listener to clear canvas
    $("clear").addEventListener('click', clear);
    $("white").addEventListener('click', radioWhite);
    $("grey").addEventListener('click', radioGrey);
    window.addEventListener("keydown", keyDown);
    canvas.addEventListener("mousedown", function (event) {
        mousedown(event);
    }
    );
    canvas.addEventListener("mouseup", function (event) {
        mouseup(event);
    }
    );
    canvas.addEventListener("mousemove", function (event) {
        mousemove(event);
    }
    );

};
//This function is called by both drawboxes and drawcircles. It is designed to randomly generate a RGBA color and return it for use
function randomRGBA(){
    var r = Math.floor(Math.random() *256); //Uses 256 because colors range from 0-255
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() *256);
    var a = Math.random();

    var color = "rgba(" + r + ',' + g + ',' + b + ',' + a + ")";
    return color;
}
//This function takes the user inputted 'repeat' number, and generates that amount of random boxes on the canvas. Entirerly random x, y , w, h
function DrawBoxes(){
    var n = $("repeat").value;
    for(var i = 1; i <= n; i++){
        //Setting up variables for box generation, need to be in the loop or the box will be the same everytime
        var w = Math.floor(Math.random() * context.canvas.width);
        var h = Math.floor(Math.random() * context.canvas.height);
        var x = Math.floor(Math.random() * context.canvas.width - w);
        var y = Math.floor(Math.random() * context.canvas.height - h);
        //boxes formation
        context.beginPath();
        context.rect(x, y, w, h);
        context.fillStyle = randomRGBA();
        context.fill();
        //context.stroke(); //Undo this to see some crazy stuff whenever the user mousedraws on the canvas and then clicks the boxes button
    }
}
//This function uses the user input for 'repeat' and generates that amount of circles Very similar to the function drawboxes
function DrawCircles(){
    var n = $("repeat").value;
    for(var i = 1; i <= n; i++){
        //Setting up variables for cicle generation, need to be in the loop or the circles will be the same everytime
        var r = Math.floor(Math.random()* 100); //radius
        var x = Math.floor(Math.random()* context.canvas.width); 
        var y = Math.floor(Math.random() * context.canvas.height);
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI *2, true);
        context.fillStyle = randomRGBA();
        context.fill();
        //context.stroke(); //Undo this to see some crazy stuff whenever the user mousedraws on the canvas and then clicks the circles button
    }
}
function keyDown(e) {
    context.fillStyle = 'red';
    //controls the speed of etascheta aka how far away each block is from each other when drawn
    sz = 5;
    //gets the user entered number for size of line
    keyWidth = document.getElementById("keyWidth").value;
    if (e.keyCode !== 87 && e.keyCode !== 65 && e.keyCode !== 83 && e.keyCode !== 68)
        return;
    //starts the line draw
    context.beginPath();
    if (e.keyCode === 87) y -= sz; //w
    if (e.keyCode === 83) y += sz; //s
    if (e.keyCode === 65) x -= sz; //a
    if (e.keyCode === 68) x += sz; //d
    //fills the rectangles
    context.fillRect(x, y, keyWidth, keyWidth);
}

function mousedown(event) {

    //gets value that you enter and gives it to varible to set mouse width
    mouseWidth = document.getElementById("mouseWidth").value;
    var location = windowToCanvas($('myCanvas'), event.clientX, event.clientY);
    //sets mouse width
    context.lineWidth = mouseWidth;
    context.strokeStyle = "#000";
    context.beginPath();
    context.moveTo(location.x, location.y);
    drawing = true;
}

function mouseup(event) {
    if (!drawing)
        return;
    drawing = false;
}

function mousemove(event) {
    if (!drawing)
        return;
    var location = windowToCanvas($('myCanvas'), event.clientX, event.clientY);
    context.lineTo(location.x, location.y);
    context.stroke();
}

function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left,
        y: y - bbox.top
    };
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    //sets back white background color and reselects radio button
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById("white").checked = true;
}

//draws over canvas to create illusion of being clear
function radioWhite() {
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
}
function radioGrey() {
        context.fillStyle = 'grey';
        context.fillRect(0, 0, canvas.width, canvas.height);
 
}
