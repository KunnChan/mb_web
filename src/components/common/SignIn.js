import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { signinUser, fetchUser } from "../../actions";
import { keyUser } from "../../actions/types";
const FormItem = Form.Item;

const LoginForm = Form.create()(props => {
	const { getFieldDecorator } = props.form;
	return (
		<Form onSubmit={props.onSubmit} className="form-size form-margin">
			<FormItem>
				{getFieldDecorator("username", {
					rules: [{ required: true, message: "Please input your username!" }]
				})(<Input placeholder="username" />)}
			</FormItem>

			<FormItem>
				{getFieldDecorator("password", {
					rules: [{ required: true, message: "Please input your Password!" }]
				})(<Input type="password" placeholder="Password" />)}
			</FormItem>
			<FormItem>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Login
				</Button>
			</FormItem>
			<span style={{ color: "red" }}>
				{props.loginStatus ? "" : props.loginMessage}
			</span>
		</Form>
	);
});

class SignIn extends Component {
	state = {
		loginStatus: false,
		loginMessage: ""
	};

	componentDidMount = () => {
		let user = localStorage.getItem(keyUser);
		if(user){
			try {
			//	let userData = user;
				//this.props.refreshToken(userData.refresh_token);
				this.props.fetchUser();
				this.setState({ loginStatus: true });
				this.props.history.push("/home");
			} catch (error) {
				console.error("error in getting userObject");
			}
		}
	}
	handleSubmit = e => {
		e.preventDefault();
		this.form.validateFields(async (err, values) => {
			if (!err) {
        try {
			await this.props.signinUser(values.username, values.password);
          	this.setState({ loginStatus: true });
          	this.props.history.push("/home");
        } catch (error) {
			let message = "Network Error, Wifi ခ်ိတ္ေပးပါ";
			if (error.response) {
				message = error.response.data.error_description;
			}
			
          this.setState({
            		loginStatus: false,
            		loginMessage: message
            	});
        }
		}
		});
	};
	saveFormRef = form => {
		this.form = form;
	};
	render() {
		return (
			<div className="login-box">
				<span className="fontBold">Login</span>
				<LoginForm
					ref={this.saveFormRef}
					onSubmit={this.handleSubmit}
					loginStatus={this.state.loginStatus}
					loginMessage={this.state.loginMessage}
				/>
			</div>
		);
	}
}

export default connect( null, { signinUser, fetchUser })(SignIn);
