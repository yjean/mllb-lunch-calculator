import { Button, Form, FormGroup, Input } from 'reactstrap';

import React from 'react';

const initialFormState = {
  name: '',
  price: '',
  unit: ''
};

class IngredientForm extends React.Component {
  state = initialFormState;

  onChange = (field, e) => this.setState({ [field]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state, id: this.props.nextId });
    this.setState(initialFormState);
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Input
            name="name"
            placeholder="Enter a name"
            type="text"
            value={this.state.name}
            onChange={e => this.onChange('name', e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            name="price"
            placeholder="Enter a price"
            type="text"
            value={this.state.price}
            onChange={e => this.onChange('price', e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="select"
            name="unit"
            value={this.state.unit}
            onChange={e => this.onChange('unit', e)}
          >
            <option value="">Select a unit</option>
            <option value="gr">Gramme (gr)</option>
            <option value="lbs">Pound (lbs)</option>
            <option value="ml">Milliliter (ml)</option>
            <option value="l">Liter (L)</option>
            <option value="oz">Ounce (oz)</option>
            <option value="unit">Unit</option>
            <option value="tsp">Teaspoon</option>
            <option value="tbsp">Tablespoon</option>
          </Input>
        </FormGroup>
        <Button type="submit">Add</Button>
      </Form>
    );
  }
}

export default IngredientForm;
