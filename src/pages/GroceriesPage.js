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

import ErrorBoundary from '../ErrorBoundary';
import GroceriesSummary from '../components/GroceriesSummary';
import React from 'react';

class CalculatorForm extends React.Component {
  state = {
    numberOfPersons: 25,
    recipeIds: [25, 2, 3]
  };

  onChange = (field, e) => {
    this.setState({ [field]: e.target.value });
  };

  onSelectChange = (field, e) => {
    const options = e.target.options;
    const selectedOptions = [...options].filter(({ selected }) => selected);

    this.setState({ [field]: selectedOptions.map(o => o.value) });
  };

  onSubmit = e => {
    e.preventDefault();
    const { recipeIds } = this.state;
    const ids = recipeIds.map(id => parseInt(id, 10));
    const recipes = this.props.recipes.filter(r => ids.includes(r.id));

    this.props.onSubmit({
      recipes,
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
            multiple={true}
            value={this.state.recipeIds}
            onChange={e => this.onSelectChange('recipeIds', e)}
          >
            <option value="">Select a recipe</option>
            {recipes.map(recipe => (
              <option key={recipe.id} value={recipe.id}>
                {recipe.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <div className="text-right">
          <Button>See</Button>
        </div>
      </Form>
    );
  }
}

class GroceriesPage extends React.Component {
  state = {
    recipes: [],
    numberOfPersons: 0
  };

  calculate = ({ recipes, numberOfPersons }) => {
    this.setState({
      recipes,
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
                {this.state.recipes.length > 0 && (
                  <GroceriesSummary
                    ingredients={ingredients}
                    recipes={this.state.recipes}
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
