import React from 'react';
import { evaluateRecipePrice } from '../helpers/Calculator';

const Recipe = ({ recipe, ingredients }) => (
  <li>
    {recipe.name} for {recipe.numberOfPersons} person(s)
    <ul>
      {recipe.components.map((component, index) => (
        <Component
          key={index}
          component={component}
          ingredients={ingredients}
        />
      ))}
    </ul>
    ${evaluateRecipePrice(recipe, ingredients)}
  </li>
);

const List = ({ recipes, ingredients }) => (
  <ul>
    {recipes.map(recipe => (
      <Recipe key={recipe.id} recipe={recipe} ingredients={ingredients} />
    ))}
  </ul>
);

const Component = ({ component, ingredients }) => {
  const id = parseInt(component.ingredientId, 10);
  const ingredient = ingredients.find(i => i.id === id);

  return (
    <li>
      {ingredient.name} {component.quantity} {ingredient.unit}
    </li>
  );
};

const initialFormState = {
  name: '',
  numberOfPersons: 0,
  components: [],
  currentIngredientId: '',
  currentQuantity: 0
};

class Form extends React.Component {
  state = initialFormState;

  onChange = (field, e) => {
    this.setState({ [field]: e.target.value });
  };

  onSelectChange = (field, e) => {
    const selection = Array.prototype.map.call(
      e.target.selectedOptions,
      opt => opt.value
    );
    this.setState({ [field]: selection });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state, id: this.props.nextId });
    this.setState(initialFormState);
  };

  addComponent = e => {
    e.preventDefault();

    const component = {
      ingredientId: this.state.currentIngredientId,
      quantity: this.state.currentQuantity
    };
    this.setState({
      components: [...this.state.components, component],
      currentIngredientId: '',
      currentQuantity: 0
    });
  };

  render() {
    const { ingredients } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="name"
          placeholder="Enter a name"
          type="text"
          value={this.state.name}
          onChange={e => this.onChange('name', e)}
        />
        <input
          name="numberOfPersons"
          placeholder="Enter a number of persons"
          type="number"
          value={this.state.numberOfPersons}
          onChange={e => this.onChange('numberOfPersons', e)}
        />
        <ul>
          {this.state.components.map((component, id) => (
            <Component component={component} ingredients={ingredients} />
          ))}
        </ul>
        <select
          name="ingredientId"
          value={this.state.currentIngredientId}
          onChange={e => this.onChange('currentIngredientId', e)}
        >
          <option value="">Select an ingredient</option>
          {ingredients.map(ingredient => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </select>
        <input
          name="quantity"
          placeholder="Enter a quantity"
          type="number"
          value={this.state.currentQuantity}
          onChange={e => this.onChange('currentQuantity', e)}
        />
        <button onClick={this.addComponent}>Add component</button>
        <button type="submit" onClick={this.onSubmit}>
          Add recipe
        </button>
      </form>
    );
  }
}

class RecipesList extends React.Component {
  render() {
    const { recipes, ingredients, addRecipe } = this.props;

    return (
      <div className="RecipesPage">
        <Form
          onSubmit={addRecipe}
          nextId={recipes.length + 1}
          ingredients={ingredients}
        />
        <List recipes={recipes} ingredients={ingredients} />
      </div>
    );
  }
}

export default RecipesList;
