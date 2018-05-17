import { Button, ListGroup, ListGroupItem } from 'reactstrap';

import React from 'react';

const Ingredient = ({ ingredient, removeIngredient }) => {
  const hasPrice = ingredient.price > 0;
  const hasUnit = ingredient.unit !== '';

  return (
    <ListGroupItem>
      <div className="float-right">
        <Button
          size="sm"
          color="danger"
          onClick={() => removeIngredient(ingredient)}
        >
          delete
        </Button>
      </div>
      {ingredient.name}{' '}
      {(hasPrice || hasUnit) && (
        <span>
          ${ingredient.price}/{ingredient.unit}
        </span>
      )}
    </ListGroupItem>
  );
};

const IngredientsList = ({ ingredients, removeIngredient }) => (
  <ListGroup>
    {ingredients.map(ingredient => (
      <Ingredient
        key={ingredient.id}
        ingredient={ingredient}
        removeIngredient={removeIngredient}
      />
    ))}
  </ListGroup>
);

export default IngredientsList;
