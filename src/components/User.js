import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Table, Button } from 'antd';
import { fetchUsers, saveUser } from "../actions";
import UserForm from "./UserForm";
import UserAdvandSearchForm from "./UserAdvandSearchForm";

const { Content } = Layout;

const columns = [
  { title: 'ID', dataIndex: 'id', width: '5%'},
  { title: 'Point', dataIndex: 'point', width: '5%'},
  { title: 'Username', dataIndex: 'username', width: '10%', render: text => <span className="linkColor">{text}</span> },
  { title: 'Name', dataIndex: 'name', width: '15%'},
  { title: 'Phone', dataIndex: 'phone', width: '10%' },
  { title: 'Email', dataIndex: 'email', width: '17%'},
  { title: 'CreatedAt', dataIndex: 'createdDate', width: '15%', render: text => {
    if(!text) return text;
    let times = text.split('T');
    let time = times[1].split('.');
    let dt = times[0] + " "+ time[0];
    return dt;
  }},
  { title: 'Note', dataIndex: 'note', width: '15%' },
  { title: 'Status', dataIndex: 'activationStatus', width: '8%'}
];
export class User extends Component {

  state = {
    isOnEdit : false,
    isOnSearch: false,
    user: {},
    reqData : {
      name : "",
      email: "",
      phone: "",
      username: "",
      id: "",
      page: 0,
      size: 10
    }
  }

	componentDidMount = () => {
		this.props.fetchUsers(this.state.reqData);
  };

  handleTableChange = (pagination) => {

    const { reqData } = this.state;
    reqData.page = pagination.current - 1;
    this.props.fetchUsers(reqData);
  };

  onFormClick = () =>{
    let { user } = this.state;
    user.onCreate = true;
    this.setState({ isOnEdit : !this.state.isOnEdit})
    
  }

  handleFormSubmit = data => {
    this.props.saveUser(data);
    this.setState({ isOnEdit : false});
  }

  handleFormSearch = data => {
    const { reqData } = this.state;
    reqData.id = data.id;
    reqData.name = data.name;
    reqData.username = data.username;
    reqData.email = data.email;
    reqData.phone = data.phone;
    reqData.page = 0;
    reqData.size = 10;

    this.setState({ reqData})

    this.props.fetchUsers(reqData);
    
  }

  handleRowDoubleClick = data =>{
    data.onCreate = false;
    this.setState({
      user: data,
      isOnEdit: true
    })
  }


	render() {
		
    let { users } = this.props;
		const pagination = {
      total : users.totalElements,
      pageSize: users.size,
      current: users.number + 1
		}
		
		return (
			<Content style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }} >
				  <Button type="primary" icon="form" onClick={this.onFormClick} />
        </div>
        {this.state.isOnEdit ? <UserForm submit={this.handleFormSubmit} user={this.state.user} /> : null}
        <UserAdvandSearchForm submit={this.handleFormSearch}/>
       
        <hr />
				<Table
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: event => this.handleRowDoubleClick(record)
            };
          }}
					columns={columns}
					rowKey={record => record.id}
					dataSource={users.content}
					pagination={pagination}
          onChange={this.handleTableChange}
          size="small"
				/>
			</Content>
		);
	}
}
const mapStateToProps = ({ users, user }) => {
	return { users, user };
};

export default connect( mapStateToProps, { fetchUsers, saveUser })(User);
