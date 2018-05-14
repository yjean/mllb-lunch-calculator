import './App.css';

import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import CalculatorPage from './pages/CalculatorPage';
import IngredientsPage from './pages/IngredientsPage';
import MainNavigation from './MainNavigation';
import RecipesPage from './pages/RecipesPage';

class App extends Component {
  constructor(props) {
    super(props);

    const localIngredients = window.localStorage.getItem('ingredients');
    const localRecipes = window.localStorage.getItem('recipes');

    this.state = {
      ingredients: localIngredients ? JSON.parse(localIngredients) : [],
      recipes: localRecipes ? JSON.parse(localRecipes) : []
    };
  }

  addIngredient = ingredient => {
    console.log(ingredient);
    this.setState(
      {
        ingredients: [...this.state.ingredients, ingredient]
      },
      _ => {
        window.localStorage.setItem(
          'ingredients',
          JSON.stringify(this.state.ingredients)
        );
      }
    );
  };

  addRecipe = recipe =>
    this.setState(
      {
        recipes: [...this.state.recipes, recipe]
      },
      _ => {
        window.localStorage.setItem(
          'recipes',
          JSON.stringify(this.state.recipes)
        );
      }
    );

  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <MainNavigation />
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
