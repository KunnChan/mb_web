import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Table, Button } from 'antd';
import { fetchUser, fetchSongs } from "../actions";
import SongAdvandSearchForm from "./SongAdvandSearchForm";
import SongForm from "./SongForm";

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
    width: '10%',
  },
  {
    title: 'Album',
    dataIndex: 'album',
    width: '20%',
  },
  {
    title: 'Language',
    dataIndex: 'language',
    width: '15%',
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
    width: '20%',
  }
];
export class Landing extends Component {

  state = {
	data: [],
    pagination: {},
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

  handleTableChange = (pagination) => {

    const { reqData } = this.state;
    reqData.page = pagination.current - 1;
    this.props.fetchSongs(reqData);
  };

	render() {
		
		let { songs } = this.props;
		const pagination = {
      total : songs.totalElements,
      pageSize: songs.size,
      current: songs.number + 1
		}
		
		return (
			<Content style={{ padding: '20px' }}>
				<Button type="primary" icon="form" /> |  
        <Button type="primary" icon="search" />
        {/* <SongForm />
        <SongAdvandSearchForm /> */}
        <hr />
				<Table
					columns={columns}
					rowKey={record => record.id}
					dataSource={songs.content}
					pagination={pagination}
          onChange={this.handleTableChange}
          size="small"
				/>
			</Content>
		);
	}
}
const mapStateToProps = ({ auth, songs }) => {
	return { auth, songs };
};

export default connect( mapStateToProps, { fetchUser, fetchSongs })(Landing);
