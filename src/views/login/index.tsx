import React, { useEffect } from 'react'
import axios from '../../utils/axios'

const Login: React.FC = (props) => {
  useEffect(() => {
    console.log('===login api===')
    axios({
      url: '/api/login',
      method: 'post',
      data: {
        username: 'admin'
      }
    }).then((data) => {
      console.log(data)
    })
  }, [])

  return (
    <div>Login component</div>
  )
}

export default Login