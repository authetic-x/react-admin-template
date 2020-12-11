import { S } from 'mockjs';
import React, { useEffect, useState } from 'react';
import screenfull, { Screenfull } from 'screenfull'
import { Tooltip } from 'antd'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'


const FullScreen: React.FC = (props) => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  const handleChange = () => {
    setIsFullScreen((screenfull as Screenfull).isFullscreen)
  }

  const handleClick = () => {
    if (!screenfull.isEnabled) {
      console.log('Your browser do not support this feature')
    }
    (screenfull as Screenfull).toggle()
  }

  useEffect(() => {
    screenfull.isEnabled && screenfull.on('change', handleChange)
    return () => {
      screenfull.isEnabled && screenfull.off('change', handleChange)
    }
  })

  const title = isFullScreen ? 'cancel fullscreen' : 'fullscreen'

  return (
    <div className="screenfull-container">
      <Tooltip placement='bottom' title={title}>
        {
          isFullScreen ? <FullscreenExitOutlined onClick={handleClick}/>
            : <FullscreenOutlined onClick={handleClick}/>
        }
      </Tooltip>
    </div>
  )
}

export default FullScreen