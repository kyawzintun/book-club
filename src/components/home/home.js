import React, { Component } from 'react';
import { Container} from 'semantic-ui-react';
import axios from 'axios';
import store from 'store';

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
      type:'',
      loading: false 
    }

    this.getAllBooks = this.getAllBooks.bind(this);
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
      console.log(res);
      _this.setState({books: res.data, loading: false});
    }).catch(err => {
      console.log(err.response);
      _this.setState({books: [], loading: false})
    });
  }

  handleOpen = (book, type) => this.setState({ modalOpen: true, book: book, type: type });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <div className='App' >
        <NavBar />
        <Container style={{ marginTop: '7em', minHeight: '500px' }}>
    			<SearchBook placeholder={"Search books in the club..."}/>
    			<BookView books={this.state.books} handleOpen={this.handleOpen} type="add-to-wish" />
  	    </Container>
  	    <BookDetailsModal book={this.state.book} type={this.state.type} modalOpen={this.state.modalOpen} handleClose={this.handleClose} type="add-to-wish" />
        <Footer />
      </div>
    );
  }
}

export default Home;