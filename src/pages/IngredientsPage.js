import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row
} from 'reactstrap';

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
            <option value="oz">Ounce (oz)</option>
          </Input>
        </FormGroup>
        <Button type="submit">Add</Button>
      </Form>
    );
  }
}

class IngredientsPage extends React.Component {
  render() {
    const { ingredients, addIngredient } = this.props;

    return (
      <div className="IngredientsPage">
        <Container>
          <h1>Ingredients</h1>
          <Row>
            <Col md={8}>
              <List ingredients={ingredients} />
            </Col>
            <Col md={4}>
              <IngredientForm
                onSubmit={addIngredient}
                nextId={ingredients.length + 1}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default IngredientsPage;
