import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { Tag as TagType, RootState } from '../../../../store/types'
import { deleteTag } from '../../../../store/actions/tagsViews'
import { Tag } from 'antd'
import './index.scss'

const TagsView: React.FC = (props: any) => {
  const { tagsList } = props

  const history = useHistory()
  const handleTagClick = (path: string) => {
    history.push(path)
  }

  const handleTagClose = (path: string) => {
    props.deleteTag(path)
  }

  const renderTags = () => {
    return (
      tagsList.map((tag: any) => (
        <li className='tag-item' key={tag.path}>
          <Tag
            className='tag'
            key={tag.path}
            closable
            onClick={handleTagClick.bind(null, tag.path)}
            onClose={handleTagClose.bind(null, tag.path)}
          >
            { tag.title }
          </Tag>
        </li>
      ))
    )
  }

  return (
    <div className='tagsView-container'>
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        hideTracksWhenNotNeeded={true}

      >
        <ul className='tags-wrapper'>
          <li className='tag-item' key='/dashboard'>
            <Tag
              className='tag'
              onClick={handleTagClick.bind(null, '/dashboard')}
            >
              Dashboard
            </Tag>
          </li>
          { renderTags() }
        </ul>
      </Scrollbars>
    </div>
  )
}

const TagsViewWrapper = connect((state: RootState) => state.tagsView, { deleteTag })(TagsView)

export default TagsViewWrapper