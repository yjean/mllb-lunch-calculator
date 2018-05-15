import {
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

import Amount from '../Amount';
import ErrorBoundary from '../ErrorBoundary';
import React from 'react';
import { evaluateRecipePrice } from '../helpers/Calculator';

const Recipe = ({ recipe, ingredients }) => (
  <Card>
    <CardBody>
      <CardTitle>
        {recipe.name} for {recipe.numberOfPersons} person(s)
      </CardTitle>
      <ul>
        {recipe.components.map((component, index) => (
          <Component
            key={index}
            component={component}
            ingredients={ingredients}
          />
        ))}
      </ul>
    </CardBody>
    <CardFooter>
      <Amount amount={evaluateRecipePrice(recipe, ingredients)} />
    </CardFooter>
  </Card>
);

const List = ({ recipes, ingredients }) => (
  <ul className="list-unstyled">
    {recipes.map(recipe => (
      <li key={recipe.id}>
        <Recipe key={recipe.id} recipe={recipe} ingredients={ingredients} />
      </li>
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

class RecipeForm extends React.Component {
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
    const hasComponents = this.state.components.length > 0;
    const currentUnit = this.state.currentIngredientId
      ? ingredients.find(
          i => i.id === parseInt(this.state.currentIngredientId, 10)
        ).unit
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
              <Component
                key={id}
                component={component}
                ingredients={ingredients}
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
            {ingredients.map(ingredient => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          {currentUnit && (
            <InputGroup>
              <Input
                name="quantity"
                placeholder="Enter a quantity"
                type="number"
                value={this.state.currentQuantity}
                onChange={e => this.onChange('currentQuantity', e)}
              />
              <InputGroupAddon addonType="append">
                {currentUnit}
              </InputGroupAddon>
            </InputGroup>
          )}
        </FormGroup>
        <Button onClick={this.addComponent}>Add ingredient</Button>
        <hr />
        <Button type="submit">Add recipe</Button>
      </Form>
    );
  }
}

class RecipesList extends React.Component {
  render() {
    const { recipes, ingredients, addRecipe } = this.props;

    return (
      <ErrorBoundary>
        <div className="RecipesPage">
          <Container>
            <h1>Recipes</h1>
            <Row>
              <Col md={8}>
                <List recipes={recipes} ingredients={ingredients} />
              </Col>
              <Col md={4}>
                <Card>
                  <CardHeader>Add a recipe</CardHeader>
                  <CardBody>
                    <RecipeForm
                      onSubmit={addRecipe}
                      nextId={recipes.length + 1}
                      ingredients={ingredients}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ErrorBoundary>
    );
  }
}

export default RecipesList;
