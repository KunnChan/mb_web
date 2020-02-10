import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Table, Icon } from 'antd';
import { fetchTxns } from "../actions";
import TxnAdvanceSearchForm from "./TxnAdvanceSearchForm";

const { Content } = Layout;
export class Feedback extends Component {

  state = {
    reqData : {
      id : "",
      fromDt: "",
      toDt: "",
      eventAction: "",
      page: 0,
      size: 10
    },
    columns : [
      { title: 'ID', dataIndex: 'id', width: '5%'},
      { title: 'Event Action', dataIndex: 'eventAction', width: '10%', render: text => <span className="linkColor">{text}</span> },
      { title: 'Date', dataIndex: 'transactionDate', width: '10%', render: text => {
        if(!text) return text;
    
        let times = text.split('T');
        let time = times[1].split('.');
        let dt = times[0] + " "+ time[0];
        return dt;
      }},
      { title: 'OS Version', dataIndex: 'information.osVersion', width: '5%'},
      { title: 'Model', dataIndex: 'information.model', width: '5%'},
      { title: 'Location', dataIndex: 'information.latLon', width: '5%' , render: text => {
        if(text){
         return <Icon className="linkColor" type="environment" onClick={() => this.onLocate(text)} />
        }
        return null;
      }},
      { title: 'Manufacturer', dataIndex: 'information.manufacturer', width: '10%'},
      { title: 'Platform', dataIndex: 'information.platform', width: '5%'},
      { title: 'Uuid', dataIndex: 'information.uuid', width: '10%'},
      { title: 'Payload', dataIndex: 'payload', width: '35%'},
    ]
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

  onLocate(latlon){
    const url = "https://www.google.com/maps?q=" + latlon + "&z=16";
    window.open(url,'_blank', 'location=yes');
  }


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
					columns={this.state.columns}
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
