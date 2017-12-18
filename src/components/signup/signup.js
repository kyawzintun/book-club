import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container,Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import store from 'store';

import MyInput from '../common/input';
import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import '../../assets/style.css'

const baseUrl = process.env.REACT_APP_API_URL;
const regex = new RegExp(process.env.REACT_APP_EMAIL_REGEX);

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			username: '',
			password: '',
			address: '',
			emailError: '',
			usernameError: '',
			passwordError: '',
			addressError: '',
			submitted:false
		};
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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
		}else if((name === 'username' || name === 'password') && value.length < 6) {
			this.setState({[nameErr]:`${name} must be 6 characters or more.`});
		}else if(name === 'email') {
			const isValid = regex.test(value);
			if(!isValid) this.setState({[nameErr]: "Please enter a valid email address."});
		}
	}

	isValidForm(){
		const state = this.state;
		if(state.usernameError || state.emailError || state.passwordError || state.addressError) {
			return false;
		}else if(state.username && state.email && state.password && state.address) {
			return true;
		}else {
			return false;
		}
	}

	onSubmit(e) {
		e.preventDefault();
		let userObj = {
			"username": this.state.username,
			"email": this.state.email,
			"password": this.state.password,
			"address": this.state.address
		};
		this.callApi(userObj);
	}

	callApi(userObj) {
		const { history } = this.props;
		this.setState({submitted: true});
		let _this = this;
		axios({
	      method: 'POST',
	      url: baseUrl + 'signup',
	      data: userObj
	    }).then(function (res) {
	    	_this.setState({submitted: false});
			history.push('/login')
	    }).catch(err => {
	    	_this.setState({submitted: false});
	    	if(err.response.status === 400) {
				this.setState({ emailError : err.response.data.error });
	    	}
	    })
	}

	render() {
		if (store.get('user')) {
	      return (<Redirect to="/" />);
	    }
		const isEnabled = this.isValidForm();
		return (
			<div>
				<NavBar />
				<Container style={{ marginTop: '7em' }} className="account-container">
    				<div className="account-title">
						<h1>SIGNUP</h1>
					</div>
					<Form className="form-root" onSubmit={this.onSubmit} >
					    <MyInput changeValue={this.handleChange} name="email" type="email" value={this.state.email} icon='mail' error={this.state.emailError} placeholder='Your email...' maxLength={32} autoFocus="on"/>
						<MyInput changeValue={this.handleChange} name="username" type="text" value={this.state.username} icon='user' error={this.state.usernameError} placeholder='Your username...' minLength={6} maxLength={32} />
					    <MyInput changeValue={this.handleChange} name="password" type="password" value={this.state.password} icon='lock' error={this.state.passwordError} placeholder='Your password...' />
					    <MyInput changeValue={this.handleChange} name="address" type="text" value={this.state.address} icon='marker' error={this.state.addressError} placeholder='Your address as City, Country...' maxLength={32} />
					    <Button type="submit" disabled={!isEnabled} fluid size="big" color="linkedin" loading={this.state.submitted} />
				  	</Form>
  	    		</Container>
				<Footer />
			</div>
		);
	}
}

export default Signup;
