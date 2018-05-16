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

  remove = (element, collection) => {
    const confirmed = window.confirm(`Confirm deletion of ${element.name}?`);
    if (confirmed) {
      const index = this.state[collection].findIndex(i => i.id === element.id);
      if (index > -1) {
        const elements = [
          ...slice(this.state[collection], 0, index),
          ...slice(this.state[collection], index + 1)
        ];

        this.setState({ [collection]: elements }, this.persistState);
      }
    }
  };

  removeIngredient = ingredient => {
    this.remove(ingredient, 'ingredients');
  };

  addRecipe = recipe =>
    this.setState(
      {
        recipes: [...this.state.recipes, recipe]
      },
      this.persistState
    );

  updateRecipe = recipe => {
    const recipeIndex = this.state.recipes.findIndex(r => r.id === recipe.id);
    if (recipeIndex > -1) {
      console.log(recipe);
      const recipes = [
        ...slice(this.state.recipes, 0, recipeIndex),
        recipe,
        ...slice(this.state.recipes, recipeIndex + 1)
      ];

      this.setState({ recipes }, this.persistState);
    }
  };

  removeRecipe = recipe => {
    this.remove(recipe, 'recipes');
  };

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
                  updateRecipe={this.updateRecipe}
                  removeRecipe={this.removeRecipe}
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
