import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Table
} from 'reactstrap';
import {
  evaluateIngredientPrice,
  evaluateRecipePrice,
  scaledQuantity
} from '../helpers/Calculator';

import Amount from '../Amount';
import Quantity from '../components/Quantity';
import React from 'react';

const GroceryComponent = ({ ratio, component, ingredient }) => (
  <ListGroupItem>
    {ingredient.name}{' '}
    <Quantity
      q={scaledQuantity(
        component.quantity * ratio,
        component.unit || ingredient.unit,
        ingredient.unit
      )}
    />{' '}
    {ingredient.unit}
  </ListGroupItem>
);

class GroceriesSummary extends React.Component {
  cart = {};

  componentWillReceiveProps() {
    this.cart = {};
  }

  addRecipeToCart = (recipe, ratio) => {
    recipe.components.forEach(component => {
      const ingredientId = parseInt(component.ingredientId, 10);
      const ingredient = this.props.ingredients.find(
        i => i.id === ingredientId
      );
      const quantity = scaledQuantity(
        component.quantity * ratio,
        component.unit || ingredient.unit,
        ingredient.unit
      );

      this.cart[ingredientId] = this.cart[ingredientId] || 0;
      this.cart[ingredientId] += quantity;
    });
  };

  render() {
    const { recipes, numberOfPersons, ingredients } = this.props;
    recipes.forEach(recipe =>
      this.addRecipeToCart(recipe, numberOfPersons / recipe.numberOfPersons)
    );
    let cartPrice = 0;

    return (
      <Table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.cart).map(ingredientId => {
            const id = parseInt(ingredientId, 10);
            const ingredient = ingredients.find(i => i.id === id);
            const quantity = this.cart[ingredientId];
            const price = evaluateIngredientPrice(ingredient, quantity);
            cartPrice += price;

            return (
              <tr key={ingredientId}>
                <td>{ingredient.name}</td>
                <td>
                  <Quantity q={this.cart[ingredientId]} /> {ingredient.unit}
                </td>
                <td className="text-right">
                  <Amount amount={price} />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="text-right">
              <Amount amount={cartPrice} />
            </td>
          </tr>
        </tfoot>
      </Table>
    );
  }
}

export default GroceriesSummary;
