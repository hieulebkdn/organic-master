import React, { Component } from 'react';
import {
	Grid, Row, Col,
	FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import callApi from '../../utils/apiCaller';
import {
	BrowserRouter,
	Route,
	Link,
	Redirect
} from 'react-router-dom'


class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardHidden: true,
			authState: false,
			controls: {
				email: {
					value: '',
				},
				password: {
					value: '',
				},
			},
		}
	}
	componentDidMount() {
		setTimeout(function () { this.setState({ cardHidden: false }); }.bind(this), 700);
	}

	handleSubmit = (event) => {
		const authData = {
			"email": this.state.controls.email.value,
			"password": this.state.controls.password.value
		}
		callApi('authenticate/', 'POST', authData).then(response => {
			localStorage.setItem('auth_token', response.data.auth_token);
			localStorage.setItem('current_user_id', response.data.user_id);
			localStorage.setItem('current_user_email', response.data.user_email);
			this.setState({ authState: true });
			this.props.history.push('/#/dashboard')
		}).catch(err => {
			this.setState({ authState: false })
			alert("err")
		})
	}

	handleChange = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value
			}
		}
		this.setState({ controls: updatedControls });
	}

	render() {
		return (
			<Grid>
				<Row>
					<Col md={4} sm={6} mdOffset={4} smOffset={3}>
						<form >
							<Card
								hidden={this.state.cardHidden}
								textCenter
								title="Login"
								content={
									<div>
										<FormGroup>
											<ControlLabel>Email address</ControlLabel>
											<FormControl
												placeholder="Enter email"
												type="email"
												value={this.state.controls.email.value}
												onChange={(event) => this.handleChange(event, "email")}
											/>
										</FormGroup>
										<FormGroup>
											<ControlLabel>Password</ControlLabel>
											<FormControl
												placeholder="Password"
												type="password"
												value={this.state.controls.password.value}
												onChange={(event) => this.handleChange(event, "password")}
											/>
										</FormGroup>
										<FormGroup>
											<Checkbox
												number="1"
												label="Remember me"
											/>
										</FormGroup>
									</div>
								}
								legend={
									<Button type="submit" value="Submit" bsStyle="primary" fill wd onClick={this.handleSubmit} >Login</Button>
								}
								ftTextCenter
							/>
						</form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default LoginPage;
