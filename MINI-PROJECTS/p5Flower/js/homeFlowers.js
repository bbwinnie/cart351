"use strict";

//set the variable
let positionX;
let myFlowerColor;
let myPetalCount;

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

    //set the color
    myFlowerColor = random(['#f8c7c7', '#f5c0f0', '#818cee', '#fee598']);
    myPetalCount = int(random(8, 13));

}

/**
 * DARW THE FROG WITH BLINKING EYES WALK ON THE ICELAKE.
*/
function draw() {

    // SET THE BACKGROUND COLOR
    background(" #F6F3E9");

    //draw flower
    flower();
}

//set the flower
function flower() {

    //draw the left leaf
    push();
    translate(positionX + 20, 350);
    rotate(150);
    fill('#aae6b4');
    noStroke();
    ellipse(0, 0, 40, 20);
    pop();

    //draw the right leaf
    push();
    translate(positionX - 20, 340);
    rotate(35);
    fill('#aae6b4');
    noStroke();
    ellipse(0, 0, 40, 20);
    pop();

    //darw the brunch
    push();
    stroke('#256852');
    strokeWeight(5);
    line(positionX, 400, width / 2, 250);
    pop();

    //draw the petal
    push();
    translate(positionX, 250);
    noStroke();
    fill(myFlowerColor);
    for (let i = 0; i < myPetalCount; i++) {
        ellipse(0, 25, 15, 30);
        rotate(360 / myPetalCount);
    }
    pop();

    //draw the stamen
    push();
    fill('#faf75b');
    noStroke();
    ellipse(positionX, 250, 40);
    pop();

}
