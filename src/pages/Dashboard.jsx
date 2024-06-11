import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { RightCircleOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const [locationPath, setLocationPath] = useState(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    setLocationPath(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    {
      key: '/dashboard/categories',
      icon: <RightCircleOutlined />,
      label: 'Categories',
      onClick: () => navigate('/dashboard/categories'),
    },
    {
      key: '/dashboard/brands',
      icon: <RightCircleOutlined />,
      label: 'Brands',
      onClick: () => navigate('/dashboard/brands'),
    },
    {
      key: '/dashboard/cities',
      icon: <RightCircleOutlined />,
      label: 'Cities',
      onClick: () => navigate('/dashboard/cities'),
    },
  ];

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[locationPath]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 600,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
