import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignUp from "./common/SignUp";
import Header from "./Header";
import NotFound from "./NotFound";
import SignIn from "./common/SignIn";
import Landing from "./Landing";
import { fetchUser } from "../actions";
import SignOut from "./common/SignOut";
import { keyToken } from "../actions/types";
import  Album  from "./Album";

class App extends Component {
	
	render() {
		let auth = localStorage.getItem(keyToken);
		auth = JSON.parse(auth);
		if(!auth){
		return(	
			<BrowserRouter>
				<div>
					<Header />
					<Switch>
						<Route exact path="/" component={SignIn} />
						<Route exact path="/signout" component={SignOut} />
						<Redirect to="/" />
						{/* <Route component={NotFound} /> */}
					</Switch>
				</div>
			</BrowserRouter>
		)
		}
		
		return (
			<BrowserRouter>
				<div>
					<Header />
					<Switch>
						<Route exact path="/" component={SignIn} />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/home" component={Landing} />
						<Route exact path="/album" component={Album} />
						{/* <Route exact path="/order/:id/:name" component={Order} /> */}
						{/* <Route exact path="/cancel/:id/:name" component={Cancel} /> */}
						<Route exact path="/signout" component={SignOut} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
function mapStateToProps({ auth }) {
	return {
	 	auth
	};
}

export default connect(mapStateToProps, { fetchUser})(App);
