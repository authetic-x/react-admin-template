import React, { useState } from 'react';
import { Drawer, Row, Col, Switch, Divider, Tooltip } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { toggleSettings } from '../../../../store/actions/settings'
import { IFSettingState } from '../../../../store/types'
import './index.scss'

//TODO: redux状态改变时，组件并没有被重新渲染

const SettingPanel: React.FC = (props: any) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [sidebarLogo, setSidebarLogo] = useState(props.sidebarLogo)
  const [fixedHeader, setFixedHeader] = useState(props.fixedHeader)
  const [tagsView, setTagsView] = useState(props.tagsView)

  // const { sidebarLogo, fixedHeader, tagsView } = props


  const handleSettingClick = () => {
    setIsPanelOpen(true)
  }

  const handleClose = () => {
    setIsPanelOpen(false)
  }

  const toggleSettings = (type: keyof IFSettingState) => {
    if (type === 'sidebarLogo') {
      setSidebarLogo(!sidebarLogo)
      props.toggleSettings({ key: 'sidebarLogo', value: !sidebarLogo })
    } else if (type === 'fixedHeader') {
      setFixedHeader(!fixedHeader)
      props.toggleSettings({ key: 'fixedHeader', value: !fixedHeader })
    } else if (type === 'tagsView') {
      setTagsView(!tagsView)
      props.toggleSettings({ key: 'tagsView', value: !tagsView })
    }
  }
/* 
  const handleModalClick = () => {
    setIsPanelOpen(!isPanelOpen)
  }

  const renderSettingPanel = () => {
    return (
      <div className='setting-panel-wrapper' onClick={handleModalClick}>
        <CSSTransition in={isPanelOpen} timeout={200} classNames='panel'>
          <div className="setting-panel">
            Setting panel
          </div>
        </CSSTransition>
      </div>
    )
  } */

  return (
    <div className='setting-panel-container'>
      <Tooltip placement='bottom' title='SettingPanel'>
        <span className='setting-icon-wrapper'>
          <SettingOutlined onClick={handleSettingClick}/>
        </span>
      </Tooltip>

      <Drawer
        title='Setting Panel'
        placement='right'
        width={350}
        closable={true}
        onClose={handleClose}
        visible={isPanelOpen}
      >
        <Row>
          <Col span={12}>
            <span>Sidebar Logo</span>
          </Col>
          <Col>
            <Switch 
              checkedChildren='open'
              unCheckedChildren='close'
              defaultChecked={sidebarLogo}
              onChange={() => toggleSettings('sidebarLogo')}
            />
          </Col>
        </Row>
        <Divider dashed/>
        <Row>
          <Col span={12}>
            <span>Fixed Header</span>
          </Col>
          <Col>
            <Switch 
              checkedChildren='open'
              unCheckedChildren='close'
              defaultChecked={fixedHeader}
              onChange={() => toggleSettings('fixedHeader')}
            />
          </Col>
        </Row>
        <Divider dashed/>
        <Row>
          <Col span={12}>
            <span>Show Tagsview</span>
          </Col>
          <Col>
            <Switch 
              checkedChildren='open'
              unCheckedChildren='close'
              defaultChecked={tagsView}
              onChange={() => toggleSettings('tagsView')}
            />
          </Col>
        </Row>
      </Drawer>
    </div>
  )
}

const SettingPanelWrapper = connect((state: any) => state.settings, { toggleSettings })(SettingPanel)

export default SettingPanelWrapper