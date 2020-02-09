import React, { Component } from "react";
import { Form, Row, Col, Button, Input, Select, DatePicker } from 'antd';

const { Option } = Select;
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
    
      const { form, user } = this.props;
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
            <Col span={8} key={"username"}>
              <Form.Item label={`Username`}>
                {getFieldDecorator(`username`, {
                 rules: [
                  {
                    required: true,
                    message: 'Username should not be empty!',
                  },
                ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8} key={"name"}>
              <Form.Item label={`Name`}>
              {getFieldDecorator(`name`, {
                  rules: [
                    {
                      required: true,
                      message: 'Name should not be empty!',
                    },
                  ]
              })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8} key={"phone"}>
                <Form.Item label={`Phone`}>
                {getFieldDecorator(`phone`, {
                    rules: [
                      {
                        required: true,
                        message: 'Phone should not be empty!',
                      },
                    ]
                })(<Input />)}
                </Form.Item>
            </Col>
            <Col span={8} key={"email"}>
              <Form.Item label={`Email`}>
              {getFieldDecorator(`email`, {
                  
              })(<Input />)}
              </Form.Item>
            </Col>
            
            <Col span={8} key={"note"}>
                <Form.Item label={`Note`}>
                {getFieldDecorator(`note`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>
            <Col span={8} key={"point"}>
                <Form.Item label={`Point`}>
                {getFieldDecorator(`point`, {
                    
                })(<Input />)}
                </Form.Item>
            </Col>
            <Col span={8} key={"dob"}>
                <Form.Item label={`Dob`}>
                {getFieldDecorator(`dob`, {
                    
                })(<DatePicker />)}
                </Form.Item>
            </Col>
            <Col span={8} key={"activationStatus"}>
                <Form.Item label={`Status`}>
                {getFieldDecorator(`activationStatus`, {
                   
                })(<Select>
                    <Option value="ACTIVE">ACTIVE</Option>
                    <Option value="PENDING">PENDING</Option>
                    <Option value="BLOCKED">BLOCKED</Option>
                    <Option value="INACTIVE">INACTIVE</Option>
                  </Select>)}
                </Form.Item>
            </Col>
            {
              user.onCreate ? (<Col span={8} key={"password"}>
                  <Form.Item label={`Password`}>
                  {getFieldDecorator(`password`, {
                      rules: [
                        {
                          required: true,
                          message: 'Password should not be empty!',
                        },
                      ]
                  })(<Input />)}
                  </Form.Item>
              </Col>) : null
            }
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
  { name: 'user_form', 
    mapPropsToFields(props) {
     const user = props.user;
    return {
      id: Form.createFormField({
        ...user.id,
        value: user.id,
      }),
      username: Form.createFormField({
        ...user.username,
        value: user.username,
      }),
      name: Form.createFormField({
        ...user.name,
        value: user.name,
      }),
      phone: Form.createFormField({
        ...user.phone,
        value: user.phone,
      }),
      email: Form.createFormField({
        ...user.email,
        value: user.email,
      }),
     
      note: Form.createFormField({
        ...user.note,
        value: user.note,
      }),
      activationStatus: Form.createFormField({
        ...user.activationStatus,
        value: user.activationStatus,
      }),
      point: Form.createFormField({
        ...user.point,
        value: user.point,
      }),
      
    };
  },
})(UserForm);