const hamburger = document.querySelector('.hamburger');
const menuItems = document.querySelectorAll('.menu-items');

hamburger.addEventListener('click', () => {
    menuItems.forEach(item => item.classList.toggle('active'));
});


function showRecipe(recipeId) {
  fetch("scripts/dic.json")
    .then(res => res.json())
    .then(data => {
      const recipe = data.find(r => r.id == recipeId);//id given to the receipy in html
      if (!recipe) return;

      const modalContent = document.getElementById("modal-content");
      modalContent.innerHTML = `
        <h2>${recipe.name}</h2>
        
        <h4>Ingredients</h4>
        <ul>
          ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
        </ul>
        
        <h4>Steps</h4>
        <ol>
          ${recipe.steps.map(s => `<li>${s}</li>`).join("")}
        </ol>
        
        <h4>Nutrition Info</h4>
        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse; width:100%; text-align:left;">
          <thead>
            <tr style="background-color:#6B8E23; color:#fff;">
              <th>Nutrient</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(recipe.nutrition)
              .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
              .join("")}
          </tbody>
        </table>
      `;

      document.getElementById("recipe-modal").style.display = "block";//access to modal container that will show the recipe details.
      //Changes the CSS display property of the modal from none (hidden) to block (visible).Effectively makes the modal appear on the screen.
    });
}

function closeModal() {
  document.getElementById("recipe-modal").style.display = "none";//Changes the CSS display property to none.Effectively hides the modal from the screen.
}

function searchRecipes() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const allRecipes = document.querySelectorAll(".receipe, .receipef");

    allRecipes.forEach(recipe => {
        // Get title
        let titleElement = recipe.querySelector(".title") || recipe.querySelector(".titlef");
        const title = titleElement.textContent.toLowerCase();

        // Get category from parent div
        const category = recipe.parentElement.dataset.category.toLowerCase();

        // Show or hide
        if (title.includes(input) || category.includes(input)) {
            recipe.parentElement.style.display = "block";
        } else {
            recipe.parentElement.style.display = "none";
        }
    });
}
