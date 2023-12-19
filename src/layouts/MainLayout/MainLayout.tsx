import React, { useState, memo, useContext } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, Menu, Button, theme, Space, Select, Dropdown, MenuProps } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Footer } from 'antd/es/layout/layout'
import { BiMoviePlay } from 'react-icons/bi'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsTicketPerforated, BsImage } from 'react-icons/bs'
import { TbTheater } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
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
  const { i18n, t } = useTranslation('main-layout')
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
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

  const menuItems =
    (profile?.role as number) === 2
      ? [
          {
            key: path.home,
            icon: <Icon.HomeOutlined />,
            label: t('home'),
            path: path.home
          },
          {
            key: path.movie,
            icon: <BiMoviePlay />,
            label: t('movie'),
            path: path.movie
          },
          {
            key: path.banner,
            icon: <BsImage />,
            label: t('banner'),
            path: path.banner
          },
          {
            key: path.cinema,
            icon: <TbTheater />,
            label: t('cinema'),
            path: path.cinema
          },
          {
            key: path.userManagement,
            icon: <Icon.UserOutlined />,
            label: t('user'),
            path: path.userManagement
          },
          {
            key: path.combo,
            icon: <PiPopcorn />,
            label: t('combo'),
            path: path.combo
          },
          {
            key: path.statisticsByDay,
            icon: <Icon.LineChartOutlined />,
            label: t('statistics'),
            path: path.statisticsByDay
          }
        ]
      : [
          {
            key: path.home,
            icon: <Icon.HomeOutlined />,
            label: t('home'),
            path: path.home
          },
          {
            key: path.movie,
            icon: <BiMoviePlay />,
            label: t('movie'),
            path: path.movie
          },
          {
            key: path.showtimes,
            icon: <AiOutlineCalendar />,
            label: t('showtimes'),
            path: path.showtimes
          },
          {
            key: path.ticket,
            icon: <BsTicketPerforated />,
            label: t('ticket'),
            path: path.ticket
          },
          {
            key: path.statisticsByDay,
            icon: <Icon.LineChartOutlined />,
            label: t('statistics'),
            path: path.statisticsByDay
          }
        ]

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ padding: 0, background: colorBgContainer }}>
        <div className='demo-logo-vertical' />
        <Menu mode='inline' defaultSelectedKeys={[path.home]} selectedKeys={[location.pathname]}>
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
                        label: t('personal-information')
                      },
                      {
                        key: 'change-password',
                        icon: <Icon.LockOutlined />,
                        onClick: () => navigate(path.changePassword),
                        label: t('change-password')
                      },
                      {
                        key: 'logout',
                        icon: <Icon.LogoutOutlined />,
                        onClick: handleLogout,
                        label: t('logout')
                      }
                    ] as MenuProps['items']
                  }}
                >
                  <div style={{ cursor: 'pointer', maxHeight: '50px' }}>{profile?.name ?? profile?.email}</div>
                </Dropdown>
              </Space>
            )}
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
