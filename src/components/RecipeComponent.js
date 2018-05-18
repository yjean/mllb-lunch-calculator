import { Alert, Button } from 'reactstrap';

import React from 'react';

const RecipeComponent = ({ component, ingredients, remove }) => {
  const id = parseInt(component.ingredientId, 10);
  const ingredient = ingredients.find(i => i.id === id);

  if (ingredient) {
    return (
      <li>
        {ingredient.name} {component.quantity}{' '}
        {component.unit || ingredient.unit}
        {remove && (
          <Button size="sm" color="danger" onClick={remove}>
            delete
          </Button>
        )}
      </li>
    );
  } else {
    return (
      <Alert color="danger">
        Ingredient with id <code>{component.ingredientId}</code> has been
        removed.
      </Alert>
    );
  }
};

export default RecipeComponent;
