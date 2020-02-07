import React, { Component } from "react";
import { Form, Row, Col, Button, Input } from 'antd';

class UserForm extends Component {
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if(!err){
          this.props.submit(values);
          this.handleReset();
        }
      });
    };
  
    handleReset = () => {
      this.props.form.resetFields();
    };
  
    render() {
    
      const { form } = this.props;
      const { getFieldDecorator } = form;
      
      return (
        <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={8} key={"id"}>
              <Form.Item label={`ID`}>
                {getFieldDecorator(`id`, {
                
                })(<Input readOnly={true}/>)}
              </Form.Item>
            </Col>
            <Col span={8} key={"title"}>
              <Form.Item label={`Title`}>
                {getFieldDecorator(`title`, {
                 rules: [
                  {
                    required: true,
                    message: 'Title should not be empty!',
                  },
                ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8} key={"artist"}>
              <Form.Item label={`Artist`}>
              {getFieldDecorator(`artist`, {
                  rules: [
                    {
                      required: true,
                      message: 'Artist should not be empty!',
                    },
                  ]
              })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8} key={"language"}>
                <Form.Item label={`Language`}>
                {getFieldDecorator(`language`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>
            <Col span={8} key={"genre"}>
              <Form.Item label={`Genre`}>
              {getFieldDecorator(`genre`, {
                  
              })(<Input />)}
              </Form.Item>
            </Col>
            
            <Col span={8} key={"photolink"}>
                <Form.Item label={`Photo Url`}>
                {getFieldDecorator(`photoLink`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>
            <Col span={8} key={"lyrics"}>
                <Form.Item label={`Lyrics`}>
                {getFieldDecorator(`lyrics`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>
            <Col span={8} key={"downloadLinkName"}>
                <Form.Item label={`DL Name`}>
                {getFieldDecorator(`downloadLinkName`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>
            <Col span={8} key={"downloadLinkUrl"}>
                <Form.Item label={`DL Url`}>
                {getFieldDecorator(`downloadLinkUrl`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>
            <Col span={16} key={"information"}>
                <Form.Item label={`Keywords`}>
                {getFieldDecorator(`information`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      );
    }
  }
  
export default Form.create(
  { name: 'song_form', 
    mapPropsToFields(props) {
     const song = props.song;
    return {
      id: Form.createFormField({
        ...song.id,
        value: song.id,
      }),
      title: Form.createFormField({
        ...song.title,
        value: song.title,
      }),
      artist: Form.createFormField({
        ...song.artist,
        value: song.artist,
      }),
      language: Form.createFormField({
        ...song.language,
        value: song.language,
      }),
      genre: Form.createFormField({
        ...song.genre,
        value: song.genre,
      }),
     
      photoLink: Form.createFormField({
        ...song.photoLink,
        value: song.photoLink,
      }),
      lyrics: Form.createFormField({
        ...song.lyrics,
        value: song.lyrics,
      }),
      downloadLinkName: Form.createFormField({
        ...song.downloadLinkName,
        value: song.downloadLinkName,
      }),
      downloadLinkUrl: Form.createFormField({
        ...song.downloadLinkUrl,
        value: song.downloadLinkUrl,
      }),
      information: Form.createFormField({
        ...song.information,
        value: song.information,
      }),
    };
  },
})(UserForm);