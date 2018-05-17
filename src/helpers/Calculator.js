export function evaluateIngredientPrice(
  ingredient,
  quantity,
  unit = ingredient.unit
) {
  if (unit === '') {
    unit = ingredient.unit;
  }
  if (ingredient) {
    const price = parseFloat(ingredient.price.replace(',', '.'), 10);
    // if we don't have a valid price, let's deal with a NaN
    if (isNaN(price)) {
      return 0;
    }
    return scaledQuantity(quantity, unit, ingredient.unit) * price;
  }

  return 0;
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
  lbs: 0.0022,
  ml: 0.96,
  l: 0.00096,
  oz: 0.035,
  tsp: 0.203,
  tbsp: 0.0676
};

function scaledQuantity(quantity, fromUnit, toUnit) {
  const ratio = GRAM_RATIOS[fromUnit] || 1;
  const inGram = quantity * 1 / ratio;

  return inGram * (GRAM_RATIOS[toUnit] || 1);
}
