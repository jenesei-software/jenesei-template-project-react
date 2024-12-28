import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@local/app'
import '@local/core/i18n/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
