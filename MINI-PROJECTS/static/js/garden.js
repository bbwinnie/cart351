"use strict"

let growth;

//store the flowers and their information
let flowers = [];

//set a flower color for each feeling
const feelingColors = {
    Happy: '#F5C0F0',
    Sad: '#818cee',
    Anxious: '#bfa2e8',
    Calm: '#A9D8CF',
    Angry: '#e79d98',
    Hopeful: '#A9E5B1'
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

// Listen for the button of form
toggleForm.addEventListener("click", function () {
    feelingPanel.classList.toggle("open");
})

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

    if (!selectedFeeling) {
        alert("please select a feeling!");
        return;
    }

    //get the intensity from the slider
    let intensity = Number(feelingStrength.value);

    //conver intensity into rotation speed
    let speed = map(intensity, 0, 10, 0.1, 0.);

    //conver intensity into size
    let size = map(intensity, 0, 10, 0.7, 1.4);

    flowers.push({
        x: random(50, width - 50),
        y: random(50, height - 50),
        growth: 0,
        color: feelingColors[selectedFeeling.value],
        speed: speed,
        size: size,
    });

    //console.log("Total flowers:", flowers.length);

    //get the form data
    let formData = new FormData();

    formData.append("feeling", selectedFeeling.value);
    formData.append("intensity", feelingStrength.value);
    formData.append("note", plantFeeling.querySelector("textarea").value);
    formData.append("timestamp", timestamp);

    //send the form data to flask
    fetch("/saveEmotion", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log("emotion saved:", data);

            if (data.saved) {
                feelingPanel.classList.remove("open");
            }
        })

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

    // set the angle unit by degrees.
    angleMode(DEGREES);

    //create 50 flowers across the whole garden

    let cols = 10;
    let rows = 10;

    let cellWidth = width / cols;
    let cellHeight = height / rows;

    for (let i = 0; i < 100; i++) {

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