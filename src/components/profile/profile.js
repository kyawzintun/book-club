import React, { Component } from 'react';
import { Container, Divider, Statistic, Icon,Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import isLoggedIn from '../../helper/auth';
import BookDetailsModal from '../common/book-modal';
import EditInfoModal from '../common/edit-info-modal';
import BookView from '../common/book-view';
import SearchBook from '../common/search-book';
import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import './profile.css';

class Profile extends Component {
	constructor() {
		super();
		this.state = { activeItem: "addNew", modalOpen: false, infoModalOpen: false };
		this.handleOpen = this.handleOpen.bind(this);
	}

	handleOpen (type) {
		console.log(type);
		if(type === 'edit') {
			this.setState({ infoModalOpen: true });
		}else {
			this.setState({ modalOpen: true });
		}
	}

	handleClose = () => this.setState({ modalOpen: false, infoModalOpen: false });

	handleItemClick = (name) => this.setState({ activeItem: name });

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
						    <Header size='huge' as='h1'>Kyaw Zin Tun <a onClick={()=>this.handleOpen('edit')} className="user-info-edit"><Icon name="edit"/>Edit</a></Header>
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

						    <Statistic className={(activeItem === 'requested' ? 'active' : '')} onClick={()=>this.handleItemClick("requested")}>
						      <Statistic.Value>3</Statistic.Value>
						      <Statistic.Label>REQUESTED</Statistic.Label>
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
								<SearchBook placeholder={"Search and add books..."} />
								<BookView lists={[]} handleOpen={()=>this.handleOpen('details')} />
							</div>
						}
						{ activeItem === 'ownBooks' &&
							<BookView lists={[1,2,3, 4]} handleOpen={this.handleOpen} />
						}
						{ activeItem === 'wishList' &&
							<BookView lists={[1,2]} handleOpen={this.handleOpen} />
						}
						{ activeItem === 'requested' &&
							<BookView lists={[1,2,3]} handleOpen={this.handleOpen} />
						}
						{ activeItem === 'given' &&
							<BookView lists={[1,2,3,4,5]} handleOpen={this.handleOpen} />
						}
						{ activeItem === 'given' &&
							<BookView lists={[]} handleOpen={this.handleOpen} />
						}
					</div>
				</Container>
				<BookDetailsModal modalOpen={this.state.modalOpen} handleClose={this.handleClose}/>
				<EditInfoModal infoModalOpen={this.state.infoModalOpen} handleClose={this.handleClose}/>
				<Footer />
			</div>
		);
	}
}

export default Profile;
