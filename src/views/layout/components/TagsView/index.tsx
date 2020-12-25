import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import { Tag as TagType, RootState } from '../../../../store/types'
import { deleteTag, closeAllTags, closeOtherTags } from '../../../../store/actions/tagsViews'
import { Tag } from 'antd'
import './index.scss'

const TagsView: React.FC = (props: any) => {
  const { tagsList } = props
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuPos, setMenuPos] = useState({
    left: 0,
    top: 0
  })
  const [currentTagPath, setCurrentTagPath] = useState('')
  const tagsContainer = useRef<HTMLDivElement>(null!)

  const history = useHistory()
  const handleTagClick = (path: string) => {
    history.push(path)
  }

  const handleTagClose = (path: string) => {
    props.deleteTag(path)
  }

  const handleOpenContextMenu = (path: string, e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentTagPath(path)
    const offsetLeft = tagsContainer.current.getBoundingClientRect().left
    let left = e.clientX - offsetLeft + 15
    console.log(`clientX: ${e.clientX}, offsetLeft: ${offsetLeft}, left: ${left}`)
    const menuMinWidth = 105
    const offsetWidth = tagsContainer.current.offsetWidth
    const maxLeft = offsetWidth - menuMinWidth

    if (left > maxLeft) {
      left = maxLeft
    }
    setMenuPos({
      left,
      top: e.clientY
    })
    setMenuVisible(true)
  }

  const closeMenu = () => {
    setMenuVisible(false)
  }

  useEffect(() => {
    document.body.addEventListener('click', closeMenu)
    return () => {
      document.body.removeEventListener('click', closeMenu)
    }
  })

  const handleCloseOtherTags = () => {
    props.closeOtherTags(currentTagPath)
    history.push(currentTagPath)
  }

  const handleCloseAllTags = () => {
    props.closeAllTags()
    history.push('/')
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
            onContextMenu={handleOpenContextMenu.bind(null, tag.path)}
          >
            { tag.title }
          </Tag>
        </li>
      ))
    )
  }

  return (
    <div className='tagsView-container' ref={tagsContainer}>
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
      {
        menuVisible ? 
        <ul 
          className='context-menu' 
          style={{left: `${menuPos.left}px`}}
        >
          <li onClick={handleCloseOtherTags}>Close other tags</li>
          <li onClick={handleCloseAllTags}>Close all tags</li>
        </ul> : null
      }
    </div>
  )
}

const TagsViewWrapper = connect((state: RootState) => state.tagsView, 
  { deleteTag, closeAllTags, closeOtherTags })(TagsView)

export default TagsViewWrapper