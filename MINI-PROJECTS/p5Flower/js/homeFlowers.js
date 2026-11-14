"use strict";

//set the variable
let positionX;
let flowerColor;
let petalCount;
let flowers = [];

/**
 * SETUP THE CANVAS AND DERGEES UNIT FOR THE CODE
*/
function setup() {

    // set the canvas
    createCanvas(windowWidth, 400);

    // set the angle unit by degrees.
    angleMode(DEGREES);

    // set the position
    positionX = windowWidth / 2;

    for (let i = 0; i < 30; i++) {
        flowers.push({
            x: (i + 0.5) * width / 30 + random(-10, 10),
            y: random(180, 300),
            color: random(['#f8c7c7', '#f5c0f0', '#818cee', '#fee598']),
            petalCount: int(random(8, 13))
        });
    }

}

/**
 * DARW THE FROG WITH BLINKING EYES WALK ON THE ICELAKE.
*/
function draw() {

    // SET THE BACKGROUND COLOR
    background(" #F6F3E9");

    //draw flower
    for (let f of flowers) {
        flower(f.x, f.y, f.color, f.petalCount);
    }

}

//set the flower
function flower(x, y, flowerColor, petalCount) {

    //draw the left leaf
    push();
    translate(x + 20, y + 100);
    rotate(150);
    fill('#aae6b4');
    noStroke();
    ellipse(0, 0, 40, 20);
    pop();

    //draw the right leaf
    push();
    translate(x - 20, y + 100);
    rotate(35);
    fill('#aae6b4');
    noStroke();
    ellipse(0, 0, 40, 20);
    pop();

    //darw the brunch
    push();
    stroke('#256852');
    strokeWeight(5);
    line(x, 400, x, y);
    pop();

    //draw the petal
    push();
    translate(x, y);
    noStroke();
    fill(flowerColor);
    for (let i = 0; i < petalCount; i++) {
        ellipse(0, 25, 15, 30);
        rotate(360 / petalCount);
    }
    pop();

    //draw the stamen
    push();
    fill('#faf75b');
    noStroke();
    ellipse(x, y, 40);
    pop();

}
