import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { signout } from "../actions";

const { Header } = Layout;

class Headerr extends Component {
	onSignOut = () =>{
		this.props.signout();
	}
	renderSignOutLink() {
		if (!this.props.auth) {
			return null;
		} else {
			return (
				<Menu.Item key="4" style={{ float: "right" }}>
					<Link to="/signout">Sign Out</Link>
				</Menu.Item>
			);
		}
	}
	render() {
		let userName = "Rythm Box";
		if( this.props.auth){
			let data = JSON.parse(this.props.auth)
			userName = data.userName;
		}

		return (
			<Layout style={{ marginBottom: 50 }}>
				<Header
					style={{
						position: "fixed",
						zIndex: 1,
						width: "100%",
						backgroundColor:'#247796',
						height: 50
					}}>
					<Link to="/home" className="logo">
					  {userName}
					</Link>
					<Menu theme="dark" mode="horizontal" style={{ lineHeight: "50px", backgroundColor:'#247796' }}>
						{this.renderSignOutLink()}
					</Menu>
				</Header>
			</Layout>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(
	mapStateToProps,
	{ signout }
)(Headerr);
