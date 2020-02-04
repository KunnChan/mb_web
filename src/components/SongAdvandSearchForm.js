import React, { Component } from "react";
import { Form, Row, Col, Button, Input, Icon } from 'antd';

class SongAdvancedSearchForm extends Component {
    state = {
      expand: false,
    };
  
    // To generate mock Form.Item
    getFields() {
      const { getFieldDecorator } = this.props.form;
      const children = [];
        children.push(
          <Col span={6} key={"id"}>
            <Form.Item label={`ID`}>
              {getFieldDecorator(`id`, {
               
              })(<Input />)}
            </Form.Item>
          </Col>,
        );
        children.push(
            <Col span={6} key={"title"}>
              <Form.Item label={`Title`}>
                {getFieldDecorator(`title`, {
                 
                })(<Input />)}
              </Form.Item>
            </Col>,
          );
        children.push(
        <Col span={6} key={"artist"}>
            <Form.Item label={`Artist`}>
            {getFieldDecorator(`artist`, {
                
            })(<Input />)}
            </Form.Item>
        </Col>,
        );
        children.push(
            <Col span={6} key={"language"}>
                <Form.Item label={`Language`}>
                {getFieldDecorator(`language`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>,
            );
      return children;
    }
  
    handleSearch = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log('Received values of form: ', values);
      });
    };
  
    handleReset = () => {
      this.props.form.resetFields();
    };
  
    render() {
      return (
        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
          <Row gutter={24}>{this.getFields()}</Row>
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