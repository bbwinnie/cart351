/**
 * Home page flower animation 
 * 
 * this sketch creates decorative flowers on the homepage.
 * Each flower has a random postion, color, and number of petals.
 * 
 * the flowers move gently from side to side using sin().
 * bezier curves are used to create curved stems.
 * 
 * these flowers are only for decortaion.
 * they do not contain any saved emotion data.
 */
"use strict";


//store the flowers and their information
let flowers = [];
//set the global variable
let leftLeafX;
let leftLeafY;
let rightLeafX;
let rightLeafY;
let sway;

//set the flower color
let flowerColor = ['#F5C0F0',
    '#818cee',
    '#bfa2e8',
    '#A9D8CF',
    '#e79d98',
    '#A9E5B1'];


/**
 * SETUP 
 * create the canvas and generate 30 flowers with random properties.
*/
function setup() {

    // set the canvas
    let canvas = createCanvas(windowWidth, 400);
    canvas.parent("p5FlowerCanvas");

    // set the angle unit by degrees.
    angleMode(DEGREES);

    //create 30 flowers
    for (let i = 0; i < 30; i++) {
        flowers.push({
            //spred flowers across the canse with small random changes
            x: (i + 0.5) * width / 30 + random(-10, 10),

            //give each flower a random height,color,petals
            y: random(180, 300),
            color: random(flowerColor),
            petalCount: int(random(7, 13)),
        });
    }
}

/**
 * DARW
 * draw the flowers and make them sway form left to right
*/
function draw() {

    // SET THE BACKGROUND COLOR
    background(" #F6F3E9");

    //draw each flower
    for (let f of flowers) {

        // use sine to create a smooth swaying movement
        sway = 15 * sin(frameCount * 0.8);

        //draw the flower with its position, color,petals and sway
        flower(f.x, f.y, f.color, f.petalCount, sway);
    }

}

/**
 *Flower
 *Draw one flower with two leaves, a curved stem, petals and a stamen
 */
function flower(x, y, flowerColor, petalCount, sway) {

    //find the left leaf position on the curved stem
    leftLeafX = bezierPoint(
        x, x + sway * 0.5, x + sway, x + sway, 0.4
    );
    leftLeafY = bezierPoint(
        400, 350, y + 50, y, 0.4
    );

    //fint the right leaf position on the curved stem
    rightLeafX = bezierPoint(
        x, x + sway * 0.5, x + sway, x + sway, 0.5
    );
    rightLeafY = bezierPoint(
        400, 350, y + 50, y, 0.5
    );

    //draw the left leaf
    push();
    translate(leftLeafX, leftLeafY);
    rotate(150);
    fill('#aae6b4');
    noStroke();
    ellipse(-20, 0, 40, 20);
    pop();

    //draw the right leaf
    push();
    translate(rightLeafX, rightLeafY);
    rotate(35);
    fill('#aae6b4');
    noStroke();
    ellipse(-20, 0, 40, 20);
    pop();

    //darw the curved stem using a bezier curve
    //keep the bottom fixed and move the top with the wind
    push();
    stroke('#256852');
    strokeWeight(5);
    bezier(x, 400, x + sway * 0.5, 300, x + sway, y + 50, x + sway, y);
    pop();

    //draw the petal
    push();
    translate(x + sway, y);
    noStroke();
    fill(flowerColor);
    //repeat and rotate each petal 
    for (let i = 0; i < petalCount; i++) {
        ellipse(0, 25, 15, 30);
        rotate(360 / petalCount);
    }
    pop();

    //draw the stamen
    push();
    fill('#faf75b');
    noStroke();
    ellipse(x + sway, y, 40);
    pop();

}

/**
 * Window Resized
 * update the canvas size when the brower winder changes
 */
function windowResized() {

    //remember the old canvas width
    let oldWidth = width;

    resizeCanvas(windowWidth, 400);

    //update each flower's x position
    for (let f of flowers) {
        f.x = f.x * width / oldWidth;
    }
}
