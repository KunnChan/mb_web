import React, { Component } from "react";
import { Form, Row, Col, Button, Input, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
class FeedbackAdvanceSearchForm extends Component {
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        const { range } = values;
        if(range){
          values.fromDt =  range[0].format('YYYY-MM-DD');
          values.toDt = range[1].format('YYYY-MM-DD');
        }
        
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
            <Col span={4} key={"id"}>
              <Form.Item label={`ID`}>
                {getFieldDecorator(`id`, {
                
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8} key={"range"}>
              <Form.Item label={`From`}>
                {getFieldDecorator(`range`, {
                  rules: [{ type: 'array' }]
                })(<RangePicker />)}
              </Form.Item>
            </Col>
            <Col span={6} key={"eventAction"}>
                <Form.Item label={`Action`}>
                {getFieldDecorator(`eventAction`, {
                    
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

export default Form.create({ name: 'advanced_search' })(FeedbackAdvanceSearchForm);