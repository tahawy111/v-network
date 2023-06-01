'use client';

import { AppDispatch, store } from '@/features/store';
import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import Spinner from '../Custom-Ui/Spinner';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {

  return (
    <>
      <Toaster position='top-center' reverseOrder={ false } />
      <ThemeProvider enableSystem={true} attribute='class'>
        <Provider store={ store }>
          <Spinner />
          { children }
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default Providers;