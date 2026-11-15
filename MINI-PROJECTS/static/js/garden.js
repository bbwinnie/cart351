"use strict"

/**
 * Emotion Garden(p5+js +flask)
 * Each feeling becomes a flower. its intensity change the flower's 
 * color,size,and spinning speed.
 * 
 * Visual references used while making the garden: 
 * - flowers by son :https://editor.p5js.org/son/sketches/SkJJxG2Cm 
 * - Moving Grass by maileenb: https://editor.p5js.org/maileenb/sketches/Dlyu4Sp6v
 */

//store the flowers and leaves
let flowers = [];
let leaves = [];

//set a flower color for each feeling
const feelingColors = {
    Happy: '#ec4edd',
    Sad: '#3043eb',
    Anxious: '#792be6',
    Calm: '#2fdaba',
    Angry: '#c9382d',
    Hopeful: '#81e054'
};

//get the slider, the number display from HTML , form toggle button, feelingform , record button, panel form and records panel
const feelingStrength = document.getElementById("feelingStrength");
const strengthValue = document.getElementById("strengthValue");
const toggleForm = document.getElementById("toggleForm");
const feelingPanel = document.getElementById("feelingPanel");
const plantFeeling = document.getElementById("plantFeeling");
const toggleRecords = document.getElementById("toggleRecords");
const recordsPanel = document.getElementById("recordsPanel");

//update the number when the user moves the slider
feelingStrength.addEventListener("input", function () {
    strengthValue.textContent = feelingStrength.value
})

// open and close for the feeling form
toggleForm.addEventListener("click", function () {
    feelingPanel.classList.toggle("open");
})

//open and close the records panel
toggleRecords.addEventListener("click", function () {
    recordsPanel.classList.toggle("open");
})

//listen for the form submission
plantFeeling.addEventListener("submit", function (event) {

    //stop the page from refreshing
    event.preventDefault();

    //get the current data and time 
    let currentTime = new Date();
    let timestamp = currentTime.toISOString();
    // console.log(currentTime);

    //get the selected feeling
    let selectedFeeling = document.querySelector('input[name=feeling]:checked');

    //do not plant or save anything if the user did not choose a feeling
    if (!selectedFeeling) {
        alert("please select a feeling!");
        return;
    }

    //get the intensity from the slider
    let intensity = Number(feelingStrength.value);

    //conver intensity into rotation speed
    let speed = map(intensity, 0, 10, 0.45, 8);

    //conver intensity into size
    let size = map(intensity, 0, 10, 0.7, 1.4);

    //change flower color based on intensity
    let baseColor = color(feelingColors[selectedFeeling.value]);

    //using p5 mix color lerpColor, max the dark color with white to get lighter color
    let intensityColor = lerpColor(
        color('#ffffff'),
        baseColor,
        map(intensity, 0, 10, 0.3, 1)
    );

    //create new flower object to the flower array
    // the new flower begins at growth 0 and moves through three animation stages:
    // growing -> pulsing -> spinning.
    flowers.push({
        //pick a random position, leaving some space around the canvas edge
        x: random(50, width - 50),
        y: random(50, height - 50),
        growth: 0,
        color: intensityColor,
        speed: speed,
        size: size,

        //random choose 6-12 petals for this flowers
        petalCount: int(random(6, 13)),
        stage: "growing",

        //control the pulse animation
        pulse: 1,
        pulseDirection: 1

    });

    //console.log("Total flowers:", flowers.length);

    //collect the feeling informatino to send to the Flask server
    let formData = new FormData();

    //formData holds the same values the user entered in the form
    formData.append("feeling", selectedFeeling.value);
    formData.append("intensity", feelingStrength.value);
    formData.append("note", plantFeeling.querySelector("textarea").value);
    formData.append("timestamp", timestamp);

    //use fetch with POST to save emotion through the flask route
    fetch("/saveEmotion", {
        method: "POST",
        body: formData
    })
        //read the json response returned by flask
        .then(response => response.json())
        .then(data => {
            console.log("emotion saved:", data);

            //only close and reset the form after flask confirms the save
            if (data.saved) {
                feelingPanel.classList.remove("open");

                //reset the form
                plantFeeling.reset();

                //update the slider number
                strengthValue.textContent = feelingStrength.value
            }

        })

})
//console.log(feelingStrength.value);

/**
 * SETUP 
 * create the canvas inside the garden container
*/
function setup() {

    // set the angle unit by degrees.
    angleMode(DEGREES);

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

            //remember the old canvas size
            let oldWidth = width;
            let oldHeight = height;

            //resize the canvas
            resizeCanvas(garden.clientWidth, garden.clientHeight);

            //update each flower's position
            if (oldWidth > 0 && oldHeight > 0) {
                for (let f of flowers) {
                    f.x = f.x * width / oldWidth;
                    f.y = f.y * height / oldHeight;
                }
            }
        }

    })

    //start observing the garden
    observer.observe(garden);

    //console.log("Canvas size:", garden.clientWidth, garden.clientHeight);

    //create initial leaves
    createInitialFlowers();

    //create initial leaves
    createInitialLeaves();

    //load emotion json from Flask
    loadEmotion();

}

/**
 * Draw
 * Draw the garden and flower
 */
function draw() {

    background('#f6f3e9');

    //draw the leaves , and draw the flowers on top
    drawLeaves();
    drawFlowers();

}

/**
 * draw leaves
 * visual reference: 'moving-grass' by maileenb
 *  https://editor.p5js.org/maileenb/sketches/Dlyu4Sp6v 
 * I used this as a reference for the idea of gentle plant movement.
 */
function drawLeaves() {

    //go through each leaf object and draw it
    for (let leaf of leaves) {

        push();

        // noise()produces a smooth changing value instead of sudden jumps
        //map the result to a small movement between -8 and 8
        let sway = map(noise(leaf.off), 0, 1, -8, 8);

        //move through noise slowly, so the leaf seems to shake
        leaf.off += 0.01;

        //add sway to the x position and to the leaf's angle
        translate(leaf.x * width + sway, leaf.y * height);
        rotate(leaf.angle + sway);

        noStroke();
        fill('#a9c9a3');
        ellipse(0, 0, 10 * leaf.size, 20 * leaf.size);

        pop();
    }

}

//update and draw every flowers in the garden
function drawFlowers() {

    //draw everyFlower in the garden
    for (let f of flowers) {

        //grow only the only new flowers
        if (f.stage == "growing") {

            //make each flower grow slowly
            f.growth = min(f.growth + 0.01, 1);

            //after it reaches full size, switch to the pulsing stage
            if (f.growth >= 1) {
                f.stage = "pulsing";
            }
        }

        //make the flower grow bigger and smaller
        if (f.stage === "pulsing") {

            //change the pulse size
            f.pulse = f.pulse + 0.02 * f.pulseDirection;

            //start shrinking when the flower reaches 2 times its size
            if (f.pulse >= 2) {
                f.pulse = 2;
                f.pulseDirection = -1;
            }

            //start spinning when the flower returns to normal size
            if (f.pulse <= 1) {
                f.pulse = 1;
                f.stage = "spinning";
            }
        }

        //calculate the flower size
        let displaySize = f.growth * f.size;

        //apply pulse only to pulsing flowers
        if (f.stage === "pulsing") {
            displaySize = displaySize * f.pulse;
        }

        //draw the flower with its own growth
        flower(f.x, f.y, displaySize, f.color, f.speed, f.petalCount, f.stage);

        //adding circle for new flower to help user see there flower
        if (f.stage === "growing" || f.stage === "pulsing") {

            push();
            noFill();
            stroke("#d77a91");
            strokeWeight(3);
            circle(f.x, f.y, 150 * f.size);
            pop()
        }
    }
}

//create 40 leaves across the whole garden
function createInitialLeaves() {

    //using grid spread the leaves across the cnanvas
    let leafCols = 8;
    let leafRows = 5;

    for (let i = 0; i < 40; i++) {

        //%gives the column number; floor() gives the row number
        let col = i % leafCols;
        let row = floor(i / leafCols);

        leaves.push({
            x: (col + random(0.25, 0.75)) / leafCols,
            y: (row + random(0.25, 0.75)) / leafRows,
            size: random(0.7, 1),
            angle: random(0, 360),
            off: random(0, 100)
        })
    }
}

//create 100 flowers across the whole garden
function createInitialFlowers() {

    let cols = 10;
    let rows = 10;

    //find the size of one grid cell in pixels
    let cellWidth = width / cols;
    let cellHeight = height / rows;

    for (let i = 0; i < 100; i++) {

        let col = i % cols;
        let row = floor(i / cols);

        //chose one random color
        let randomColor = random(Object.values(feelingColors));

        //chose random intensity 
        let randomIntensity = random(0.45, 1);

        //create a lighter or darker version of the selected color
        let flowerColor = lerpColor(
            color("#ffffff"),
            color(randomColor),
            randomIntensity
        );

        flowers.push({
            x: (col + random(0.25, 0.75)) * cellWidth,
            y: (row + random(0.25, 0.75)) * cellHeight,
            size: random(0.7, 1.4),
            color: flowerColor,
            growth: 1,
            speed: randomIntensity,
            petalCount: int(random(6, 13)),
            stage: "spinning",
        });
    }
}
/**
 * Flower
 * Draw a flower that grows from small to big.
 * visual reference:"flower" by son 
 * https://editor.p5js.org/son/sketches/SkJJxG2Cm
 * I used this a reference for making flowers from simple shapes.
 * My version change size, color,petal count and rotation with each feeling.
 */
function flower(x, y, growth, flowerColor, speed, petalCount, stage) {

    //rotate the flower
    push();
    translate(x, y);
    if (stage === "spinning") {
        rotate(frameCount * speed);

    }
    noStroke();

    //Draw 10 petals
    fill(flowerColor);
    for (let i = 0; i < petalCount; i++) {
        ellipse(0, 20 * growth, 15 * growth, 30 * growth);
        rotate(360 / petalCount);
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

//get saved emotions from Flask
function loadEmotion() {
    fetch('/getEmotions')
        .then(response => response.json())
        .then(data => {
            // console.log(data.emotions);

            //create a flower for each saved emotion
            for (let emotion of data.emotions) {

                //get intensity
                let intensity = Number(emotion.intensity);

                //conver intensity into rotation speed
                let speed = map(intensity, 0, 10, 0.45, 8);

                //conver intensity into size
                let size = map(intensity, 0, 10, 0.7, 1.4);

                //get the flower color based on feeling and intensity
                let baseColor = color(feelingColors[emotion.feeling]);

                let intensityColor = lerpColor(
                    color('#ffffff'),
                    baseColor,
                    map(intensity, 0, 10, 0.3, 1)
                );

                flowers.push({
                    //pick a random position, leaving some space around the canvas edge
                    x: random(50, width - 50),
                    y: random(50, height - 50),
                    growth: 1,
                    color: intensityColor,
                    speed: speed,
                    size: size,

                    //random choose 6-12 petals for this flowers
                    petalCount: int(random(6, 13)),
                    stage: "spinning",

                    //control the pulse animation
                    pulse: 1,
                    pulseDirection: 1

                });
            }

            console.log("Total flowers", flowers.length);
        })
}