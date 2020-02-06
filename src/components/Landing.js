import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Table, Button } from 'antd';
import { fetchUser, fetchSongs, saveSong } from "../actions";
import SongAdvandSearchForm from "./SongAdvandSearchForm";
import SongForm from "./SongForm";

const { Content } = Layout;

const columns = [
  { title: 'ID', dataIndex: 'id', width: '5%'},
  { title: 'Title', dataIndex: 'title', width: '20%', render: text => <a>{text}</a> },
  { title: 'Artist', dataIndex: 'artist', width: '20%'},
  { title: 'Download', dataIndex: 'downloads', width: '10%' },
  { title: 'Album', dataIndex: 'album', width: '20%'},
  { title: 'Language', dataIndex: 'language', width: '15%' },
  { title: 'Genre', dataIndex: 'genre', width: '20%'}
];
export class Landing extends Component {

  state = {
    isOnEdit : false,
    isOnSearch: false,
    song: {},
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

  onFormClick = () =>{
    this.setState({ isOnEdit : !this.state.isOnEdit})
    
  }

  handleFormSubmit = data => {
    this.props.saveSong(data);
    this.setState({ isOnEdit : false})
  }

  handleFormSearch = data => {
    const { reqData } = this.state;
    reqData.title = data.title;
    reqData.id = data.id;
    reqData.artist = data.artist;
    reqData.language = data.language;
    reqData.page = 0;
    reqData.size = 10;

    this.props.fetchSongs(reqData);
    
  }

  handleRowDoubleClick = data =>{
    this.setState({
      song: data,
      isOnEdit: true
    })
  }


	render() {
		
    let { songs } = this.props;
		const pagination = {
      total : songs.totalElements,
      pageSize: songs.size,
      current: songs.number + 1
		}
		
		return (
			<Content style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }} >
				  <Button type="primary" icon="form" onClick={this.onFormClick} />
        </div>
        {this.state.isOnEdit ? <SongForm submit={this.handleFormSubmit} song={this.state.song} /> : null}
        <SongAdvandSearchForm submit={this.handleFormSearch}/>
       
        <hr />
				<Table
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: event => this.handleRowDoubleClick(record)
            };
          }}
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
const mapStateToProps = ({ auth, songs, song, user }) => {
	return { auth, songs, song, user };
};

export default connect( mapStateToProps, { fetchUser, fetchSongs, saveSong })(Landing);
