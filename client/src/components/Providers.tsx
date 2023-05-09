'use client'

import { store } from '@/features/store';
import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <Provider store={store}>
      {children}
      </Provider>
    </>
  )
}

export default Providers