import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from '../redux/app/store'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
