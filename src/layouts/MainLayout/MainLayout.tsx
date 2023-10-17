import React, { useState, memo } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import { Footer } from 'antd/es/layout/layout'
import { BiMoviePlay } from 'react-icons/bi'
import { MdOutlineMeetingRoom } from 'react-icons/md'
import { AiOutlineCalendar } from 'react-icons/ai'

import path from 'src/constants/path'

const { Header, Sider, Content } = Layout

interface Props {
  children?: React.ReactNode
}

function MainLayoutInner({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const menuItems = [
    {
      key: '1',
      icon: <BiMoviePlay />,
      label: 'Movie',
      path: path.home
    },
    {
      key: '2',
      icon: <MdOutlineMeetingRoom />,
      label: 'Room',
      path: path.room
    },
    {
      key: '3',
      icon: <AiOutlineCalendar />,
      label: 'Showtimes',
      path: path.showtimes
    }
  ]

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ padding: 0, background: colorBgContainer }}>
        <div className='demo-logo-vertical' />
        <Menu mode='inline' defaultSelectedKeys={['1']}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer
          }}
        >
          {children}
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>NHCinema ©2016 Created by Nguyen & Hai</Footer>
      </Layout>
    </Layout>
  )
}

const MainLayout = memo(MainLayoutInner)

export default MainLayout
