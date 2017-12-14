import React, { Component } from 'react';
import { Container} from 'semantic-ui-react';

import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import BookDetailsModal from '../common/book-details-modal';
import BookView from '../common/book-view';
import SearchBook from '../common/search-book';

const lists = [];

class Home extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <div className='App' >
        <NavBar />
        <Container style={{ marginTop: '7em', minHeight: '500px' }}>
    			<SearchBook placeholder={"Search books in the club..."}/>
    			<BookView books={[]} handleOpen={this.handleOpen} type="add-to-wish" />
  	    </Container>
  	    <BookDetailsModal modalOpen={this.state.modalOpen} handleClose={this.handleClose} book={[]} type="add-to-wish" />
        <Footer />
      </div>
    );
  }
}

export default Home;