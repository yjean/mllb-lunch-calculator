import { Button, Input, ListGroup, ListGroupItem } from 'reactstrap';

import React from 'react';

const Ingredient = ({ ingredient, removeIngredient, editIngredient }) => {
  const hasPrice = ingredient.price > 0;
  const hasUnit = ingredient.unit !== '';

  return (
    <ListGroupItem>
      <div className="float-right">
        <Button
          size="sm"
          color="primary"
          onClick={() => editIngredient(ingredient)}
        >
          edit
        </Button>
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

class IngredientsList extends React.Component {
  state = { pattern: null };

  setPattern = ({ target }) => this.setState({ pattern: target.value });

  render() {
    const { ingredients, removeIngredient, editIngredient } = this.props;
    const filteredList = this.state.pattern
      ? ingredients.filter(i =>
          i.name.match(new RegExp(this.state.pattern, 'i'))
        )
      : ingredients;

    return (
      <div className="IngredientsList">
        <p>
          <Input
            type="text"
            placeholder="Search by name"
            value={this.state.pattern}
            onChange={this.setPattern}
          />
        </p>
        <ListGroup>
          {filteredList.map(ingredient => (
            <Ingredient
              key={ingredient.id}
              ingredient={ingredient}
              editIngredient={editIngredient}
              removeIngredient={removeIngredient}
            />
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default IngredientsList;
