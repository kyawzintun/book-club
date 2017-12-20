import React, { Component } from 'react';
import { Modal, Button, Header, Form } from 'semantic-ui-react';
import axios from 'axios';
import store from 'store';
import { ToastContainer, toast } from 'react-toastify';

import MyInput from '../common/input';
import '../../assets/style.css';

const baseUrl = process.env.REACT_APP_API_URL;
class EditInfoModal extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			address: '',
			usernameError: '',
			addressError: '',
			submitted:false
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount = () => {
		const user = store.get('user');
		this.setState({"username": user.username, "address": user.address });
	}

	handleChange(e) {
		const target = e.target;
		const value = target.value;
    	const name = target.name;
    	const nameErr = name+'Error';
	    this.setState({
	      [name]: value,
	      [nameErr]: ''
	    });
    	this.validateErr(name, value, nameErr);
	}

	validateErr(name, value, nameErr) {
		if(!value.length) {
			this.setState({[nameErr]:`${name} is required.`});
		}else if(name === 'username' && value.length < 6) {
			this.setState({[nameErr]:`${name} must be 6 characters or more.`});
		}
	}

	isValidForm(){
		const state = this.state;
		if(state.usernameError || state.addressError) {
			return false;
		}else if(state.username && state.address) {
			return true;
		}else {
			return false;
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const userObj = {
			"username": this.state.username,
			"address": this.state.address
		};
		const user = store.get('user');
		this.setState({submitted: true});
		const _this = this;
		axios({
	      method: 'PUT',
	      url: baseUrl + 'update-user-info/' + user._id,
	      headers: { 'email': user.email, 'password': user.password },
	      data: userObj
	    }).then(function (res) {
	    	toast.success(`You have successfully updated your information.`);
	    	store.set("user", res.data);
	    	_this.setState({submitted: false});
	    	_this.props.handleClose();
	    }).catch(err => {
	    	toast.error(`Failed to update your information.`);
	    	_this.setState({submitted: false});
	    })
	}

	render() {
		const isEnabled = this.isValidForm();
		const user = store.get('user');;
		return (
			<div>
				<Modal dimmer="blurring" size="tiny" className="userinfo-edit-modal" open={this.props.infoModalOpen} onClose={this.props.handleClose} closeIcon>
				  <Modal.Header>Edit Your Information</Modal.Header>
					  <Modal.Content>
				  		<Form onSubmit={this.onSubmit}>
						    <Modal.Description>
						      <Header as='h1'>{user.email}</Header>
							  <MyInput changeValue={this.handleChange} name="username" type="text" value={this.state.username} icon='user' error={this.state.usernameError} placeholder='Your username...' minLength={6} maxLength={32} autoFocus="on" />
							  <MyInput changeValue={this.handleChange} name="address" type="text" value={this.state.address} icon='marker' error={this.state.addressError} placeholder='Your address as City, Country...' maxLength={32} />
						    </Modal.Description>
						    <Modal.Actions className="modal-action">
					          <Button inverted color='red' icon="cancel" content='Cancel' onClick={this.props.handleClose} />
					          <Button type="submit" disabled={!isEnabled} inverted color='green' icon='checkmark' content='Update' loading={this.state.submitted} />
					        </Modal.Actions>
						</Form>
					  </Modal.Content>
				</Modal>
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

export default EditInfoModal;