import '../Recipe.css';

import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Collapse,
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
      ...props.recipe,
      collapsed: true
    };
  }

  notesChanged = event => {
    this.setState({ notes: event.target.value });
  };

  toggleCollapsed = () => this.setState({ collapsed: !this.state.collapsed });

  render() {
    const {
      recipe,
      ingredients,
      updateRecipe,
      removeRecipe,
      editRecipe
    } = this.props;

    return (
      <Card
        className={`Recipe Recipe--${
          this.state.collapsed ? 'collapsed' : 'expanded'
        }`}
      >
        <CardHeader className="Recipe__header">
          <Row>
            <Col>
              <h2>{recipe.name}</h2>
              Price:{' '}
              <Amount amount={evaluateRecipePrice(recipe, ingredients)} /> ({
                recipe.numberOfPersons
              }{' '}
              people)
            </Col>
            <Col className="text-right">
              <ButtonGroup>
                <Button color="info" onClick={this.toggleCollapsed}>
                  {this.state.collapsed ? 'Show' : 'Hide'}
                </Button>
                <Button onClick={() => editRecipe(recipe)}>Edit</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </CardHeader>
        <Collapse isOpen={!this.state.collapsed}>
          <CardBody className="Recipe__body">
            <CardTitle>
              Ingredients for {recipe.numberOfPersons} people
            </CardTitle>
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
          <CardFooter className="Recipe__footer">
            <Row>
              <Col className="text-right">
                <Button onClick={() => updateRecipe(this.state)}>Save</Button>{' '}
                <Button color="danger" onClick={() => removeRecipe(recipe)}>
                  Delete
                </Button>
              </Col>
            </Row>
          </CardFooter>
        </Collapse>
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
  state = { selectedRecipe: null, pattern: '' };

  editRecipe = recipe => {
    this.setState({ selectedRecipe: recipe });
  };
  setPattern = ({ target }) => this.setState({ pattern: target.value });
  resetPattern = () => this.setPattern({ target: { value: '' } });

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
    const filteredList = this.state.pattern
      ? recipes.filter(r => r.name.match(new RegExp(this.state.pattern, 'i')))
      : recipes;

    return (
      <ErrorBoundary>
        <div className="RecipesPage">
          <Container>
            <h1>Recipes</h1>
            <Row>
              <Col md={8}>
                <InputGroup className="IngredientsList__pattern">
                  <Input
                    type="text"
                    placeholder="Search by name"
                    value={this.state.pattern}
                    onChange={this.setPattern}
                  />
                  <InputGroupAddon
                    className="gl_clickable"
                    addonType="append"
                    onClick={this.resetPattern}
                  >
                    X
                  </InputGroupAddon>
                </InputGroup>

                <List
                  recipes={filteredList}
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
                      nextId={(max(map(recipes, 'id')) || 0) + 1}
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
