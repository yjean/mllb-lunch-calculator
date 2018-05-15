import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';

import ErrorBoundary from '../ErrorBoundary';
import IngredientForm from '../forms/IngredientForm';
import IngredientsList from '../components/IngredientsList';
import React from 'react';
import map from 'lodash/map';
import max from 'lodash/max';
import sortBy from 'lodash/sortBy';

class IngredientsPage extends React.Component {
  render() {
    const { ingredients, addIngredient, removeIngredient } = this.props;

    return (
      <ErrorBoundary>
        <div className="IngredientsPage">
          <Container>
            <h1>Ingredients</h1>
            <Row>
              <Col md={8}>
                <IngredientsList
                  ingredients={sortBy(ingredients, 'name')}
                  removeIngredient={removeIngredient}
                />
              </Col>
              <Col md={4}>
                <Card>
                  <CardHeader>Add an ingredient</CardHeader>
                  <CardBody>
                    <IngredientForm
                      onSubmit={addIngredient}
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
