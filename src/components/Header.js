import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { signout } from "../actions";
const { Header } = Layout;

class Headerr extends Component {
	state = {
		collapsed: false,
	  };
	onSignOut = () =>{
		this.props.signout();
	}
	renderSignOutLink() {
		if (!this.props.auth) {
			return null;
		} else {
			return (
				<Menu theme="dark" mode="horizontal" style={{ lineHeight: "50px", backgroundColor:'#247796' }}>
					<Menu.Item key="2">
						<Link to="/album">Album</Link>
					</Menu.Item>
					<Menu.Item key="3">Feedback</Menu.Item>
					<Menu.Item key="4">Txn</Menu.Item>
					<Menu.Item key="5">User</Menu.Item>
					<Menu.Item key="7" style={{ float: "right" }}>
						<Link to="/signout">Sign Out</Link>
					</Menu.Item>
				</Menu>
				
			);
		}
	}
	toggle = () => {
		this.setState({
		  collapsed: !this.state.collapsed,
		});
	  };

	render() {

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
					<Link to="/" className="logo">
					  Rythm Box
					</Link>
					{this.renderSignOutLink()}
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
