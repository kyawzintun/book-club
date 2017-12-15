import React, { Component } from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import PropTypes from "prop-types";
import store from 'store';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import coverImg from '../../assets/img-not-found.jpg';
import './book-view.css'

const baseUrl = process.env.REACT_APP_API_URL;
const user = store.get('user') || {};
const reqHeader= { 'email': user.email, 'password': user.password };

class BooksRoot extends Component {
	static contextTypes = {
	  router: PropTypes.object
	}

	constructor(props, context) {
	  super(props, context);

	  this.removeMyBook = this.removeMyBook.bind(this);
	  this.removeFromWishList = this.removeFromWishList.bind(this);
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
			book.requestedId = null;
			console.log(book);
			axios({
		      method: 'post',
		      headers: reqHeader,
		      url: baseUrl + 'add-book',
		      data: book
		    }).then(function (res) {
		      	console.log('add success ', res);
		      	toast.success(`${res.data.title} successfully added to your book list`)
		    }).catch(err => {
		    	toast.error(err.response.data.error);
				console.log('error ', err.response);
		    })
		}else {
			store.remove('user');
			this.context.router.history.push('/');
		}
	}

	removeMyBook = (book,index) => {
		const user = store.get('user');
		let _this = this;
		if(user) {
			const data = { "ownerId":user._id,"id":book.id };
			axios({
		      method: 'delete',
		      headers: reqHeader,
		      url: baseUrl + 'remove-book',
		      data: data
		    }).then(res => {
		      	console.log('remove success ', res);
		      	_this.props.handleDelete(book.id,'ownBooks');
		      	toast.success(`${book.title} successfully removed from your book list`)
		    }).catch(err => {
		    	toast.error(err.response.data.error);
				console.log('error ', err.response);
		    })
		}else {
			store.remove('user');
			this.context.router.history.push('/');
		}
	}

	addToWishList = (book, i, userId) => {
		let _this = this;
		if(userId) {
			book.requestedId = userId;
			axios({
		      method: 'put',
		      headers: reqHeader,
		      url: baseUrl + 'request-book',
		      data: book
		    }).then(function (res) {
		      	console.log('add success ', res);
		      	_this.props.handleWishList(book.id);
		      	toast.success(`${book.title} successfully added to your wish list`)
		    }).catch(err => {
		    	toast.error(err.response.data.error);
				console.log('error ', err.response);
		    })
		}else {
			store.remove('user');
			this.context.router.history.push('/login');
		}
	}

	removeFromWishList = (book,index) => {
		const user = store.get('user');
		let _this = this;
		if(user) {
			const data = { "reqId":user._id,"id":book.id };
			axios({
		      method: 'put',
		      headers: reqHeader,
		      url: baseUrl + 'remove-from-wishlist',
		      data: data
		    }).then(res => {
		      	console.log('remove success ', res);
		      	_this.props.handleDelete(book.id,'wishedBooks');
		      	toast.success(`${book.title} successfully removed from your wish list`)
		    }).catch(err => {
		    	toast.error(err.response.data.error);
				console.log('error ', err.response);
		    })
		}else {
			store.remove('user');
			this.context.router.history.push('/');
		}
	}

	render() {
		const type = this.props.type;
		const userId = store.get('user') ? store.get('user')._id : null;
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
							      		<a onClick={()=>this.removeMyBook(book,i)}><Icon name='trash' />Remove from my book list</a>
							    	}
							    	{type === 'wish' &&
							      		<a onClick={()=>this.removeFromWishList(book,i)}><Icon name='trash' />Remove from my wish list</a>
							    	}
							    	{(type === 'add-to-wish' && userId === book.ownerId) &&
							      		<a><Icon name='trash' />Remove from my book list</a>
							    	}
							    	{(type === 'add-to-wish' && userId != book.ownerId) &&
							      		<a onClick={()=>this.addToWishList(book,i,userId)}><Icon name='heart' />Add to my wish list</a>
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
		      	<ToastContainer
		          position="top-right"
		          autoClose={3000}
		          hideProgressBar={false}
		          newestOnTop={false}
		          closeOnClick
		          pauseOnHover />
		    </div>
		);
	}
}

export default BooksRoot;