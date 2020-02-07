import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Table } from 'antd';
import { fetchTxns } from "../actions";
import TxnAdvanceSearchForm from "./TxnAdvanceSearchForm";

const { Content } = Layout;

const columns = [
  { title: 'ID', dataIndex: 'id', width: '5%'},
  { title: 'Event Action', dataIndex: 'eventAction', width: '10%', render: text => <span className="linkColor">{text}</span> },
  { title: 'Date', dataIndex: 'transactionDate', width: '10%'},
  { title: 'Payload', dataIndex: 'payload', width: '75%'},
];
export class Feedback extends Component {

  state = {
    reqData : {
      id : "",
      fromDt: "",
      toDt: "",
      eventAction: "",
      page: 0,
      size: 10
    }
  }

	componentDidMount = () => {
		this.props.fetchTxns(this.state.reqData);
  };

  handleFormSearch = data => {
    const { reqData } = this.state;
    reqData.fromDt = data.fromDt;
    reqData.toDt = data.toDt;
    reqData.id = data.id;
    reqData.eventAction = data.eventAction;
    reqData.page = 0;
    reqData.size = 10;

    this.setState({ reqData})

    this.props.fetchTxns(reqData);
    
  }

  handleTableChange = (pagination) => {

    const { reqData } = this.state;
    reqData.page = pagination.current - 1;
    this.props.fetchTxns(reqData);
  };


	render() {
		
    let { txns } = this.props;
		const pagination = {
      total : txns.totalElements,
      pageSize: txns.size,
      current: txns.number + 1
		}
		
		return (
			<Content style={{ padding: '20px' }}>
        <TxnAdvanceSearchForm submit={this.handleFormSearch}/>
       
        <hr />
				<Table
					columns={columns}
					rowKey={record => record.id}
					dataSource={txns.content}
          pagination={pagination}
          onChange={this.handleTableChange}
          
          size="small"
				/>
			</Content>
		);
	}
}
const mapStateToProps = ({ txns }) => {
	return { txns };
};

export default connect( mapStateToProps, { fetchTxns })(Feedback);
