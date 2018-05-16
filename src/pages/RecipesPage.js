import '../Recipe.css';

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
import { UNITS } from '../forms/IngredientForm';
import { evaluateRecipePrice } from '../helpers/Calculator';
import sortBy from 'lodash/sortBy';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.recipe
    };
  }

  notesChanged = event => {
    this.setState({ notes: event.target.value });
  };

  render() {
    const { recipe, ingredients, updateRecipe, removeRecipe } = this.props;

    return (
      <Card className="Recipe">
        <CardBody>
          <CardTitle>
            {recipe.name} for {recipe.numberOfPersons} person(s)
          </CardTitle>
          <Label>Ingredients:</Label>
          <ul>
            {recipe.components.map((component, index) => (
              <Component
                key={index}
                component={component}
                ingredients={ingredients}
              />
            ))}
          </ul>
          <Label>Notes:</Label>
          <Input
            type="textarea"
            rows="15"
            value={this.state.notes}
            onChange={this.notesChanged}
          />
        </CardBody>
        <CardFooter>
          <Row>
            <Col>
              Price:{' '}
              <Amount amount={evaluateRecipePrice(recipe, ingredients)} />
            </Col>
            <Col className="text-right">
              <Button onClick={() => updateRecipe(this.state)}>Save</Button>{' '}
              <Button color="danger" onClick={() => removeRecipe(recipe)}>
                Delete
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

const List = ({ recipes, ingredients, updateRecipe, removeRecipe }) => (
  <ul className="list-unstyled">
    {recipes.map(recipe => (
      <li key={recipe.id}>
        <Recipe
          key={recipe.id}
          recipe={recipe}
          ingredients={ingredients}
          updateRecipe={updateRecipe}
          removeRecipe={removeRecipe}
        />
      </li>
    ))}
  </ul>
);

const Component = ({ component, ingredients }) => {
  const id = parseInt(component.ingredientId, 10);
  const ingredient = ingredients.find(i => i.id === id);

  return (
    <li>
      {ingredient.name} {component.quantity} {component.unit || ingredient.unit}
    </li>
  );
};

const initialFormState = {
  name: '',
  numberOfPersons: 0,
  components: [],
  currentIngredientId: '',
  currentQuantity: 0,
  currentUnit: ''
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
        <Button type="submit">Add recipe</Button>
      </Form>
    );
  }
}

class RecipesList extends React.Component {
  render() {
    const {
      recipes,
      ingredients,
      addRecipe,
      updateRecipe,
      removeRecipe
    } = this.props;

    return (
      <ErrorBoundary>
        <div className="RecipesPage">
          <Container>
            <h1>Recipes</h1>
            <Row>
              <Col md={8}>
                <List
                  recipes={recipes}
                  ingredients={ingredients}
                  updateRecipe={updateRecipe}
                  removeRecipe={removeRecipe}
                />
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
