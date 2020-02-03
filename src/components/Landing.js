import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Table, Button } from 'antd';
import { fetchUser, fetchSongs } from "../actions";

const { Content } = Layout;


const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '5%',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    width: '20%',
  },
  {
    title: 'Artist',
    dataIndex: 'artist',
    width: '20%',
  },
  {
    title: 'Download',
    dataIndex: 'downloads',
  },
  {
    title: 'Album',
    dataIndex: 'album',
  },
  {
    title: 'Language',
    dataIndex: 'language',
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
  }
];
export class Landing extends Component {

  state = {
	data: [],
    pagination: {},
	loading: false,
	reqData : {
		title : "",
		artist: "",
		language: "",
		info: "",
		page: 0,
		size: 10
	}
  }
	componentDidMount = () => {
		this.props.fetchUser();
		this.props.fetchSongs(this.state.reqData);
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

//   fetch = (params = {}) => {
//     console.log('params:', params);
//     this.setState({ loading: true });
//     reqwest({
//       url: 'https://randomuser.me/api',
//       method: 'get',
//       data: {
//         results: 10,
//         ...params,
//       },
//       type: 'json',
//     }).then(data => {
//       const pagination = { ...this.state.pagination };
//       // Read total count from server
//       // pagination.total = data.totalCount;
//       pagination.total = 200;
//       this.setState({
//         loading: false,
//         data: data.results,
//         pagination,
//       });
//     });
//   };

	render() {
		// const { tables } = this.props;
		// if(tables.length === 0){
		// 	return <p>Loading...</p>
		// }
		let { songs } = this.props;
		const pagination = {
			total : songs.totalElements
		}
		
		return (
			<Content style={{ padding: '20px' }}>
				<Button type="primary" icon="form" size={'large'} />
				<Table
					columns={columns}
					rowKey={record => record.id}
					dataSource={songs.content}
					pagination={pagination}
					loading={this.state.loading}
					onChange={this.handleTableChange}
				/>
			</Content>
		);
	}
}
const mapStateToProps = ({ auth, songs }) => {
	return { auth, songs };
};

export default connect( mapStateToProps, { fetchUser, fetchSongs })(Landing);
