// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.js';
import { store } from './redux/store.js';
import './index.css';
import theme from './theme.js';
import { Buffer } from "buffer";
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { Snackbar } from '@mui/material';

(window as any).Buffer = Buffer;

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NotificationsProvider slotProps={{
          snackbar: {
            component: Snackbar,
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            autoHideDuration: 5000,
          }
        }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </NotificationsProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode >
);
