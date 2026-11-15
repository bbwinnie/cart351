"use strict"

let growth;

//store the flowers and their information
let flowers = [];

//set a flower color for each feeling
const feelingColors = {
    happy: '#F5C0F0',
    sad: '#818cee',
    anxious: '#bfa2e8',
    calm: '#A9D8CF',
    angry: ' #e79d98',
    hopeful: '#A9E5B1'
};

//get the slider, the number display from HTML , form toggle button and panel
const feelingStrength = document.getElementById("feelingStrength");
const strengthValue = document.getElementById("strengthValue");
const toggleForm = document.getElementById("toggleForm");
const feelingPanel = document.getElementById("feelingPanel");

//update the number when the user moves the slider
feelingStrength.addEventListener("input", function () {
    strengthValue.textContent = feelingStrength.value
})

toggleForm.addEventListener("click", function () {
    feelingPanel.classList.toggle("open");
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

    //create 50 flowers across the whole garden

    let cols = 10;
    let rows = 5;

    let cellWidth = width / cols;
    let cellHeight = height / rows;

    for (let i = 0; i < 50; i++) {

        let col = i % cols;
        let row = floor(i / cols);

        flowers.push({
            x: (col + random(0.25, 0.75)) * cellWidth,
            y: (row + random(0.25, 0.75)) * cellHeight,
            size: random(0.7, 1.4),
            color: random(Object.values(feelingColors)),
            growth: 1,
            speed: random(0.02, 0.15)
        });
    }
}

/**
 * Draw
 * Draw the garden and flower
 */
function draw() {
    background('#f6f3e9');

    //draw everyFlower in the garden
    for (let f of flowers) {

        //make each flower grow slowly
        f.growth = min(f.growth + 0.01, 1);

        //draw the flower with its own growth
        flower(f.x, f.y, f.growth * f.size, f.color, f.speed);
    }

}

/**
 * Flower
 * Draw a flower that grows from small to big.
 */
function flower(x, y, growth, flowerColor, speed) {

    push();
    translate(x, y);
    rotate(frameCount * speed);
    noStroke();

    //Draw 10 petals
    fill(flowerColor);

    for (let i = 0; i < 10; i++) {
        ellipse(0, 20 * growth, 15 * growth, 30 * growth);
        rotate(36);
    }
    pop();

    push();
    //Draw the flower center
    translate(x, y);
    noStroke();
    fill('#f0eea2');
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