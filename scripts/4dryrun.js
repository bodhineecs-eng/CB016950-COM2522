const generateBtn = document.getElementById("generateBtn");
const workoutList = document.getElementById("workoutList");
const timerElement = document.getElementById("timer");
const beepSound = document.getElementById("beepSound");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");

let timerInterval = null;
let currentTimeLeft = 0;
let currentExerciseIndex = 0;
let exercisesGlobal = [];

generateBtn.addEventListener("click", () => {
    const selectedBodyParts = Array.from(document.querySelectorAll('input[name="bodypart"]:checked'))
                                   .map(cb => cb.value);
    const selectedEquipment = document.getElementById("equipment").value;

    if(selectedBodyParts.length === 0){
        workoutList.innerHTML = "<li>Please select at least one body part.</li>";
        timerElement.textContent = "00:00";
        return;
    }

    fetch("scripts/workout.json")
        .then(res => res.json())
        .then(data => {
            const finalWorkout = [];

            selectedBodyParts.forEach(bp => {
                let filtered;
                if(selectedEquipment === "" || selectedEquipment === "none") {
                    filtered = data.filter(ex => ex.bodyPart === bp && ex.equipment === "none");
                } else {
                    filtered = data.filter(ex => ex.bodyPart === bp && ex.equipment === selectedEquipment);
                }

                if(filtered.length > 0){
                    const randomEx = filtered[Math.floor(Math.random() * filtered.length)];
                    finalWorkout.push(randomEx);
                }
            });

            if(finalWorkout.length === 0){
                workoutList.innerHTML = "<li>No exercises found for this selection.</li>";
                timerElement.textContent = "00:00";
                return;
            }

            exercisesGlobal = finalWorkout;
            currentExerciseIndex = 0;

            // Show full workout plan
            workoutList.innerHTML = "";
            exercisesGlobal.forEach((ex, i) => {
                workoutList.innerHTML += `<li id="ex-${i}">${ex.name} (${ex.bodyPart} - ${ex.equipment}) - ${ex.duration} sec</li>`;
            });

            // Start first exercise
            currentTimeLeft = exercisesGlobal[0].duration;
            startExercise(currentExerciseIndex);
        })
        .catch(err => console.error("Error loading exercises:", err));
});

// Start or continue the current exercise
function startExercise(index){
    if(index >= exercisesGlobal.length) return;

    highlightCurrentExercise();
    timerElement.textContent = formatTime(currentTimeLeft);

    timerInterval = setInterval(() => {
        currentTimeLeft--;
        timerElement.textContent = formatTime(currentTimeLeft);

        if(currentTimeLeft <= 0){
            clearInterval(timerInterval);
            timerInterval = null;
            beepSound.play();
            currentExerciseIndex++;
            if(currentExerciseIndex < exercisesGlobal.length){
                currentTimeLeft = exercisesGlobal[currentExerciseIndex].duration;
                setTimeout(() => startExercise(currentExerciseIndex), 1000);
            }
        }
    }, 1000);
}

// Pause
pauseBtn.addEventListener("click", () => {
    if(timerInterval !== null){
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

// Resume
resumeBtn.addEventListener("click", () => {
    if(timerInterval === null && currentExerciseIndex < exercisesGlobal.length){
        startExercise(currentExerciseIndex);
    }
});

// Highlight current exercise
function highlightCurrentExercise(){
    exercisesGlobal.forEach((_, i) => {
        const li = document.getElementById(`ex-${i}`);
        if(li) li.style.fontWeight = i === currentExerciseIndex ? "bold" : "normal";
    });
}

// Format mm:ss
function formatTime(seconds){
    const m = Math.floor(seconds/60).toString().padStart(2,'0');
    const s = (seconds%60).toString().padStart(2,'0');
    return `${m}:${s}`;
}

// const generateBtn = document.getElementById("generateBtn");
// const workoutList = document.getElementById("workoutList");
// const timerElement = document.getElementById("timer");
// const beepSound = document.getElementById("beepSound");
// const pauseBtn = document.getElementById("pauseBtn");
// const resumeBtn = document.getElementById("resumeBtn");

// let timerInterval = null;
// let currentTimeLeft = 0;
// let currentExerciseIndex = 0;
// let exercisesGlobal = [];

// generateBtn.addEventListener("click", () => {
//     const selectedBodyParts = Array.from(document.querySelectorAll('input[name="bodypart"]:checked'))
//                                    .map(cb => cb.value);
//     const selectedEquipment = document.getElementById("equipment").value;

//     if(selectedBodyParts.length === 0){
//         workoutList.innerHTML = "<li>Please select at least one body part.</li>";
//         timerElement.textContent = "00:00";
//         return;
//     }

//     fetch("scripts/workout.json")
//         .then(res => res.json())
//         .then(data => {
//             const finalWorkout = [];

//             // Pick one exercise per selected body part + equipment
//             selectedBodyParts.forEach(bp => {
//                 let filtered;
//                 if(selectedEquipment === "" || selectedEquipment === "none") {
//                     filtered = data.filter(ex => ex.bodyPart === bp && ex.equipment === "none");
//                 } else {
//                     filtered = data.filter(ex => ex.bodyPart === bp && ex.equipment === selectedEquipment);
//                 }

//                 if(filtered.length > 0){
//                     const randomEx = filtered[Math.floor(Math.random() * filtered.length)];
//                     finalWorkout.push(randomEx);
//                 }
//             });

//             if(finalWorkout.length === 0){
//                 workoutList.innerHTML = "<li>No exercises found for this selection.</li>";
//                 timerElement.textContent = "00:00";
//                 return;
//             }

//             exercisesGlobal = finalWorkout;
//             currentExerciseIndex = 0;

//             // Display full workout plan
//             workoutList.innerHTML = "";
//             exercisesGlobal.forEach((ex, i) => {
//                 workoutList.innerHTML += `<li id="ex-${i}">${ex.name} (${ex.bodyPart} - ${ex.equipment}) - ${ex.duration} sec</li>`;
//             });

//             startExercise(currentExerciseIndex);
//         })
//         .catch(err => console.error("Error loading exercises:", err));
// });

// // Start or resume exercise
// function startExercise(index){
//     if(index >= exercisesGlobal.length){
//         timerElement.textContent = "00:00";
//         return;
//     }

//     const current = exercisesGlobal[index];
//     currentTimeLeft = current.duration;

//     highlightCurrentExercise();

//     timerElement.textContent = formatTime(currentTimeLeft);

//     timerInterval = setInterval(() => {
//         currentTimeLeft--;
//         timerElement.textContent = formatTime(currentTimeLeft);

//         if(currentTimeLeft <= 0){
//             clearInterval(timerInterval);
//             timerInterval = null;
//             beepSound.play();
//             currentExerciseIndex++;
//             setTimeout(() => startExercise(currentExerciseIndex), 1000);
//         }
//     }, 1000);
// }

// // Pause
// pauseBtn.addEventListener("click", () => {
//     if(timerInterval !== null){
//         clearInterval(timerInterval);
//         timerInterval = null;
//     }
// });

// // Resume
// resumeBtn.addEventListener("click", () => {
//     if(timerInterval === null && currentExerciseIndex < exercisesGlobal.length){
//         startExercise(currentExerciseIndex);
//     }
// });

// // Highlight current exercise
// function highlightCurrentExercise(){
//     exercisesGlobal.forEach((_, i) => {
//         const li = document.getElementById(`ex-${i}`);
//         if(li) li.style.fontWeight = i === currentExerciseIndex ? "bold" : "normal";
//     });
// }

// // Format mm:ss
// function formatTime(seconds){
//     const m = Math.floor(seconds/60).toString().padStart(2,'0');
//     const s = (seconds%60).toString().padStart(2,'0');
//     return `${m}:${s}`;
// }

