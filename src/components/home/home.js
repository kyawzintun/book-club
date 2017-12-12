import React, { Component } from 'react';
import { Container} from 'semantic-ui-react';

import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import BookDetailsModal from '../common/book-modal';
import BookView from '../common/book-view';
import SearchBook from '../common/search-book';

const lists = [1,2,3,4,5,6,7,8,9,10];

class Home extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <div className='App' >
        <NavBar />
        <Container style={{ marginTop: '7em' }}>
    			<SearchBook placeholder={"Search books in the club..."}/>
    			<BookView lists={lists} handleOpen={this.handleOpen} />
  	    </Container>
  	    <BookDetailsModal modalOpen={this.state.modalOpen} handleClose={this.handleClose}/>
        <Footer />
      </div>
    );
  }
}

export default Home;