import { Alert, Button, Col, Row } from 'reactstrap';

import React from 'react';

const RemoveComponent = ({ onClick }) => (
  <Button size="sm" color="danger" onClick={onClick} outline>
    X
  </Button>
);

const RecipeComponent = ({ component, ingredients, remove }) => {
  const id = parseInt(component.ingredientId, 10);
  const ingredient = ingredients.find(i => i.id === id);

  if (ingredient) {
    return (
      <li>
        <Row>
          <Col xs="9">
            {ingredient.name} {component.quantity}{' '}
            {component.unit || ingredient.unit}
          </Col>
          <Col xs="3">{remove && <RemoveComponent onClick={remove} />}</Col>
        </Row>
      </li>
    );
  } else {
    return (
      <li>
        <Row>
          <Col>
            <Alert color="danger">
              Ingredient with id <code>{component.ingredientId}</code> has been
              removed.
              {remove && <RemoveComponent onClick={remove} />}
            </Alert>
          </Col>
        </Row>
      </li>
    );
  }
};

export default RecipeComponent;
