import { ConfigProvider } from 'antd';
import { useEffect } from 'react';

import './App.css';
import Layout from './component/layout/Layout';

function App() {

  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#10b5cb',
        borderRadius: 2,

        // Alias Token
        colorBgContainer: '#f0f0f6',
        borderRadius: '16px',

      },
      components: {
       
        Tooltip: {
          borderRadius: '16',
          borderRadiusOuter: '6',
          borderRadiusXS: '2'
        },

        Popover: {
          borderRadius: '16',
          borderRadiusOuter: '6',
          borderRadiusXS: '2'
        }
      },
    }}
  >
    <Layout />
    </ConfigProvider>
  );
}

export default App;
