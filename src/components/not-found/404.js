import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import './404.css';

class NotFound extends Component {
  render() {
    return (
      <div className='My-Poll' >
      	<NavBar />
        <Container style={{ marginTop: '7em', minHeight: '500px' }} className="not-fount-root">
			<h1>404</h1>
			<h2>Page Not Found</h2>
			<h4>Please start your book club from the navigation above.</h4>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default NotFound;