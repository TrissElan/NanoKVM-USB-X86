import React from 'react'
import { ConfigProvider, theme } from 'antd'
import ReactDOM from 'react-dom/client'

import App from './App'
import { ErrorBoundary } from './components/ui/error-boundary'

import './assets/styles/main.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <ErrorBoundary>
        <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
          <App />
        </div>
      </ErrorBoundary>
    </ConfigProvider>
  </React.StrictMode>
)
