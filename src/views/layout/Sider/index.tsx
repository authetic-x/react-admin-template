import React, { useState } from 'react';
import { Layout, Menu } from 'antd'
import { useLocation } from 'react-router-dom'
import routes, { IRoute } from '../../../routes/routemap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addTags } from '../../../store/actions/tagsViews'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import './index.scss'
import { flattenRoutes } from 'src/utils/utils';

const { Sider } = Layout
const { SubMenu } = Menu

interface SiderProps {
  collapse: boolean
}

const SiderComponent: React.FC<SiderProps> = (props: any) => {
  const location = useLocation()
  // console.log(location.pathname)

  const renderMenuNodes = (routes: IRoute[]) => {
    return routes.map(route => {
      if (!route.children) {
        return (
          <Menu.Item key={route.path}>
            <Link to={route.path}>
              <span>{route.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={route.path} title={route.title}>
            {
              renderMenuNodes(route.children)
            }
          </SubMenu>
        )
      }
    })
  }

  const [menuItems, setMenuItems] = useState(renderMenuNodes(routes))
  
  const renderSidebarLogo = () => {
    return (
      <div className="logo">
        <h2 className='logo-title'>Openup</h2>
      </div>
    )
  }

  const reOrder = (list: JSX.Element[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newMenuItems = reOrder(menuItems, result.source.index, result.destination.index)
    setMenuItems(newMenuItems)
  }

  const getListStyle = (isDraggingOver: boolean) => ({
    //TODO: add background style
  })

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    ...draggableStyle
  })

  const handleMenuSelect = ({key}: any) => {
    if (key === '/dashboard') return
    console.log('Menu key: ', key)
    const flattenedRoutes = flattenRoutes(routes)
    for (let route of flattenedRoutes) {
      if (key === route.path) {
        props.addTags({
          path: route.path,
          title: route.title
        })
      }
    }
  }

  return (
    <Sider className='sidebar' trigger={null} collapsible collapsed={props.collapse}>
      <div className='sidebar-wrapper'>
        {
          props.sidebarLogo ? renderSidebarLogo() : null
        }
        <div className='menu-container custom-scrollbar'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {
                (provided, snapshot) => (
                  <div 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {
                      menuItems.map((menuitem, index) => (
                        <Draggable key={menuitem.key} draggableId={String(menuitem.key)} index={index}>
                          {
                            (provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                              >
                                <Menu
                                  theme='dark'
                                  mode='inline'
                                  selectedKeys={[location.pathname]}
                                  onSelect={handleMenuSelect}
                                >
                                  { menuitem }
                                </Menu>
                              </div>
                            )
                          }
                        </Draggable>
                      ))
                    }
                    { provided.placeholder }
                  </div>
                )
              }
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </Sider>
  )
}

const SiderComponentWrapper = connect((state: any) => state.settings, { addTags })(SiderComponent)

export default SiderComponentWrapper