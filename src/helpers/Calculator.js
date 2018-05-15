export function evaluateIngredientPrice(
  ingredient,
  quantity,
  unit = ingredient.unit
) {
  return scaledQuantity(quantity, unit, ingredient.unit) * ingredient.price;
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
        sum +
        evaluateIngredientPrice(
          component.ingredient,
          component.quantity,
          component.unit
        ),
      0
    );
}

const GRAM_RATIOS = {
  gr: 1,
  lbs: 0.0022,
  ml: 0.96,
  l: 0.00096,
  oz: 0.035,
  tsp: 0.203,
  tbsp: 0.0676
};

function scaledQuantity(quantity, fromUnit, toUnit) {
  const ratio = GRAM_RATIOS[fromUnit] || 1;
  if (ratio === 1) {
    return quantity;
  }
  const inGram = quantity * 1 / ratio;

  return inGram * GRAM_RATIOS[toUnit];
}
