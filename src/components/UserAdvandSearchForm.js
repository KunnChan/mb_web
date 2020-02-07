import React, { Component } from "react";
import { Form, Row, Col, Button, Input } from 'antd';
class UserAdvancedSearchForm extends Component {
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
            <Col span={2} key={"id"}>
              <Form.Item label={`ID`}>
                {getFieldDecorator(`id`, {
                
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={4} key={"username"}>
              <Form.Item label={`Username`}>
                {getFieldDecorator(`username`, {
                  
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6} key={"name"}>
              <Form.Item label={`Name`}>
              {getFieldDecorator(`name`, {
                  
              })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6} key={"phone"}>
                <Form.Item label={`Phone`}>
                {getFieldDecorator(`phone`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>
            <Col span={6} key={"email"}>
                <Form.Item label={`Email`}>
                {getFieldDecorator(`email`, {
                    
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

export default Form.create({ name: 'advanced_search' })(UserAdvancedSearchForm);