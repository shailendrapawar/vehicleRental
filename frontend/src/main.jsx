import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast"

import { RouterProvider } from "react-router"
import MainRouter from './routes/MainRouter.jsx'


import { Provider } from "react-redux"
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>

   <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <RouterProvider router={MainRouter}>

        </RouterProvider>

      </PersistGate>
    </Provider>
  </StrictMode>
)
