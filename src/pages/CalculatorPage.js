import React from 'react';
import { evaluateRecipePrice } from '../helpers/Calculator';

const Summary = ({ recipe, numberOfPersons, ingredients }) => {
  const recipePrice = evaluateRecipePrice(recipe, ingredients);

  return (
    <div className="Summary">
      <dl>
        <dt>Recipe price (for {recipe.numberOfPersons} persons)</dt>
        <dd>${recipePrice}</dd>
        <dt>For {numberOfPersons} persons</dt>
        <dd>${recipePrice * numberOfPersons / recipe.numberOfPersons}</dd>
      </dl>
    </div>
  );
};

class Form extends React.Component {
  state = {
    numberOfPersons: 0,
    recipeId: 0
  };

  onChange = (field, e) => {
    this.setState({ [field]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const recipeId = parseInt(this.state.recipeId, 10);
    const recipe = this.props.recipes.find(r => r.id === recipeId);

    this.props.onSubmit({
      recipe,
      numberOfPersons: this.state.numberOfPersons
    });
  };

  render() {
    const { recipes, ingredients } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="numberOfPersons"
          placeholder="Enter a number of persons"
          type="number"
          value={this.state.numberOfPersons}
          onChange={e => this.onChange('numberOfPersons', e)}
        />
        <select
          name="recipeId"
          value={this.state.recipeId}
          onChange={e => this.onChange('recipeId', e)}
        >
          <option value="">Select a recipe</option>
          {recipes.map(recipe => (
            <option key={recipe.id} value={recipe.id}>
              {recipe.name}
            </option>
          ))}
        </select>
      </form>
    );
  }
}

class CalculatorPage extends React.Component {
  state = {
    recipe: null,
    numberOfPersons: 0
  };

  calculate = ({ recipe, numberOfPersons }) => {
    this.setState({
      recipe,
      numberOfPersons
    });
  };

  render() {
    const { recipes, ingredients } = this.props;

    return (
      <div className="CalculatorPage">
        <Form
          recipes={recipes}
          ingredients={ingredients}
          onSubmit={this.calculate}
        />
        {this.state.recipe && (
          <Summary
            ingredients={ingredients}
            recipe={this.state.recipe}
            numberOfPersons={this.state.numberOfPersons}
          />
        )}
      </div>
    );
  }
}

export default CalculatorPage;
