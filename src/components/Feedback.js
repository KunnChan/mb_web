import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Table } from 'antd';
import { fetchFeedbacks } from "../actions";
import FeedbackAdvanceSearchForm from "./FeedbackAdvanceSearchForm";

const { Content } = Layout;

const columns = [
  { title: 'ID', dataIndex: 'id', width: '10%'},
  { title: 'Name', dataIndex: 'name', width: '20%', render: text => <span className="linkColor">{text}</span> },
  { title: 'Email/Phone', dataIndex: 'emailOrphone', width: '20%'},
  { title: 'Text', dataIndex: 'text', width: '30%' },
  { title: 'Date', dataIndex: 'createdDate', width: '20%'},
];
export class Feedback extends Component {

  state = {
    reqData : {
      id : "",
      fromDt: "",
      toDt: "",
      emailOrphone: "",
      text: "",
      name: "",
      page: 0,
      size: 10
    }
  }

	componentDidMount = () => {
		this.props.fetchFeedbacks(this.state.reqData);
  };

  handleFormSearch = data => {
    const { reqData } = this.state;
    reqData.fromDt = data.fromDt;
    reqData.toDt = data.toDt;
    reqData.id = data.id;
    reqData.emailOrphone = data.emailOrphone;
    reqData.text = data.text;
    reqData.name = data.name;
    reqData.page = 0;
    reqData.size = 10;

    this.setState({ reqData})

    this.props.fetchFeedbacks(reqData);
    
  }
  handleTableChange = (pagination) => {

    const { reqData } = this.state;
    reqData.page = pagination.current - 1;
    this.props.fetchFeedbacks(reqData);
  };

	render() {
		
    let { feedbacks } = this.props;
		const pagination = {
      total : feedbacks.totalElements,
      pageSize: feedbacks.size,
      current: feedbacks.number + 1
		}
		
		return (
			<Content style={{ padding: '20px' }}>
        <FeedbackAdvanceSearchForm submit={this.handleFormSearch}/>
       
        <hr />
				<Table
					columns={columns}
					rowKey={record => record.id}
					dataSource={feedbacks.content}
          pagination={pagination}
          onChange={this.handleTableChange}
          
          size="small"
				/>
			</Content>
		);
	}
}
const mapStateToProps = ({ feedbacks }) => {
	return { feedbacks };
};

export default connect( mapStateToProps, { fetchFeedbacks })(Feedback);
