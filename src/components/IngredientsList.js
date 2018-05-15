import { Button, ListGroup, ListGroupItem } from 'reactstrap';

import React from 'react';

const Ingredient = ({ ingredient, removeIngredient }) => (
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
    {ingredient.name} ${ingredient.price}/{ingredient.unit}{' '}
  </ListGroupItem>
);

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
