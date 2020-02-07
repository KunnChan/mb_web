import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Table, Button } from 'antd';
import { fetchAlbums, saveAlbum } from "../actions";
import AlbumAdvandSearchForm from "./AlbumAdvandSearchForm";
import AlbumForm from "./AlbumForm";

const { Content } = Layout;

const columns = [
  { title: 'ID', dataIndex: 'id', width: '10%'},
  { title: 'Title', dataIndex: 'title', width: '30%', render: text =><span className="linkColor">{text}</span> },
  { title: 'Artist', dataIndex: 'artist', width: '30%'},
  { title: 'Songs', dataIndex: 'songCount', width: '10%' },
  { title: 'Genre', dataIndex: 'genre', width: '20%'}
];
export class Album extends Component {

  state = {
    isOnEdit : false,
    isOnSearch: false,
    album: {},
    reqData : {
      title : "",
      artist: "",
      genre: "",
      page: 0,
      size: 10
    }
  }

	componentDidMount = () => {
		this.props.fetchAlbums(this.state.reqData);
  };

  handleTableChange = (pagination) => {

    const { reqData } = this.state;
    reqData.page = pagination.current - 1;
    this.props.fetchAlbums(reqData);
  };

  onFormClick = () =>{
    this.setState({ isOnEdit : !this.state.isOnEdit})
    
  }

  handleFormSubmit = data => {
    this.props.saveAlbum(data);
    this.setState({ isOnEdit : false});
  }

  handleFormSearch = data => {
    const { reqData } = this.state;
    reqData.title = data.title;
    reqData.id = data.id;
    reqData.artist = data.artist;
    reqData.language = data.language;
    reqData.page = 0;
    reqData.size = 10;

    this.setState({ reqData})

    this.props.fetchAlbums(reqData);
    
  }

  handleRowDoubleClick = data =>{
    this.setState({
      album: data,
      isOnEdit: true
    })
  }


	render() {
		
    let { albums } = this.props;
		const pagination = {
      total : albums.totalElements,
      pageSize: albums.size,
      current: albums.number + 1
		}
		
		return (
			<Content style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }} >
				  <Button type="primary" icon="form" onClick={this.onFormClick} />
        </div>
        {this.state.isOnEdit ? <AlbumForm submit={this.handleFormSubmit} album={this.state.album} /> : null}
        <AlbumAdvandSearchForm submit={this.handleFormSearch}/>
       
        <hr />
				<Table
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: event => this.handleRowDoubleClick(record)
            };
          }}
					columns={columns}
					rowKey={record => record.id}
					dataSource={albums.content}
					pagination={pagination}
          onChange={this.handleTableChange}
          size="small"
				/>
			</Content>
		);
	}
}
const mapStateToProps = ({ auth, album, albums }) => {
	return { auth, album, albums };
};

export default connect( mapStateToProps, { fetchAlbums, saveAlbum })(Album);
