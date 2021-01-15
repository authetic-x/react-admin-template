import React, { useEffect, useRef } from 'react';
import { Card } from 'antd'
import Typing from '../../utils/typing'

interface IProps {
  title?: string
  source?: string
}

const TypingCard: React.FC<IProps> = (props) => {
  const { title, source } = props

  const sourceEl = useRef<HTMLDivElement>(null)
  const outputEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const typing = new Typing({
      source: sourceEl.current!,
      output: outputEl.current!,
      delay: 30
    })
    typing.start()
  }, [])

  return (
    <Card title={title} bordered={false} className='card-item'>
      <div style={{ display: 'none' }} ref={sourceEl} dangerouslySetInnerHTML={{__html: source!}} />
      <div ref={outputEl} />
    </Card>
  )
}

TypingCard.defaultProps = {
  title: '',
  source: ''
}

export default TypingCard