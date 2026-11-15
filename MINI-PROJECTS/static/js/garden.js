"use strict"

let growth;

//get the slider and the number display from HTML
const feelingStrength = document.getElementById("feelingStrength");
const strengthValue = document.getElementById("strengthValue");

//update the number when the user moves the slider
feelingStrength.addEventListener("input", function () {
    strengthValue.textContent = feelingStrength.value
})

//console.log(feelingStrength.value);

/**
 * SETUP 
 * create the canvas inside the garden container
*/
function setup() {
    //get the garden container from HTML
    let garden = document.getElementById("p5gardenCanvas");

    //create a canvas with the same size as the container
    let canvas = createCanvas(garden.clientWidth, garden.clientHeight);

    //place the canvas inside the garden container
    canvas.parent("p5gardenCanvas");

    /** Fix the canvas size issus
     * When I first opened the garden page from home, I noticed a large
     * emplty space at the bottom of the canvas. However, the problem disappeared after
     * refreshing the page.
     * I checked the canvas size and used a read border to find the probelm. The container was taller 
     * than the p5.js canvas.
     * I used ResizeObserver to detect changes in the container size and resizecCanvas() to update 
     * the canvas automatically.
     * This fixed the problem without needing to refresh the page.
     *  */

    //watch for changes in the garden container size
    const observer = new ResizeObserver(function () {

        //resize the canvas only when the container size changes
        if (width !== garden.clientWidth || height !== garden.clientHeight) {
            resizeCanvas(garden.clientWidth, garden.clientHeight);
        }

    })

    //start observing the garden
    observer.observe(garden);

    //console.log("Canvas size:", garden.clientWidth, garden.clientHeight);

    // set the angle unit by degrees.
    angleMode(DEGREES);

}

/**
 * Draw
 * Draw the garden and flower
 */
function draw() {
    background('#D6E8D0');

    //draw a growing flower
    flower(width * 0.7, height * 0.5);

}

/**
 * Flower
 * Draw a flower that grows from small to big.
 */
function flower(x, y) {

    push();
    translate(x, y);
    noStroke();

    //control the flower groth
    growth = min(frameCount / 60, 1);

    //Draw 10 petals
    fill('#f5c0f0');

    for (let i = 0; i < 10; i++) {
        ellipse(0, 20 * growth, 15 * growth, 30 * growth);
        rotate(36);
    }
    pop();

    push();
    //Draw the flower center
    translate(x, y);
    noStroke();
    fill('#Faf75b');
    circle(0, 0, 20 * growth);
    pop();
}
/**
 * Window Resized
 * update the canvas size when the brower winder changes
 */
function windowResized() {
    let garden = document.getElementById("p5gardenCanvas");
    resizeCanvas(garden.clientWidth, garden.clientHeight);
}