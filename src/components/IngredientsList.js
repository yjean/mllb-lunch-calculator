import './IngredientsList.css';

import {
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import React from 'react';

const Ingredient = ({ ingredient, removeIngredient, editIngredient }) => {
  const hasPrice = ingredient.price > 0;
  const hasUnit = ingredient.unit !== '';

  return (
    <ListGroupItem>
      <div className="float-right">
        <ButtonGroup>
          <Button onClick={() => editIngredient(ingredient)}>edit</Button>
          <Button color="danger" onClick={() => removeIngredient(ingredient)}>
            delete
          </Button>
        </ButtonGroup>
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
  state = { pattern: '' };

  setPattern = ({ target }) => this.setState({ pattern: target.value });
  resetPattern = () => this.setPattern({ target: { value: '' } });

  render() {
    const { ingredients, removeIngredient, editIngredient } = this.props;
    const filteredList = this.state.pattern
      ? ingredients.filter(i =>
          i.name.match(new RegExp(this.state.pattern, 'i'))
        )
      : ingredients;

    return (
      <div className="IngredientsList">
        <InputGroup className="IngredientsList__pattern">
          <Input
            type="text"
            placeholder="Search by name"
            value={this.state.pattern}
            onChange={this.setPattern}
          />
          <InputGroupAddon
            className="gl_clickable"
            addonType="append"
            onClick={this.resetPattern}
          >
            X
          </InputGroupAddon>
        </InputGroup>
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
