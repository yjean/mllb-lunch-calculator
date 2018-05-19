import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';
import { evaluateRecipePrice, scaledQuantity } from '../helpers/Calculator';

import Amount from '../Amount';
import ErrorBoundary from '../ErrorBoundary';
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

const Summary = ({ recipe, numberOfPersons, ingredients }) => {
  const recipePrice = evaluateRecipePrice(recipe, ingredients);
  const peopleRatio = numberOfPersons / recipe.numberOfPersons;

  return (
    <Card className="Summary">
      <CardHeader>
        <h2>{recipe.name}</h2>
        Price: <Amount amount={recipePrice * peopleRatio} /> ({numberOfPersons}{' '}
        people)
      </CardHeader>
      <CardBody>
        <CardTitle>Ingredients for {numberOfPersons} people</CardTitle>
        <ListGroup>
          {recipe.components.map((component, index) => (
            <GroceryComponent
              key={index}
              ratio={peopleRatio}
              component={component}
              ingredient={ingredients.find(
                i => i.id === parseInt(component.ingredientId, 10)
              )}
            />
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

class CalculatorForm extends React.Component {
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
    const { recipes } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
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
        <FormGroup>
          <Input
            type="select"
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
          </Input>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

class GroceriesPage extends React.Component {
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
      <ErrorBoundary>
        <div className="GroceriesPage">
          <Container>
            <h1>Groceries calculator</h1>
            <Row>
              <Col md={8}>
                {this.state.recipe && (
                  <Summary
                    ingredients={ingredients}
                    recipe={this.state.recipe}
                    numberOfPersons={this.state.numberOfPersons}
                  />
                )}
              </Col>
              <Col md={4}>
                <Card>
                  <CardHeader>Evaluate</CardHeader>
                  <CardBody>
                    <CalculatorForm
                      recipes={recipes}
                      ingredients={ingredients}
                      onSubmit={this.calculate}
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

export default GroceriesPage;
