import React, { Component } from 'react';
import { Container, Divider, Statistic, Icon,Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import store from 'store';

import isLoggedIn from '../../helper/auth';
import BookDetailsModal from '../common/book-details-modal';
import EditInfoModal from '../common/edit-info-modal';
import BookView from '../common/book-view';
import SearchBook from '../common/search-book';
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
			googleBooks: [],
			ownBooks: [],
			bookObj:{},
			loading: false,
			type:''
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.searchBook = this.searchBook.bind(this);
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

	handleDelete(id){
	    this.setState(prevState => ({
	        ownBooks: prevState.ownBooks.filter(el => el.id != id )
	    }));
	}

	handleClose = () => this.setState({ modalOpen: false, infoModalOpen: false });

	handleItemClick = (name) => {
		this.setState({ activeItem: name });
		if(name==='ownBooks') {
			this.getOwnBook();
		}
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
		      		console.log(res);
					_this.setState({googleBooks: res.data, loading: false})
		      	}).catch(err => {
		      	  console.log(err.response);
		      	  _this.setState({googleBooks: [], loading: false})
		      	});
			}else {
				_this.setState({googleBooks: []});
			}
		}
	}

	getOwnBook = () => {
		let _this = this;
		axios({
		  	method: 'get',
		  	headers: reqHeader,
		  	url: baseUrl + 'get-books/' + user._id 
		}).then(function (res) {
		   	console.log(res);
		   	_this.setState({ownBooks: res.data})
		}).catch(err => {
		   	_this.setState({ownBooks: []})
		    console.log(err.response);
		});
	}

	render() {
		const { activeItem } = this.state;
		if (!isLoggedIn()) {
	      return (<Redirect to="/" />);
	    }
		return (
			<div>
				<NavBar />
				<Container style={{ marginTop: '7em' }} className="profile-container">
					<div className="profile-root">
						<div className="user-info">
						    <Header size='huge' as='h1'>Kyaw Zin Tun <a onClick={()=>this.openEditModal()} className="user-info-edit"><Icon name="edit"/>Edit</a></Header>
						    <Header as='h3'><Icon name="mail" />kyawzintun@amdon.com</Header>
						    <Header as='h3'><Icon name="marker" />Yangon</Header>
						</div>
						<Statistic.Group className="user-book-tab">
						    <Statistic className={(activeItem === 'addNew' ? 'active' : '')} onClick={()=>this.handleItemClick("addNew")}>
						      <Statistic.Value><Icon name="add"/></Statistic.Value>
						      <Statistic.Label>ADD NEW</Statistic.Label>
						    </Statistic>

						    <Statistic className={(activeItem === 'ownBooks' ? 'active' : '')} onClick={()=>this.handleItemClick("ownBooks")}>
						      <Statistic.Value>4</Statistic.Value>
						      <Statistic.Label>YOUR BOOKS</Statistic.Label>
						    </Statistic>

						    <Statistic className={(activeItem === 'wishList' ? 'active' : '')} onClick={()=>this.handleItemClick("wishList")}>
						      <Statistic.Value>2</Statistic.Value>
						      <Statistic.Label>WISH LIST</Statistic.Label>
						    </Statistic>

						    <Statistic className={(activeItem === 'required' ? 'active' : '')} onClick={()=>this.handleItemClick("requested")}>
						      <Statistic.Value>3</Statistic.Value>
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
							<BookView books={this.state.googleBooks} handleOpen={this.handleOpen} type="add" />
						}
						{ activeItem === 'ownBooks' &&
							<BookView books={this.state.ownBooks} handleOpen={this.handleOpen} handleDelete={this.handleDelete} type="own" />
						}
						{ activeItem === 'wishList' &&
							<BookView books={[]} handleOpen={this.handleOpen} type="wish" />
						}
						{ activeItem === 'required' &&
							<BookView books={[]} handleOpen={this.handleOpen} type="req" />
						}
						{ activeItem === 'given' &&
							<BookView books={[]} handleOpen={this.handleOpen} type="given" />
						}
						{ activeItem === 'received' &&
							<BookView books={[]} handleOpen={this.handleOpen} type="received" />
						}
					</div>
				</Container>
				<BookDetailsModal book={this.state.bookObj} type={this.state.type} modalOpen={this.state.modalOpen} handleClose={this.handleClose}/>
				<EditInfoModal infoModalOpen={this.state.infoModalOpen} handleClose={this.handleClose}/>
				<Footer />
			</div>
		);
	}
}

export default Profile;
