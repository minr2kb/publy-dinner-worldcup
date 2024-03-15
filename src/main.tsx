import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Home from './pages/Home.tsx';
import Result from './pages/Result.tsx';
import TotalResult from './pages/TotalResult.tsx';
import Tournament from './pages/Tournament.tsx';
import theme from './utils/theme.ts';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/tournament', element: <Tournament /> },
      { path: '/result', element: <Result /> },
      { path: '/total-result', element: <TotalResult /> },
    ],
  },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
