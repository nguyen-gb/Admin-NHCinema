import React, { useState, memo, useContext } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Menu, Button, theme, Space, Select, Dropdown, MenuProps } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Footer } from 'antd/es/layout/layout'
import { BiMoviePlay } from 'react-icons/bi'
import { MdOutlineMeetingRoom } from 'react-icons/md'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsTicketPerforated } from 'react-icons/bs'
import { TbTheater } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { BsImage } from 'react-icons/bs'
import { PiPopcorn } from 'react-icons/pi'
import * as Icon from '@ant-design/icons'

import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import authApi from 'src/apis/auth.api'
import { setLanguageToLS } from 'src/utils/language'

const { Header, Sider, Content } = Layout

interface Props {
  children?: React.ReactNode
}

function MainLayoutInner({ children }: Props) {
  const { i18n, t } = useTranslation()
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguageToLS(lng)
  }

  const menuItems = !profile?.theater_id
    ? [
        {
          key: path.home,
          icon: <BiMoviePlay />,
          label: 'Movie',
          path: path.home
        },
        {
          key: path.cinema,
          icon: <TbTheater />,
          label: 'Cinema',
          path: path.cinema
        },
        {
          key: path.banner,
          icon: <BsImage />,
          label: 'Banner',
          path: path.banner
        },
        {
          key: path.userManagement,
          icon: <Icon.UserOutlined />,
          label: 'User',
          path: path.userManagement
        },
        {
          key: path.combo,
          icon: <PiPopcorn />,
          label: 'Combo',
          path: path.combo
        }
      ]
    : [
        {
          key: path.home,
          icon: <BiMoviePlay />,
          label: 'Movie',
          path: path.home
        },
        {
          key: path.showtimes,
          icon: <AiOutlineCalendar />,
          label: 'Showtimes',
          path: path.showtimes
        },
        {
          key: path.ticket,
          icon: <BsTicketPerforated />,
          label: 'Ticket',
          path: path.ticket
        }
      ]

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ padding: 0, background: colorBgContainer }}>
        <div className='demo-logo-vertical' />
        <Menu mode='inline' defaultSelectedKeys={[path.home]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', justifyContent: 'space-between', padding: 0, background: colorBgContainer }}>
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
          <Space style={{ gap: 20, marginRight: 20 }}>
            <Select
              defaultValue={i18n.language}
              placeholder='Language'
              showSearch={false}
              options={[
                {
                  value: 'vi-VN',
                  label: 'Tiếng Việt'
                },
                {
                  value: 'en-EN',
                  label: 'English'
                }
              ]}
              onChange={(value) => changeLanguage(value)}
            />
            {isAuthenticated && (
              <Space>
                <Dropdown
                  placement='bottomCenter'
                  menu={{
                    items: [
                      {
                        key: 'personal-information',
                        icon: <Icon.UserOutlined />,
                        onClick: () => navigate(path.profile),
                        label: 'Personal information'
                      },
                      {
                        key: 'logout',
                        icon: <Icon.LogoutOutlined />,
                        onClick: handleLogout,
                        label: 'Logout'
                      }
                    ] as MenuProps['items']
                  }}
                >
                  <div style={{ cursor: 'pointer', maxHeight: '50px' }}>{profile?.name ?? profile?.email}</div>
                </Dropdown>
              </Space>
            )}
            {!isAuthenticated && <Link to={path.login}>{t('login')}</Link>}
          </Space>
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
        <Footer style={{ textAlign: 'center' }}>NHCinema ©2023 Created by Nguyen & Hai</Footer>
      </Layout>
    </Layout>
  )
}

const MainLayout = memo(MainLayoutInner)

export default MainLayout
