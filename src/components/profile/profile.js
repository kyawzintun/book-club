import React, { Component } from 'react';
import { Container, Divider, Statistic, Icon, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import store from 'store';

import isLoggedIn from '../../helper/auth';
import BookDetailsModal from '../common/book-details-modal';
import EditInfoModal from '../common/edit-info-modal';
import BookView from '../common/book-view';
import SearchBook from '../common/search-book';
import InlineLoader from '../common/inline-loader';
import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import './profile.css';

const baseUrl = process.env.REACT_APP_API_URL;
const user = store.get('user') || {};
const reqHeader= { 'email': user.email, 'password': user.password };

class Profile extends Component {
	constructor() {
		super();
		this.state = { 
			activeItem: "addNew", 
			modalOpen: false, 
			infoModalOpen: false,
			keyword: '',
			ownBooksCount: 0,
			wishedBooksCount: 0,
			requiredBooksCount: 0,
			googleBooks: [],
			ownBooks: [],
			wishedBooks: [],
			requiredBooks: [],
			bookObj:{},
			loading: false,
			type:''
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.searchBook = this.searchBook.bind(this);
	}

	componentDidMount = () => {
		const _this = this;
		axios({
	      method: 'get',
	      headers: reqHeader,
	      url: baseUrl + 'get-counts/' + user._id
	    }).then(function (res) {
			_this.setState({
				ownBooksCount: res.data.ownBookCount,
				wishedBooksCount: res.data.wishListCount,
				requiredBooksCount: res.data.requireCount,
			})
	    }).catch(err => {
	    	_this.setState({
				ownBooksCount: 0,
				wishedBooksCount: 0,
				requiredBooksCount: 0
			})
	      console.log(err.response);
	    });
	}

	handleOpen(book, type) {
		this.setState({bookObj:book,modalOpen: true, type: type});
	}

	openEditModal() {
		this.setState({ infoModalOpen: true });
	}

	handleChange(e) {
		this.setState({keyword: e.target.value});
	}

	handleDelete(id, type){
		this.setState(prevState => ({
		    [type]: prevState[type].filter(el => el.id !== id )
		}));
		this.componentDidMount();
	}

	handleClose = () => this.setState({ modalOpen: false, infoModalOpen: false });

	handleItemClick = (name) => {
		this.setState({ activeItem: name });
	}

	searchBook(e) {
		let _this = this;
		if(e.key === 'Enter' && this.state.keyword) {
			if(this.state.keyword) {
				this.setState({loading: true});
				axios({
		      	  method: 'get',
		      	  url: baseUrl + 'search-books?keyword=' + this.state.keyword
		      	}).then(function (res) {
				  _this.setState({googleBooks: res.data, loading: false})
		      	}).catch(err => {
		      	  _this.setState({googleBooks: [], loading: false})
		      	});
			}else {
				_this.setState({googleBooks: []});
			}
		}
	}

	getOwnBook = () => {
		this.setState({ activeItem: 'ownBooks', loading: true });
		let _this = this;
		axios({
		  	method: 'get',
		  	headers: reqHeader,
		  	url: baseUrl + 'get-books/' + user._id 
		}).then(function (res) {
		   	_this.setState({ownBooks: res.data, loading: false });
		}).catch(err => {
		   	_this.setState({ownBooks: [], loading: false });
		});
	}

	getWishList = () => {
		this.setState({ activeItem: 'wishList', loading: true });
		let _this = this;
		axios({
		  	method: 'get',
		  	headers: reqHeader,
		  	url: baseUrl + 'wish-list/' + user._id 
		}).then(function (res) {
		   	_this.setState({wishedBooks: res.data, loading: false });
		}).catch(err => {
		   	_this.setState({wishedBooks: [], loading: false });
		});
	}

	getRequiredList = () => {
		this.setState({ activeItem: 'required', loading: true });
		let _this = this;
		axios({
		  	method: 'get',
		  	headers: reqHeader,
		  	url: baseUrl + 'required-list/' + user._id 
		}).then(function (res) {
		   	_this.setState({requiredBooks: res.data, loading: false })
		}).catch(err => {
		   	_this.setState({requiredBooks: [], loading: false })
		});
	}

	render() {
		const { activeItem } = this.state;
		const userObj = store.get('user');
		if (!isLoggedIn()) {
	      return (<Redirect to="/" />);
	    }
		return (
			<div>
				<NavBar />
				<Container style={{ marginTop: '7em' }} className="profile-container">
					<div className="profile-root">
						<div className="user-info">
						    <Header size='huge' as='h1'>{userObj.username} <a onClick={()=>this.openEditModal()} className="user-info-edit"><Icon name="edit"/>Edit</a></Header>
						    <Header as='h3'><Icon name="mail" />{userObj.email}</Header>
						    <Header as='h3'><Icon name="marker" />{userObj.address}</Header>
						</div>
						<Statistic.Group className="user-book-tab">
						    <Statistic className={(activeItem === 'addNew' ? 'active' : '')} onClick={()=>this.handleItemClick("addNew")}>
						      <Statistic.Value><Icon name="add"/></Statistic.Value>
						      <Statistic.Label>ADD NEW</Statistic.Label>
						    </Statistic>

						    <Statistic className={(activeItem === 'ownBooks' ? 'active' : '')} onClick={()=>this.getOwnBook()}>
						      <Statistic.Value>{this.state.ownBooksCount}</Statistic.Value>
						      <Statistic.Label>YOUR BOOKS</Statistic.Label>
						    </Statistic>

						    <Statistic className={(activeItem === 'wishList' ? 'active' : '')} onClick={()=>this.getWishList()}>
						      <Statistic.Value>{this.state.wishedBooksCount}</Statistic.Value>
						      <Statistic.Label>WISH LIST</Statistic.Label>
						    </Statistic>

						    <Statistic className={(activeItem === 'required' ? 'active' : '')} onClick={()=>this.getRequiredList()}>
						      <Statistic.Value>{this.state.requiredBooksCount}</Statistic.Value>
						      <Statistic.Label>REQUIRED</Statistic.Label>
						    </Statistic>

						    <Statistic className={(activeItem === 'given' ? 'active' : '')} onClick={()=>this.handleItemClick("given")}>
						      <Statistic.Value>5</Statistic.Value>
						      <Statistic.Label>GIVEN</Statistic.Label>
						    </Statistic>

						    <Statistic className={(activeItem === 'received' ? 'active' : '')} onClick={()=>this.handleItemClick("received")}>
						      <Statistic.Value>0</Statistic.Value>
						      <Statistic.Label>RECEIVED</Statistic.Label>
						    </Statistic>
						</Statistic.Group>
						<Divider />
						{ activeItem === 'addNew' &&
							<div className="add-new-wrapper">
								<SearchBook handleChange={this.handleChange} searchBook={this.searchBook} loading={this.state.loading} keyword={this.state.keyword} placeholder={"Search and add books..."} />
							</div>
						}
						{ activeItem === 'addNew' &&
							<BookView books={this.state.googleBooks} handleOpen={this.handleOpen} componentDidMount={this.componentDidMount} type="add" />
						}
						{ ((activeItem === 'ownBooks' || activeItem === 'wishList' || activeItem === 'required' || activeItem === 'given' || activeItem === 'received') && this.state.loading) &&
							<InlineLoader />
						}
						{ (activeItem === 'ownBooks' && !this.state.loading) &&
							<BookView books={this.state.ownBooks} handleOpen={this.handleOpen} handleDelete={this.handleDelete} type="own" />
						}
						{ (activeItem === 'wishList' && !this.state.loading)&&
							<BookView books={this.state.wishedBooks} handleOpen={this.handleOpen} handleDelete={this.handleDelete} type="wish" />
						}
						{ (activeItem === 'required' && !this.state.loading)&&
							<BookView books={this.state.requiredBooks} handleOpen={this.handleOpen} handleDelete={this.handleDelete} type="req" />
						}
						{ (activeItem === 'given' && !this.state.loading) &&
							<BookView books={[]} handleOpen={this.handleOpen} type="given" />
						}
						{ (activeItem === 'received' && !this.state.loading) &&
							<BookView books={[]} handleOpen={this.handleOpen} type="received" />
						}
					</div>
				</Container>
				<BookDetailsModal book={this.state.bookObj} type={this.state.type} modalOpen={this.state.modalOpen} handleClose={this.handleClose}/>
				<EditInfoModal infoModalOpen={this.state.infoModalOpen} handleClose={this.handleClose} />
				<Footer />
			</div>
		);
	}
}

export default Profile;
