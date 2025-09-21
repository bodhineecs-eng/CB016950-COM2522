document.addEventListener('DOMContentLoaded', () => {
  console.log('GreenBite script: DOMContentLoaded');

  const texts = [
    "Wellness is a journey, not a goal.",
    "Great journeys are made with brave steps, even if the world doesn’t see them yet.",
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

  let textOverElement = document.querySelector('.textOver');

  if (!textOverElement) {
    console.error('No element with class .textOver found in the DOM. Creating fallback element.');
    const imgCont = document.querySelector('.image-container');
    if (imgCont) {
      textOverElement = document.createElement('div');
      textOverElement.className = 'textOver';
      imgCont.appendChild(textOverElement);
    } else {
      console.error('No .image-container found either. Aborting slogan rotation.');
      return;
    }
  }

  let currentIndex = 0;
  const fadeTime = 250; // ms (matching CSS transition)
  const intervalMs = 6000; // <- change this to 60000 for 1 minute live site

  // show initial text immediately
  textOverElement.textContent = texts[currentIndex];
  currentIndex = (currentIndex + 1) % texts.length;

  function changeText() {
    // fade out (via style)
    textOverElement.style.opacity = 0;
    textOverElement.style.transform = 'translateY(6px)';

    setTimeout(() => {
      textOverElement.textContent = texts[currentIndex];
      // fade in
      textOverElement.style.opacity = 1;
      textOverElement.style.transform = 'translateY(0)';
      currentIndex = (currentIndex + 1) % texts.length;
    }, fadeTime);
  }

  // start rotating
  const timerId = setInterval(changeText, intervalMs);

  // expose for debugging from console if needed:
  window.__greenBite = { stop: () => clearInterval(timerId), start: () => setInterval(changeText, intervalMs) };

  console.log('Slogan rotation started. Interval (ms):', intervalMs);
});
