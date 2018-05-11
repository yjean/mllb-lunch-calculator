export function evaluateIngredientPrice(ingredient, quantity) {
  return quantity * ingredient.price;
}

export function evaluateRecipePrice(recipe, ingredients) {
  return recipe.components
    .map(c => {
      const id = parseInt(c.ingredientId, 10);
      return {
        ...c,
        ingredient: ingredients.find(i => i.id === id)
      };
    })
    .reduce(
      (sum, component) =>
        sum + evaluateIngredientPrice(component.ingredient, component.quantity),
      0
    );
}
