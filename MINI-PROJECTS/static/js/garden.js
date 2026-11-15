const feelingStrength = document.getElementById("feelingStrength");
const strengthValue = document.getElementById("strengthValue");

feelingStrength.addEventListener("input", function () {
    strengthValue.textContent = feelingStrength.value
})
console.log(feelingStrength.value);