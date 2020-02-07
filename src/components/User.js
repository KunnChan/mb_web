import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Table, Button } from 'antd';
import { fetchUsers, saveUser } from "../actions";
import SongForm from "./SongForm";
import UserAdvandSearchForm from "./UserAdvandSearchForm";

const { Content } = Layout;

const columns = [
  { title: 'ID', dataIndex: 'id', width: '5%'},
  { title: 'Username', dataIndex: 'username', width: '20%', render: text => <span className="linkColor">{text}</span> },
  { title: 'Name', dataIndex: 'name', width: '20%'},
  { title: 'Phone', dataIndex: 'phone', width: '10%' },
  { title: 'Email', dataIndex: 'email', width: '20%'},
  { title: 'Note', dataIndex: 'note', width: '15%' },
  { title: 'Status', dataIndex: 'activationStatus', width: '20%'}
];
export class User extends Component {

  state = {
    isOnEdit : false,
    isOnSearch: false,
    song: {},
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
    this.setState({
      song: data,
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
        {this.state.isOnEdit ? <SongForm submit={this.handleFormSubmit} song={this.state.song} /> : null}
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
