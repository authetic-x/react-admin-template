import React from 'react'
import TypingCard from '../../../components/TypingCard'

const RichTextEditor: React.FC = (props) => {
  const cardContent = `
    此页面用到的富文本编辑器是<a href="https://github.com/jpuri/react-draft-wysiwyg">react-draft-wysiwyg</a>。
  `

  return (
    <div className='richTextEditor-container'>
      <TypingCard title='新手引导' source={cardContent}/>
    </div>
  )
}

export default RichTextEditor