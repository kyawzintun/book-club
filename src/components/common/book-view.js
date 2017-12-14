import React, { Component } from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import store from 'store';
import PropTypes from "prop-types";
import axios from 'axios';

import coverImg from '../../assets/img-not-found.jpg';
import './book-view.css'

const baseUrl = process.env.REACT_APP_API_URL;

class BooksRoot extends Component {
	static contextTypes = {
	  router: PropTypes.object
	}

	constructor(props, context) {
	  super(props, context);
	}

	formatTitle(title) {
		return title.length > 23 ? title.substring(0,23) + ' ...' : title;
	}

	addToMyBook(book){
		const user = store.get('user');
		if(user) {
			const userId = user._id;
			const email = user.email;
			const password = user.password;
			book.ownerId = userId;
			book.requested = false;
			console.log(book);
			this.callApi(book, email, password);
		}else {
			store.remove('user');
			this.context.router.history.push('/');
		}
	}

	callApi(book,email,password){
		axios({
	      method: 'post',
	      headers: { 'email': email, 'password': password },
	      url: baseUrl + 'add-book',
	      data: book
	    }).then(function (res) {
	      	console.log('add success ', res);
	    }).catch(err => {
			console.log('error ', err);
	    })
	}

	render() {
		const type = this.props.type;
		return (
			<div className="books-root">
		      	{
		      		this.props.books.map((book,i) =>{
		      			return (
							<Card className="book-card" key={i}>
								<div className="book-img-wrap">
							    	<Image src={book.imageLink ? book.imageLink : coverImg } className="cover-img"/>
									<div className="book-img-shade">
										<button onClick={()=>this.props.handleOpen(book, type)} className="ui button book-img-button bf-theme-basic">View Details</button>
									</div>
							    </div>
							    <Card.Content className="card-content">
							      <Card.Header>{this.formatTitle(book.title)}</Card.Header>
							      <Card.Meta className="book-subtitle">{book.subtitle}</Card.Meta>
							      <Card.Meta>
							        <span className='date'>Author : {book.authors} </span>
							      </Card.Meta>
							      <Card.Meta>
							      	<span className='date'>Published on : {book.publishedDate}</span>
							      </Card.Meta>
							      <Card.Meta>
							        <span className='date'>Pages : {book.pageCount}</span>
							      </Card.Meta>
							    </Card.Content>
							    <Card.Content extra>
							    	{type === 'add' &&
							      		<a onClick={()=>this.addToMyBook(book)}><Icon name='plus' />Add to my books</a>
							    	}
							    	{type === 'own' &&
							      		<a><Icon name='trash' />Remove from my book list</a>
							    	}
							    	{type === 'wish' &&
							      		<a><Icon name='trash' />Remove from my wish list</a>
							    	}
							    	{type === 'add-to-wish' &&
							      		<a><Icon name='heart' />Add to my wish list</a>
							    	}
							    	{type === 'req' &&
							      		<div className='ui two buttons'>
								          <Button icon="cancel" basic color='red'>Reject</Button>
								          <Button icon="check" basic color='green'>Confirm</Button>
								        </div>
							    	}
							    </Card.Content>
							</Card>
						);
		      		})
		      	}
		    </div>
		);
	}
}

export default BooksRoot;