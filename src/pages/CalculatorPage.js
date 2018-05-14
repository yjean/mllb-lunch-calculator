import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';

import Amount from '../Amount';
import React from 'react';
import { evaluateRecipePrice } from '../helpers/Calculator';

const Summary = ({ recipe, numberOfPersons, ingredients }) => {
  const recipePrice = evaluateRecipePrice(recipe, ingredients);

  return (
    <div className="Summary">
      <dl>
        <dt>Recipe price (for {recipe.numberOfPersons} persons)</dt>
        <dd>
          <Amount amount={recipePrice} />
        </dd>
        <dt>For {numberOfPersons} persons</dt>
        <dd>
          <Amount
            amount={recipePrice * numberOfPersons / recipe.numberOfPersons}
          />
        </dd>
      </dl>
    </div>
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
    const { recipes, ingredients } = this.props;

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
        <Container>
          <h1>Calculator</h1>
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
    );
  }
}

export default CalculatorPage;
