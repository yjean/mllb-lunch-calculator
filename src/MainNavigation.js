import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap';

import { Link } from 'react-router-dom';
import React from 'react';

class MainNavigation extends React.Component {
  render() {
    return (
      <Navbar color="light" light>
        <NavbarBrand href="/">MyLittleLunchBox</NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink tag={Link} to="/">
              Groceries
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/ingredients">
              Ingredients
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/recipes">
              Recipes
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default MainNavigation;
