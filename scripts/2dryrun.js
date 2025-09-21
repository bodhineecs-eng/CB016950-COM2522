function showRecipe(recipeId) {
  fetch("scripts/dic.json")
    .then(res => res.json())
    .then(data => {
      const recipe = data.find(r => r.id == recipeId);
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

      document.getElementById("recipe-modal").style.display = "block";
    });
}

function closeModal() {
  document.getElementById("recipe-modal").style.display = "none";
}
