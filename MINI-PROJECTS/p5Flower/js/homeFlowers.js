"use strict";

/**
 * SETUP THE CANVAS AND DERGEES UNIT FOR THE CODE
*/
function setup() {

    // set the canvas
    createCanvas(windowWidth, 400);

    // set the angle unit by degrees.
    angleMode(DEGREES);

}

/**
 * DARW THE FROG WITH BLINKING EYES WALK ON THE ICELAKE.
*/
function draw() {

    // SET THE BACKGROUND COLOR
    background(" #F6F3E9");

    flower();
}

function flower() {

    push();
    translate(width / 2 + 20, 350);
    rotate(150);
    fill('#aae6b4');
    noStroke();
    ellipse(0, 0, 40, 20);
    pop();

    push();
    translate(width / 2 - 20, 340);
    rotate(35);
    fill('#aae6b4');
    noStroke();
    ellipse(0, 0, 40, 20);
    pop();

    push();
    stroke('#256852');
    strokeWeight(5);
    line(width / 2, 400, width / 2, 250);
    pop();

    push();
    translate(width / 2, 250);
    noStroke();
    fill('#f8a4a4');
    for (let i = 0; i < 10; i++) {
        ellipse(0, 25, 15, 30);
        rotate(36);
    }
    pop();

    push();
    fill('#faf75b');
    noStroke();
    ellipse(width / 2, 250, 40);
    pop();

}
