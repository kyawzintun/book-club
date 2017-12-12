import React, { Component } from 'react';
import { Container,Button, Form, Loader } from 'semantic-ui-react';
import store from 'store';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import isLoggedIn from '../../helper/auth';
import MyInput from '../common/input';
import NavBar from '../navbar/navbar';
import Footer from '../footer/footer';
import '../../assets/style.css'

const baseUrl = process.env.REACT_APP_API_URL;
const regex = new RegExp(process.env.REACT_APP_EMAIL_REGEX);

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			emailError: '',
			passwordError: '',
			submitted: false
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
		if(name === 'password' && value.length < 6) {
			if(!value.length) {
				this.setState({[nameErr]:`${name} is required.`});
			}else{
				this.setState({[nameErr]:`${name} must be 6 characters or more.`});
			}
		}else if(name === 'email') {
			const isValid = regex.test(value);
			if(!isValid) this.setState({[nameErr]: "Please enter a valid email address."});
		}
	}

	isValidForm(){
		const state = this.state;
		if(state.emailError || state.passwordError) {
			return false;
		}else if(state.email && state.password) {
			return true;
		}else {
			return false;
		}
	}
	
	onSubmit(e) {
		e.preventDefault();
		let loginObj = {
			"email": this.state.email,
			"password": this.state.password
		};
		this.callApi(loginObj);
	}

	callApi(loginObj) {
		const { history } = this.props;
		this.setState({submitted: true});
		let _this = this;
		axios({
	      method: 'POST',
	      url: baseUrl + 'signin',
	      data: loginObj
	    }).then(function (res) {
		    _this.setState({submitted: false});
	    	store.set('user', res.data);
		    history.push('/');
	    })
		.catch(err => {
	      _this.setState({submitted: false});
	      if(err.response.data.error === "Email not found.") {
		  	this.setState({ emailError : err.response.data.error });
	      }else {
	      	this.setState({ passwordError : err.response.data.error });
	      }
	    })
	}

	render() {
		const isEnabled = this.isValidForm();
		if (isLoggedIn()) {
	      return (<Redirect to="/" />);
	    }
		return (
			<div>
				<NavBar />
				<Container style={{ marginTop: '7em' }} className="account-container">
    				<div className="account-title">
						<h1>LOGIN</h1>
					</div>
				  	<Form className="form-root" onSubmit={this.onSubmit} >
					    <MyInput changeValue={this.handleChange} name="email" type="email" value={this.state.email} icon='mail' error={this.state.emailError} placeholder='Your email...' maxLength={32} autoFocus="on"/>
					    <MyInput changeValue={this.handleChange} name="password" type="password" value={this.state.password} icon='lock' error={this.state.passwordError} placeholder='Your password...' />
					    <Button type="submit" disabled={!isEnabled} fluid size="big" color="linkedin">
					    	{this.state.submitted &&
								<Loader size="tiny" inverted active inline='centered' />
					    	}
					    	{!this.state.submitted &&
								<span>Login</span>
					    	}
					    </Button>
				  	</Form>
  	    		</Container>
				<Footer />
			</div>
		);
	}
}

export default Login;
