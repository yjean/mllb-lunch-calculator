import './App.css';

import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import CalculatorPage from './pages/CalculatorPage';
import IngredientsPage from './pages/IngredientsPage';
import MainNavigation from './MainNavigation';
import RecipesPage from './pages/RecipesPage';
import slice from 'lodash/slice';

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

  persistState = () => {
    window.localStorage.setItem(
      'ingredients',
      JSON.stringify(this.state.ingredients)
    );
    window.localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  };

  addIngredient = ingredient => {
    this.setState(
      {
        ingredients: [...this.state.ingredients, ingredient]
      },
      this.persistState
    );
  };

  removeIngredient = ingredient => {
    const confirmed = window.confirm(`Confirm deletion of ${ingredient.name}?`);
    if (confirmed) {
      const index = this.state.ingredients.findIndex(
        i => i.id === ingredient.id
      );
      if (index > -1) {
        const ingredients = [
          ...slice(this.state.ingredients, 0, index),
          ...slice(this.state.ingredients, index + 1)
        ];

        this.setState({ ingredients }, this.persistState);
      }
    }
  };

  addRecipe = recipe =>
    this.setState(
      {
        recipes: [...this.state.recipes, recipe]
      },
      this.persistState
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
                  removeIngredient={this.removeIngredient}
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
