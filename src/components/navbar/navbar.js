import React, { Component } from 'react';
import { Container,Image,Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import store from 'store';

import isLoggedIn from '../../helper/auth';
import "./navbar.css";
import logo from '../../assets/logo.png';

class NavBar extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.state = {}
    this.logout = this.logout.bind(this);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logout() {
    store.remove('user');
    this.context.router.history.push('/');
  }

  render() {
    const { activeItem } = this.state;
    const isloggedin = isLoggedIn();
    const user = store.get('user');

    return (
      <Menu fixed='top' inverted pointing className="custom-menu">
        <Container>
          <Menu.Item as={ Link } to='/' header>
            <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
            Book Club
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name='books' as={ Link } to='/' active={activeItem === 'books'} onClick={this.handleItemClick}>Books</Menu.Item>
            {isloggedin &&
              <Menu.Item name='profile' as={ Link } to='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>My Profile</Menu.Item>
            }
            {isloggedin &&
              <Dropdown item simple text={user.username}>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            }
            {!isloggedin &&
              <Menu.Item name='signup' as={ Link } to='signup' active={activeItem === 'signup'} onClick={this.handleItemClick}>Sign Up</Menu.Item>
            }
            {!isloggedin &&
              <Menu.Item name='login' as={ Link } to='login' active={activeItem === 'login'} onClick={this.handleItemClick}>Login</Menu.Item>
            }
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default NavBar;