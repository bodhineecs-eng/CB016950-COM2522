// Handle feedback form
document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stop page refresh

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    // // Validation
    // if (name === "" || email === "" || message === "") {
    //     alert("⚠️ Please fill in all fields.");
    //     return;
    // }
    // if (!/\S+@\S+\.\S+/.test(email)) {
    //     alert("⚠️ Please enter a valid email.");
    //     return;
    // }

    // Save to localStorage
    let feedback = JSON.parse(localStorage.getItem("feedback")) || [];
    feedback.push({ name, email, message, date: new Date().toLocaleString() });
    localStorage.setItem("feedback", JSON.stringify(feedback));

    // Show confirmation
    document.getElementById("confirmation").style.display = "block";
    document.getElementById("feedbackForm").reset();
});

// FAQ answers
function showAnswer() {
    let question = document.getElementById("Que").value;
    let answer = document.getElementById("answer");

    if (question === "overweight") {
        answer.textContent = "Try a balanced diet with regular exercise. Consult a doctor before starting.";
    } else if (question === "stress") {
        answer.textContent = "Practice mindfulness, deep breathing, and daily meditation.";
    } else if (question === "hours") {
        answer.textContent = "We are open Monday–Friday, 9 AM – 6 PM.";
    } else {
        answer.textContent = "";
    }
}

//hambergur
const hamburger = document.querySelector('.hamburger');
const menuItems = document.querySelectorAll('.menu-items');
const menuBar = document.querySelector('.menu-bar');

hamburger.addEventListener('click', () => {
    menuBar.classList.toggle('show');
});




