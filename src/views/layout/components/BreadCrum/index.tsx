import React from 'react';
import { Breadcrumb } from 'antd'
import routes from '../../../../routes/routemap'
import { Link, useLocation } from 'react-router-dom'

const BreadCrum: React.FC = (props) => {
  const location = useLocation()

  console.log(location.pathname)

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to='/'>Dashboard</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default BreadCrum