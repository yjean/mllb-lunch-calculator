import './App.css';

import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';

import CalculatorPage from './pages/CalculatorPage';
import IngredientsPage from './pages/IngredientsPage';
import RecipesPage from './pages/RecipesPage';
import logo from './logo.svg';

class App extends Component {
  state = {
    ingredients: [
      { id: 1, name: 'Tomates', unit: 'lbs', price: 0.42 },
      { id: 2, name: 'Jus de fruits', unit: 'oz', price: 1.42 }
    ],
    recipes: [
      {
        id: 1,
        name: 'Test melange',
        numberOfPersons: 3,
        components: [
          {
            ingredientId: 1,
            quantity: 2
          },
          {
            ingredientId: 2,
            quantity: 64
          }
        ]
      }
    ]
  };

  addIngredient = ingredient => {
    console.log(ingredient);
    this.setState({
      ingredients: [...this.state.ingredients, ingredient]
    });
  };

  addRecipe = recipe =>
    this.setState({
      recipes: [...this.state.recipes, recipe]
    });

  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <ul>
              <li>
                <Link to="/">Calculator</Link>
              </li>
              <li>
                <Link to="/ingredients">Ingredients</Link>
              </li>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
            </ul>
            <hr />
            <Route
              exact
              path="/"
              component={() => (
                <CalculatorPage
                  recipes={this.state.recipes}
                  ingredients={this.state.ingredients}
                />
              )}
            />
            <Route
              path="/ingredients"
              component={() => (
                <IngredientsPage
                  ingredients={this.state.ingredients}
                  addIngredient={this.addIngredient}
                />
              )}
            />
            <Route
              path="/recipes"
              component={() => (
                <RecipesPage
                  recipes={this.state.recipes}
                  ingredients={this.state.ingredients}
                  addRecipe={this.addRecipe}
                />
              )}
            />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
