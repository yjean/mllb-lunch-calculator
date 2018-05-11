import React from 'react';

const Ingredient = ({ ingredient }) => (
  <li>
    {ingredient.name} ${ingredient.price}/{ingredient.unit}
  </li>
);

const List = ({ ingredients }) => (
  <ul>
    {ingredients.map(ingredient => (
      <Ingredient key={ingredient.id} ingredient={ingredient} />
    ))}
  </ul>
);

const initialFormState = {
  name: '',
  price: '',
  unit: ''
};

class Form extends React.Component {
  state = initialFormState;

  onChange = (field, e) => this.setState({ [field]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state, id: this.props.nextId });
    this.setState(initialFormState);
  };

  render() {
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
          name="price"
          placeholder="Enter a price"
          type="text"
          value={this.state.price}
          onChange={e => this.onChange('price', e)}
        />
        <select
          name="unit"
          value={this.state.unit}
          onChange={e => this.onChange('unit', e)}
        >
          <option value="">Select a unit</option>
          <option value="gr">Gramme</option>
          <option value="lbs">Pound</option>
          <option value="ml">Milliliter</option>
          <option value="oz">Ounce</option>
        </select>
        <button type="submit" onClick={this.onSubmit}>
          Add
        </button>
      </form>
    );
  }
}

class IngredientsPage extends React.Component {
  render() {
    const { ingredients, addIngredient } = this.props;

    return (
      <div className="IngredientsPage">
        <Form onSubmit={addIngredient} nextId={ingredients.length + 1} />
        <List ingredients={ingredients} />
      </div>
    );
  }
}

export default IngredientsPage;
