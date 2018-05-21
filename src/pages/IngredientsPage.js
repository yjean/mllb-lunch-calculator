import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';

import ErrorBoundary from '../ErrorBoundary';
import IngredientForm from '../forms/IngredientForm';
import IngredientsList from '../components/IngredientsList';
import React from 'react';
import map from 'lodash/map';
import max from 'lodash/max';
import sortBy from 'lodash/sortBy';

class IngredientsPage extends React.Component {
  state = {
    selectedIngredient: null
  };

  editIngredient = ingredient => {
    this.setState({ selectedIngredient: ingredient });
  };

  render() {
    const {
      ingredients,
      addIngredient,
      updateIngredient,
      removeIngredient
    } = this.props;
    const { selectedIngredient } = this.state;
    const header = selectedIngredient ? 'Edit ingredient' : 'Add an ingredient';

    return (
      <ErrorBoundary>
        <div className="IngredientsPage">
          <Container>
            <h1>Ingredients</h1>
            <Row>
              <Col md={8}>
                <IngredientsList
                  ingredients={sortBy(ingredients, 'name')}
                  editIngredient={this.editIngredient}
                  removeIngredient={removeIngredient}
                />
              </Col>
              <Col md={4}>
                <Card className="sticky-top">
                  <CardHeader>{header}</CardHeader>
                  <CardBody>
                    <IngredientForm
                      onSubmit={
                        selectedIngredient ? updateIngredient : addIngredient
                      }
                      ingredient={selectedIngredient}
                      nextId={(max(map(ingredients, 'id')) || 0) + 1}
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

export default IngredientsPage;
