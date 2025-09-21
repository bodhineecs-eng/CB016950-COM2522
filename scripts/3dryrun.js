let agenum = document.getElementById("age");
let gendertext = document.getElementById("gender");
let heightnum = document.getElementById("height");
let weightnum = document.getElementById("weight");
let actlvlnum = document.getElementById("activity_level"); // dropdown list
let BMRBtn = document.getElementById("bmrBtn");
let TDEEBtn = document.getElementById("TDEEBtn");
let resultlbl = document.getElementById("resultbox");

let BasalMetabolicRate = 0; // global so TDEE can use it

// Animate counter
function animateCounter(element, target, duration = 1500) {
    let start = 0;
    let increment = target / (duration / 16); 
    let counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(counter);
        }
        element.textContent = Math.round(start);
    }, 16);
}

// --- BMR Calculation ---
BMRBtn.addEventListener("click", Bmr);

function Bmr() {
    let gender = gendertext.value.trim().toLowerCase();
    let age = parseInt(agenum.value);
    let height = parseInt(heightnum.value);
    let weight = parseInt(weightnum.value);

    if (gender == "male") {
        BasalMetabolicRate = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender == "female") {
        BasalMetabolicRate = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
        resultlbl.innerHTML = "Please enter 'male' or 'female'!";
        return;
    }

    resultlbl.innerHTML = "result:<br>" + "BMR: " + BasalMetabolicRate.toFixed(2) + " kcal/day";
}

// --- TDEE + Macronutrients ---
TDEEBtn.addEventListener("click", Tdee);

function Tdee() {
    if (BasalMetabolicRate === 0) {
        resultlbl.innerHTML = "Please calculate BMR first!";
        return;
    }

    let activityFactor = parseFloat(actlvlnum.value); 
    let TDEE = BasalMetabolicRate * activityFactor;

    // Calculate macros inside Tdee()
    let carbs = (TDEE * 0.50) / 4;
    let protein = (TDEE * 0.20) / 4;
    let fat = (TDEE * 0.30) / 9;

    resultlbl.innerHTML = `
        Result:<br>
        BMR: ${BasalMetabolicRate.toFixed(2)} kcal/day<br>
        TDEE: ${TDEE.toFixed(2)} kcal/day<br>
        <br>
        <strong>Macros:</strong><br>
        Carbs: <span id="carbCounter">0</span> g/day<br>
        Protein: <span id="proteinCounter">0</span> g/day<br>
        Fat: <span id="fatCounter">0</span> g/day
    `;

    // Animate macros
    animateCounter(document.getElementById("carbCounter"), carbs);
    animateCounter(document.getElementById("proteinCounter"), protein);
    animateCounter(document.getElementById("fatCounter"), fat);
}
