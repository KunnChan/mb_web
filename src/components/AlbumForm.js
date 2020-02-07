import React, { Component } from "react";
import { Form, Row, Col, Button, Input } from 'antd';

class AlbumForm extends Component {
  
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
            <Col span={8} key={"songId"}>
                <Form.Item label={`Song Id`}>
                {getFieldDecorator(`songId`, {
                    
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
  { name: 'album_form', 
    mapPropsToFields(props) {
     const album = props.album;
    return {
      id: Form.createFormField({
        ...album.id,
        value: album.id,
      }),
      title: Form.createFormField({
        ...album.title,
        value: album.title,
      }),
      artist: Form.createFormField({
        ...album.artist,
        value: album.artist,
      }),
      genre: Form.createFormField({
        ...album.genre,
        value: album.genre,
      }),
     
      photoLink: Form.createFormField({
        ...album.photoLink,
        value: album.photoLink,
      }),
    };
  },
})(AlbumForm);