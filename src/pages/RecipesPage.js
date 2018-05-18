import '../Recipe.css';

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

import Amount from '../Amount';
import ErrorBoundary from '../ErrorBoundary';
import React from 'react';
import RecipeComponent from '../components/RecipeComponent';
import RecipeForm from '../forms/RecipeForm';
import { evaluateRecipePrice } from '../helpers/Calculator';

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
    const {
      recipe,
      ingredients,
      updateRecipe,
      removeRecipe,
      editRecipe
    } = this.props;

    return (
      <Card className="Recipe">
        <CardHeader>
          <div className="float-right">
            <Button color="primary" onClick={() => editRecipe(recipe)}>
              edit
            </Button>
          </div>
          {recipe.name}
        </CardHeader>
        <CardBody>
          <CardTitle>For {recipe.numberOfPersons} person(s)</CardTitle>
          <Label>Ingredients:</Label>
          <ul>
            {recipe.components.map((component, index) => (
              <RecipeComponent
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

const List = ({
  recipes,
  ingredients,
  updateRecipe,
  editRecipe,
  removeRecipe
}) => (
  <ul className="list-unstyled">
    {recipes.map(recipe => (
      <li key={recipe.id}>
        <Recipe
          key={recipe.id}
          recipe={recipe}
          ingredients={ingredients}
          updateRecipe={updateRecipe}
          editRecipe={editRecipe}
          removeRecipe={removeRecipe}
        />
      </li>
    ))}
  </ul>
);

class RecipesList extends React.Component {
  state = { selectedRecipe: null };

  editRecipe = recipe => {
    this.setState({ selectedRecipe: recipe });
  };

  render() {
    const {
      recipes,
      ingredients,
      addRecipe,
      updateRecipe,
      removeRecipe
    } = this.props;
    const { selectedRecipe } = this.state;
    const header = selectedRecipe ? 'Edit recipe' : 'Add a recipe';

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
                  editRecipe={this.editRecipe}
                  updateRecipe={updateRecipe}
                  removeRecipe={removeRecipe}
                />
              </Col>
              <Col md={4}>
                <Card>
                  <CardHeader>{header}</CardHeader>
                  <CardBody>
                    <RecipeForm
                      onSubmit={selectedRecipe ? updateRecipe : addRecipe}
                      nextId={recipes.length + 1}
                      ingredients={ingredients}
                      recipe={selectedRecipe}
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
