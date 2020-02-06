import React, { Component } from "react";
import { Form, Row, Col, Button, Input } from 'antd';
class SongAdvancedSearchForm extends Component {
    state = {
      expand: false,
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        this.props.submit(values);
      });
    };
  
    handleReset = () => {
      this.props.form.resetFields();
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;

      return (
        <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={6} key={"id"}>
              <Form.Item label={`ID`}>
                {getFieldDecorator(`id`, {
                
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6} key={"title"}>
              <Form.Item label={`Title`}>
                {getFieldDecorator(`title`, {
                  
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6} key={"artist"}>
              <Form.Item label={`Artist`}>
              {getFieldDecorator(`artist`, {
                  
              })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6} key={"language"}>
                <Form.Item label={`Language`}>
                {getFieldDecorator(`language`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Search
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

export default Form.create({ name: 'advanced_search' })(SongAdvancedSearchForm);