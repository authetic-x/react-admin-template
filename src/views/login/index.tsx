import React, { useEffect } from 'react'
import axios from '../../utils/axios'
import { Form, Input, Button, Checkbox, message } from 'antd'
import './index.scss'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, getUserInfo } from '../../store/actions/user'
import { Scrollbars } from 'react-custom-scrollbars'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login: React.FC = (props: any) => {
  let history = useHistory()

  const onFinish = (values: any) => {
    props.login(values.username, values.password)
      .then((res: any) => {
        history.push('/')
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('FinishFailed: ', errorInfo)
  }

  const loginRequest = (formData: any) => {
    axios({
      url: '/api/login',
      method: 'POST',
      data: {
        username: formData.username,
        password: formData.password
      }
    }).then(res => {
      console.log('login request response: ', res)
      if (res.status === 0) {
        // TODO: set token
        // history.push('/')
        message.success('login success')
      } else {
        message.error('username or password error')
      }
    })
  }

  return (
    <section className='login-wrapper'>
      <Form
        {...layout}
        className='login-form'
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}

const LoginWrapper = connect((state: any) => state.user, { login, getUserInfo })(Login)

export default LoginWrapper