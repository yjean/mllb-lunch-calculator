import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row
} from 'reactstrap';

import React from 'react';
import RecipeComponent from '../components/RecipeComponent';
import { UNITS } from './IngredientForm';
import slice from 'lodash/slice';
import sortBy from 'lodash/sortBy';

const initialFormState = {
  id: 0,
  name: '',
  numberOfPersons: 0,
  components: [],
  currentIngredientId: '',
  currentQuantity: 0,
  currentUnit: ''
};

class RecipeForm extends React.Component {
  state = initialFormState;

  componentWillReceiveProps(props) {
    if (props.recipe) {
      this.setState({ ...props.recipe });
    }
  }

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
    const id = this.state.id || this.props.nextId;
    this.props.onSubmit({ ...this.state, id });
    this.setState(initialFormState);
  };

  addComponent = e => {
    e.preventDefault();

    const component = {
      ingredientId: this.state.currentIngredientId,
      quantity: this.state.currentQuantity,
      unit: this.state.currentUnit
    };
    this.setState({
      components: [...this.state.components, component],
      currentIngredientId: '',
      currentUnit: '',
      currentQuantity: 0
    });
  };

  removeComponent = index => {
    this.setState({
      components: [
        ...slice(this.state.components, 0, index),
        ...slice(this.state.components, index + 1)
      ]
    });
  };

  render() {
    const { ingredients } = this.props;
    const currentIngredientId = parseInt(this.state.currentIngredientId, 10);
    const hasComponents = this.state.components.length > 0;
    const curretIngredient =
      currentIngredientId > 0
        ? ingredients.find(i => i.id === currentIngredientId)
        : null;

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
          <Label>Number of persons:</Label>
          <Input
            name="numberOfPersons"
            placeholder="Enter a number of persons"
            type="number"
            value={this.state.numberOfPersons}
            onChange={e => this.onChange('numberOfPersons', e)}
          />
        </FormGroup>
        <Label>Ingredients:</Label>
        {hasComponents && (
          <ul>
            {this.state.components.map((component, id) => (
              <RecipeComponent
                key={id}
                component={component}
                ingredients={ingredients}
                remove={() => this.removeComponent(id)}
              />
            ))}
          </ul>
        )}
        <FormGroup>
          <Input
            type="select"
            name="ingredientId"
            value={this.state.currentIngredientId}
            onChange={e => this.onChange('currentIngredientId', e)}
          >
            <option value="">Select an ingredient</option>
            {sortBy(ingredients, 'name').map(ingredient => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          {curretIngredient && (
            <InputGroup>
              <Input
                name="quantity"
                placeholder="Enter a quantity"
                type="number"
                value={this.state.currentQuantity}
                onChange={e => this.onChange('currentQuantity', e)}
              />
              <InputGroupAddon addonType="append">
                <Input
                  type="select"
                  name="ingredientId"
                  value={this.state.currentUnit || curretIngredient.unit}
                  onChange={e => this.onChange('currentUnit', e)}
                >
                  {Object.keys(UNITS).map(value => (
                    <option key={value} value={value}>
                      {UNITS[value]}
                    </option>
                  ))}
                </Input>
              </InputGroupAddon>
            </InputGroup>
          )}
        </FormGroup>
        <Button onClick={this.addComponent}>Add ingredient</Button>
        <hr />
        <Button type="submit">Save</Button>
      </Form>
    );
  }
}

export default RecipeForm;
