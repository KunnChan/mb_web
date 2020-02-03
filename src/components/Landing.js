import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Layout, Popover, Button, Modal } from 'antd';
import { Link } from "react-router-dom";

import { fetchUser, fetchTables, fetchMenuGroup, sendDirectPaidOrder } from "../actions";

import { Auxi } from "./Auxi";
import { keyWaiter, levelReOrder, levelViewBill, levelCancelOrder, levelOrder, levelPaid } from "../actions/types";
import { getRole, TIME_FOR_FETCH_TABLE } from "../const";

const { Content } = Layout;

export class Landing extends Component {

  state = {
    roles: []
  }
	componentDidMount = () => {
		this.props.fetchUser();
  };

	render() {
		const { tables } = this.props;
		if(tables.length === 0){
			return <p>Loading...</p>
    }
		return (
			<Content style={{ padding: '20px' }}>
				{ tables.map(item => <Auxi key={item.TRID}>{this.getTable(item)}</Auxi>) }
			</Content>
		);
	}
}
const mapStateToProps = ({ auth, tables }) => {
	return { auth, tables };
};

export default connect( mapStateToProps, { fetchUser })(Landing);
