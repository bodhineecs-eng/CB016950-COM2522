document.addEventListener('DOMContentLoaded', () => {
  console.log('GreenBite script: DOMContentLoaded');//prints a message in the browser console for debugging

  const texts = [
    "Wellness is a journey, not a goal.",
    "Believe. Act. Achieve.",
    "You were born to rise.",
    "Healthy choices, healthy life",
    "Strong body, strong mind.",
    "Get Moving, Stay Healthy!",
    "Push Your Limits!",
    "Consistency is Key!",
    "Fitness for Life!",
    "Nourish your body, fuel your life.",
    "Your health is an investment, not an expense.",
    "Progress, not perfection.",
    "Every day is a chance to become healthier.",
    "Eat well, live well, be well."
  ];

  let textOverElement = document.querySelector('.textOver');//Looks for the element with class .textOver in the DOM

  //If .textOver doesn’t exist, it tries to create one inside .image-container.

  //If there’s no .image-container, it stops and logs an error.
  if (!textOverElement) {
    console.error('No element with class .textOver found in the DOM. Creating fallback element.');
    const imgCont = document.querySelector('.image-container');
    if (imgCont) {
      textOverElement = document.createElement('div'); //creating the dom element
      textOverElement.className = 'textOver'; //give the class name
      imgCont.appendChild(textOverElement);
    } else {
      console.error('No .image-container found either. Aborting slogan rotation.');
      return;
    }
  }

  let currentIndex = 0; //tracks which slogan to display.
  const fadeTime = 250; // ms (matching CSS transition)
  const intervalMs = 6000; // <- change this to 60000 for 1 minute live site

  // show initial text immediately
  textOverElement.textContent = texts[currentIndex];//Sets the first slogan immediately.
  currentIndex = (currentIndex + 1) % texts.length; //Increments currentIndex, using % texts.length to loop back to the start.

  function changeText() {
    // fade out (via style)
    textOverElement.style.opacity = 0;
    textOverElement.style.transform = 'translateY(6px)';//makes the text disappear and move slightly down

    setTimeout(() => {
      textOverElement.textContent = texts[currentIndex];
      // fade in
      textOverElement.style.opacity = 1;
      textOverElement.style.transform = 'translateY(0)';//updates the text, fades it in, and resets position
      currentIndex = (currentIndex + 1) % texts.length;
    }, fadeTime);
  }

  // start rotating
  const timerId = setInterval(changeText, intervalMs);//Calls changeText() every intervalMs milliseconds (6 seconds here).

  // expose for debugging from console if needed:
  window.__greenBite = { stop: () => clearInterval(timerId), start: () => setInterval(changeText, intervalMs) };//window.__greenBite.stop() → stops the rotation
//window.__greenBite.start() → starts rotation again

  console.log('Slogan rotation started. Interval (ms):', intervalMs);//Prints a confirmation that the slogan rotation is running.
});

const hamburger = document.getElementById('hamburger');
const menuBar = document.querySelector('.menu-bar');

hamburger.addEventListener('click', () => {
    menuBar.classList.toggle('show');
});

// Daily tip rotation system
const tips = [
    "Drink 8 glasses of water daily to stay hydrated!",
    "Get at least 7-8 hours of sleep each night.",
    "Include protein in every meal for sustained energy.",
    "Take a 10-minute walk after meals for better digestion.",
    "Practice deep breathing for 5 minutes to reduce stress.",
    "Eat at least 5 servings of fruits and vegetables daily.",
    "Limit processed foods and opt for whole foods instead.",
    "Stretch for 10 minutes every morning to improve flexibility.",
    "Take breaks from screens every hour to protect your eyes.",
    "Practice gratitude by writing down 3 things you're thankful for."
];

function getDailyTip() {
    // Get today's date as a unique identifier
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    // Use the day of year to select a tip (cycles through all tips)
    const tipIndex = dayOfYear % tips.length;
    return tips[tipIndex];
}

// Set the daily tip
document.getElementById('tipOfTheDay').textContent = getDailyTip();
