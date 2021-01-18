import React, { useState } from 'react'
import { Card, Row, Col } from 'antd'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import TypingCard from '../../../components/TypingCard'
import './index.scss'

const RichTextEditor: React.FC = (props) => {
  const cardContent = `
    此页面用到的富文本编辑器是<a href="https://github.com/jpuri/react-draft-wysiwyg">react-draft-wysiwyg</a>。
  `

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onStateChange = (editorState: EditorState) => setEditorState(editorState)

  return (
    <div className='richTextEditor-wrap' style={{background: '#f0f2f5'}}>
      <TypingCard title='新手引导' source={cardContent}/>
      <br/>
      <div className="richTextEditor-container" style={{marginTop: '1em'}}>
        <Card bordered={false}>
          <Editor 
            editorState={editorState}
            onEditorStateChange={onStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            localization={{ locale: "zh" }}
          />
        </Card>
        <br/>
        <Row gutter={10}>
          <Col span={12}>
            <Card
              title='同步转换HTML'
              bordered={false}
              style={{minHeight: 200}}
            >
              { editorState && draftToHtml(convertToRaw(editorState.getCurrentContent())) }
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title='同步转换Markdown'
              bordered={false}
              style={{minHeight: 200}}
            >
              { editorState && draftToHtml(convertToRaw(editorState.getCurrentContent())) }
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default RichTextEditor