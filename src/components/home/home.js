import React, { Component } from 'react';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';

import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import BookDetailsModal from '../common/book-details-modal';
import BookView from '../common/book-view';
import SearchBook from '../common/search-book';

const baseUrl = process.env.REACT_APP_API_URL;

class Home extends Component {
  constructor() {
    super();
    this.state ={ 
      modalOpen: false,
      books: [],
      book:{},
      loading: false,
      initLoading: true 
    }

    this.getAllBooks = this.getAllBooks.bind(this);
    this.handleWishList = this.handleWishList.bind(this);
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    this.setState({loading: true})
    let _this = this;
    axios({
      method: 'get',
      url: baseUrl + 'get-books'
    }).then(function (res) {
      _this.setState({books: res.data, loading: false, initLoading: false });
    }).catch(err => {
      _this.setState({books: [], loading: false, initLoading: false})
    });
  }

  handleOpen = (book, type) => this.setState({ modalOpen: true, book: book, type: type });

  handleClose = () => this.setState({ modalOpen: false });

  handleWishList = (id) => {
      this.setState(prevState => ({
          books: prevState.books.filter(el => el.id !== id )
      }));
  }

  render() {
    return (
      <div className='App' >
        <NavBar />
        <Container style={{ marginTop: '7em', minHeight: '500px' }}>
    			<SearchBook placeholder={"Search books in the club..."}/>
          {this.state.initLoading && 
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          }
    			<BookView books={this.state.books} handleOpen={this.handleOpen} handleWishList={this.handleWishList} type="add-to-wish" />
  	    </Container>
  	    <BookDetailsModal book={this.state.book} modalOpen={this.state.modalOpen} handleClose={this.handleClose} type="add-to-wish" />
        <Footer />
      </div>
    );
  }
}

export default Home;